import { getFeaturedBirds } from "@/lib/birds";

export async function GET() {
  const birds = await getFeaturedBirds();
  return Response.json(birds);
}
