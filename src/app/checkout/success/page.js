import { Suspense } from "react";
import { CheckoutSuccess } from "@/components/CheckoutSuccess";

async function CheckoutConfirmation({ searchParams }) {
  const query = await searchParams;
  const sessionId =
    typeof query.session_id === "string" ? query.session_id : "";

  return <CheckoutSuccess sessionId={sessionId} />;
}

export default function CheckoutSuccessPage({ searchParams }) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-content px-page-gutter py-16 text-muted">
          Checking your payment...
        </main>
      }
    >
      <CheckoutConfirmation searchParams={searchParams} />
    </Suspense>
  );
}
