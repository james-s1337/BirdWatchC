import { connection } from "next/server";
import { getFeaturedBirds } from "@/lib/birds";

export async function GET() {
  // Query at request time rather than prerendering during the build.
  await connection();
  const birds = await getFeaturedBirds();
  return Response.json(birds);
}
