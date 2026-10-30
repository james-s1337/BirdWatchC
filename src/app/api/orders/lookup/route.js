import Stripe from "stripe";
import { and, eq } from "drizzle-orm";
import { requireAuthenticatedUser } from "@/lib/auth/require-user";
import { getDb } from "@/lib/db";
import { orders } from "@/lib/db/schema";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return new Stripe(secretKey);
}

export async function GET(request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId || sessionId.length > 255) {
    return Response.json(
      { error: "A valid Stripe session_id is required." },
      { status: 400 },
    );
  }

  const { user, error } = await requireAuthenticatedUser(
    "Sign in to look up your order.",
  );
  if (error) {
    return error;
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
      })
      .from(orders)
      .where(
        and(
          eq(orders.stripeSessionId, sessionId),
          eq(orders.userId, user.id),
        ),
      )
      .limit(1);

    if (!order) {
      return Response.json({ error: "Order not found." }, { status: 404 });
    }

    let status = order.status;
    if (status === "pending") {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (
        session.id === sessionId &&
        session.mode === "payment" &&
        session.payment_status === "paid" &&
        session.client_reference_id === String(order.id) &&
        session.metadata?.orderId === String(order.id) &&
        session.metadata?.userId === user.id &&
        session.amount_total === order.totalAmount &&
        session.currency?.toUpperCase() === order.currency.toUpperCase()
      ) {
        await db
          .update(orders)
          .set({ status: "paid", paidAt: new Date() })
          .where(
            and(
              eq(orders.id, order.id),
              eq(orders.stripeSessionId, sessionId),
              eq(orders.status, "pending"),
            ),
          );
        status = "paid";
      }
    }

    return Response.json(
      { status },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (lookupError) {
    console.error("Unable to look up or verify order.", lookupError);
    return Response.json(
      { error: "Unable to look up your order." },
      { status: 500 },
    );
  }
}
