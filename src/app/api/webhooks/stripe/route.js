import Stripe from "stripe";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { orders } from "@/lib/db/schema";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return new Stripe(secretKey);
}

export async function POST(request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature) {
    return Response.json({ error: "Missing Stripe signature." }, { status: 400 });
  }
  if (!webhookSecret) {
    console.error("Stripe webhook is not configured: STRIPE_WEBHOOK_SECRET is missing.");
    return Response.json(
      { error: "Webhook is temporarily unavailable." },
      { status: 500 },
    );
  }

  let stripe;
  let event;
  try {
    stripe = getStripe();
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
      return Response.json({ error: "Invalid Stripe signature." }, { status: 400 });
    }

    console.error("Unable to verify Stripe webhook.", error);
    return Response.json(
      { error: "Webhook is temporarily unavailable." },
      { status: 500 },
    );
  }

  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "checkout.session.async_payment_succeeded"
  ) {
    return Response.json({ received: true });
  }

  const session = event.data.object;
  if (session.payment_status !== "paid") {
    return Response.json({ received: true });
  }

  const orderId = Number(session.metadata?.orderId);
  if (
    session.mode !== "payment" ||
    !Number.isInteger(orderId) ||
    orderId < 1 ||
    session.client_reference_id !== String(orderId)
  ) {
    console.warn("Ignoring Stripe Checkout event with invalid order metadata.");
    return Response.json({ received: true });
  }

  try {
    const db = getDb();
    const [order] = await db
      .select({
        id: orders.id,
        userId: orders.userId,
        status: orders.status,
        totalAmount: orders.totalAmount,
        currency: orders.currency,
        stripeSessionId: orders.stripeSessionId,
      })
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    if (
      !order ||
      order.stripeSessionId !== session.id ||
      order.userId !== session.metadata?.userId ||
      session.amount_total !== order.totalAmount ||
      session.currency?.toUpperCase() !== order.currency.toUpperCase()
    ) {
      console.warn("Ignoring Stripe Checkout event that does not match its order.");
      return Response.json({ received: true });
    }

    if (order.status === "paid") {
      return Response.json({ received: true });
    }

    if (order.status !== "pending") {
      console.warn("Ignoring paid Stripe Checkout event for a non-pending order.");
      return Response.json({ received: true });
    }

    await db
      .update(orders)
      .set({ status: "paid", paidAt: new Date() })
      .where(
        and(
          eq(orders.id, order.id),
          eq(orders.stripeSessionId, session.id),
          eq(orders.status, "pending"),
        ),
      );

    return Response.json({ received: true });
  } catch (error) {
    console.error("Unable to apply Stripe payment to order.", error);
    return Response.json(
      { error: "Unable to apply payment to order." },
      { status: 500 },
    );
  }
}
