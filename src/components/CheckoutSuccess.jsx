"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Footer } from "./Footer";
import { Header } from "./Header";

const pollIntervalMs = 2000;
const maxAttempts = 5;

export function CheckoutSuccess({ sessionId }) {
  const [status, setStatus] = useState(sessionId ? "checking" : "invalid");
  const [message, setMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    let active = true;
    const controller = new AbortController();
    const timers = new Set();

    function waitForNextAttempt() {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          timers.delete(timer);
          resolve();
        }, pollIntervalMs);
        timers.add(timer);
      });
    }

    async function checkOrder() {
      setStatus("checking");
      setMessage("");

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        try {
          const response = await fetch(
            `/api/orders/lookup?session_id=${encodeURIComponent(sessionId)}`,
            { cache: "no-store", signal: controller.signal },
          );
          const result = await response.json();

          if (!response.ok) {
            throw new Error(
              response.status === 401
                ? "Sign in to verify your order."
                : result.error || "Unable to verify your payment.",
            );
          }

          if (result.status === "paid") {
            if (active) {
              setStatus("paid");
            }
            return;
          }

          if (result.status === "checkout_failed") {
            if (active) {
              setStatus("not-completed");
            }
            return;
          }

          if (result.status !== "pending") {
            throw new Error("The order has an unexpected payment status.");
          }

          if (attempt < maxAttempts - 1) {
            await waitForNextAttempt();
          }
        } catch (error) {
          if (active && error.name !== "AbortError") {
            setMessage(error.message || "Unable to verify your payment.");
            setStatus("error");
          }
          return;
        }
      }

      if (active) {
        setStatus("pending");
      }
    }

    checkOrder();

    return () => {
      active = false;
      controller.abort();
      timers.forEach(clearTimeout);
    };
  }, [sessionId, retryCount]);

  let heading = "Checking your payment";
  let description = "We're confirming your order. This usually takes a moment.";

  if (status === "paid") {
    heading = "Payment confirmed";
    description = "Your payment went through. Thank you for your order!";
  } else if (status === "pending") {
    heading = "Your payment is processing";
    description =
      "We're still waiting for payment confirmation. You can check again shortly.";
  } else if (status === "not-completed") {
    heading = "Payment not completed";
    description =
      "We couldn't confirm this order as paid. Please return to the gallery to try again.";
  } else if (status === "invalid") {
    heading = "Order not found";
    description = "This confirmation link is missing its Stripe session.";
  } else if (status === "error") {
    heading = "Unable to verify your payment";
    description = message;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-content flex-1 items-center px-page-gutter py-16">
        <section
          aria-live="polite"
          className="mx-auto w-full max-w-2xl rounded-2xl border border-line bg-surface p-8 text-center shadow-sm sm:p-12"
        >
          {status === "paid" && (
            <div
              aria-hidden="true"
              className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-moss text-3xl font-semibold text-forest"
            >
              ✓
            </div>
          )}
          <h1 className="mb-3 mt-0 font-display text-[clamp(2rem,5vw,3rem)] font-normal leading-tight tracking-[-.04em] text-forest">
            {heading}
          </h1>
          <p className="mb-8 mt-0 text-muted">{description}</p>
          {(status === "pending" || status === "error") && (
            <button
              type="button"
              className="mb-6 rounded-full border border-forest px-5 py-2 font-semibold text-forest transition-colors hover:bg-moss focus-visible:outline-[3px] focus-visible:outline-gold focus-visible:outline-offset-2"
              onClick={() => setRetryCount((count) => count + 1)}
            >
              Check again
            </button>
          )}
          <p className="m-0">
            <Link
              className="font-semibold text-forest underline decoration-leaf underline-offset-4 hover:text-leaf"
              href="/#gallery"
            >
              Return to the gallery
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
