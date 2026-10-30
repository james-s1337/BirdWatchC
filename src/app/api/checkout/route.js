import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { requireAuthenticatedUser } from "@/lib/auth/require-user";
import { getDb } from "@/lib/db";
import { birds, orderItems, orders } from "@/lib/db/schema";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return new Stripe(secretKey);
}

function getAppUrl() {
  const appUrl = process.env.APP_URL;
  if (!appUrl) {
    throw new Error("APP_URL is not configured.");
  }

  const url = new URL(appUrl);
  if (
    (url.protocol !== "https:" &&
      !(url.protocol === "http:" && url.hostname === "localhost")) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "APP_URL must be an HTTPS origin (or localhost for development).",
    );
  }

  return url.origin;
}

export async function POST(request) {
  const { user, error } = await requireAuthenticatedUser(
    "Sign in before starting checkout.",
  );
  if (error) {
    return error;
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const { birdId } = body ?? {};
  if (!Number.isInteger(birdId) || birdId < 1) {
    return Response.json(
      { error: "birdId must be a positive integer." },
      { status: 400 },
    );
  }

  let stripe;
  let appUrl;
  try {
    stripe = getStripe();
    appUrl = getAppUrl();
  } catch (configurationError) {
    console.error("Checkout is not configured.", configurationError);
    return Response.json(
      { error: "Checkout is temporarily unavailable." },
      { status: 500 },
    );
  }

  const db = getDb();
  const [bird] = await db
    .select({
      id: birds.id,
      name: birds.name,
      imagePath: birds.imagePath,
      price: birds.price,
      currency: birds.currency,
    })
    .from(birds)
    .where(eq(birds.id, birdId))
    .limit(1);

  if (!bird) {
    return Response.json({ error: "Bird not found." }, { status: 404 });
  }

  const [order] = await db
    .insert(orders)
    .values({
      userId: user.id,
      status: "pending",
      totalAmount: bird.price,
      currency: bird.currency,
    })
    .returning({ id: orders.id });

  await db.insert(orderItems).values({
    orderId: order.id,
    birdId: bird.id,
    photoName: bird.name,
    imagePath: bird.imagePath,
    unitPrice: bird.price,
    quantity: 1,
  });

  let checkoutSession;
  try {
    checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      managed_payments: { enabled: false },
      line_items: [
        {
          price_data: {
            currency: bird.currency.toLowerCase(),
            product_data: { name: bird.name },
            unit_amount: bird.price,
          },
          quantity: 1,
        },
      ],
      client_reference_id: String(order.id),
      metadata: {
        orderId: String(order.id),
        userId: user.id,
      },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/?checkout=cancel`,
    });
  } catch (stripeError) {
    console.error("Unable to create Stripe Checkout Session.", stripeError);
    await db
      .update(orders)
      .set({ status: "checkout_failed" })
      .where(eq(orders.id, order.id));

    return Response.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 502 },
    );
  }

  if (!checkoutSession.url) {
    await db
      .update(orders)
      .set({ status: "checkout_failed" })
      .where(eq(orders.id, order.id));
    return Response.json(
      { error: "Stripe did not provide a checkout URL." },
      { status: 502 },
    );
  }

  await db
    .update(orders)
    .set({ stripeSessionId: checkoutSession.id })
    .where(eq(orders.id, order.id));

  return Response.json({ checkoutUrl: checkoutSession.url, orderId: order.id });
}
