import { Suspense } from "react";
import { connection } from "next/server";
import App from "@/App";
import { getFeaturedBirds } from "@/lib/birds";

async function BirdWatchPage() {
  // Read birds at request time so the build doesn't need database access.
  await connection();
  const birds = await getFeaturedBirds();
  return <App birds={birds} />;
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-content px-page-gutter py-16 text-muted">
          Loading featured birds...
        </main>
      }
    >
      <BirdWatchPage />
    </Suspense>
  );
}
