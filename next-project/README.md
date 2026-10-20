# Bird Watch (Next.js)

This is the Next.js App Router version of the Bird Watch photography site. The featured gallery reads bird records from Neon Postgres; `src/data/birds.js` is the seed data source.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Connect Neon and load the sample birds

Create `next-project/.env.local` with your pooled connection string for app queries and, optionally, the direct connection string for migrations:

```env
DATABASE_URL="your-pooled-Neon-connection-string"
DATABASE_URL_UNPOOLED="your-direct-Neon-connection-string"
```

Keep these values private. Do not prefix them with `NEXT_PUBLIC_` or commit `.env.local`.

Run the tracked schema migration, then seed (or update) the eight sample birds:

```powershell
npm run db:migrate
npm run db:seed
```

The seed operation is safe to rerun: it updates seeded records by slug and does not delete other rows. App queries use `DATABASE_URL`; migrations prefer `DATABASE_URL_UNPOOLED`.

## Authentication

The header supports email/password sign-up, sign-in, and sign-out through Neon Managed Auth. The browser talks to the app's `/api/auth` route, and its session is restored from the auth cookie when the page is refreshed.

Enable Managed Auth for the Neon branch used by this app, then configure these private values in `next-project/.env.local`:

```env
NEON_AUTH_BASE_URL="your-branch-auth-url"
NEON_AUTH_COOKIE_SECRET="a-random-secret-at-least-32-characters-long"
```

Get the branch auth URL from the Neon Console. Generate the cookie secret with `openssl rand -base64 32`. Keep both values server-side and do not commit `.env.local`. For deployed environments, configure the same values as server environment variables and add the app's origin to the branch's trusted auth domains.

Spotted-bird selections are stored in the `spotted_birds` table per signed-in user. The tracked migration creates this table; run `npm run db:migrate` when setting up a database or pulling these changes.

## Validate

```powershell
npm run lint
npm run build
```

The original Vite app remains in the sibling `../vite-project` directory while this version is being tested.
