import { and, asc, eq } from "drizzle-orm";
import { getAuth } from "@/lib/auth/server";
import { getDb } from "@/lib/db";
import { birds, spottedBirds } from "@/lib/db/schema";

async function getAuthenticatedUser() {
  const { data: session, error } = await getAuth().getSession();

  if (error) {
    console.error("Unable to retrieve the current auth session.", error);
    return { error: Response.json({ error: "Unable to verify session." }, { status: 500 }) };
  }

  if (!session?.user) {
    return { error: Response.json({ error: "Sign in to save spotted birds." }, { status: 401 }) };
  }

  return { user: session.user };
}

export async function GET() {
  const { user, error } = await getAuthenticatedUser();
  if (error) {
    return error;
  }

  const rows = await getDb()
    .select({ birdId: spottedBirds.birdId })
    .from(spottedBirds)
    .where(eq(spottedBirds.userId, user.id))
    .orderBy(asc(spottedBirds.birdId));

  return Response.json({ birdIds: rows.map((row) => row.birdId) });
}

export async function PUT(request) {
  const { user, error } = await getAuthenticatedUser();
  if (error) {
    return error;
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const { birdId, spotted } = body ?? {};
  if (!Number.isInteger(birdId) || birdId < 1 || typeof spotted !== "boolean") {
    return Response.json(
      { error: "birdId must be a positive integer and spotted must be a boolean." },
      { status: 400 },
    );
  }

  const db = getDb();
  const [bird] = await db
    .select({ id: birds.id })
    .from(birds)
    .where(eq(birds.id, birdId))
    .limit(1);

  if (!bird) {
    return Response.json({ error: "Bird not found." }, { status: 404 });
  }

  if (spotted) {
    await db
      .insert(spottedBirds)
      .values({ userId: user.id, birdId })
      .onConflictDoNothing();
  } else {
    await db
      .delete(spottedBirds)
      .where(
        and(
          eq(spottedBirds.userId, user.id),
          eq(spottedBirds.birdId, birdId),
        ),
      );
  }

  return Response.json({ birdId, spotted });
}
