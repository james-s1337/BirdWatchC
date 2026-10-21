import { createNeonAuth } from "@neondatabase/auth/next/server";

let auth;

// Created lazily so `next build` can load the routes that import this module
// without auth credentials; the check runs on the first request instead.
export function getAuth() {
  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

  if (!baseUrl || !cookieSecret) {
    throw new Error(
      "NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET must be configured to use authentication.",
    );
  }

  auth ??= createNeonAuth({
    baseUrl,
    cookies: { secret: cookieSecret },
  });
  return auth;
}
