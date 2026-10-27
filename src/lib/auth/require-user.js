import { auth } from "@/lib/auth/server";

export async function requireAuthenticatedUser(message = "Sign in to continue.") {
  const { data: session, error } = await auth.getSession();

  if (error) {
    console.error("Unable to retrieve the current auth session.", error);
    return {
      error: Response.json(
        { error: "Unable to verify session." },
        { status: 500 },
      ),
    };
  }

  if (!session?.user) {
    return {
      error: Response.json({ error: message }, { status: 401 }),
    };
  }

  return { user: session.user };
}
