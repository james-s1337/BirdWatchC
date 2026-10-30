# Bird Watch C (Next.js) -> https://birdwatchc.netlify.app/

This is the Next.js App Router version of the Bird Watch photography site. The featured gallery reads bird records from Neon Postgres; `src/data/birds.js` is the seed data source.

## Site features

- Responsive bird-photography landing page with home, gallery, about, and contact sections.
- Featured bird gallery with photos, descriptive alt text, capture locations, and category filters.
- Sign-up, sign-in, and sign-out controls using email and password.
- Signed-in users can mark birds as spotted; their selections persist to their account and are restored when they return.
- Contact form opens the visitor's email app with the request details prepared. It does not submit to a site-side booking API.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Backend functionality

- Neon Postgres stores featured bird records and each user's spotted-bird selections. Drizzle ORM handles database queries.
- The home page loads featured birds from the database on the server. `GET /api/birds` also returns the featured birds as JSON.
- `GET /api/spotted` returns the signed-in user's spotted bird IDs. `PUT /api/spotted` adds or removes a sighting, validating the request and bird record. These endpoints require a signed-in user.
- `POST /api/checkout` requires a signed-in user and a `birdId`; it reads the bird's stored price and currency, creates a pending order, then returns a Stripe Checkout URL. Prices are randomized once per seeded bird between CAD $15.00 and $20.00 and stored in cents; reseeding existing birds preserves their prices. Never send or trust a browser-provided price.
- `GET`, `POST`, `PUT`, `DELETE`, and `PATCH` requests to `/api/auth` are handled by Neon Managed Auth.
- `src/data/birds.js` contains sample seed records; the site reads its gallery records from the database, not directly from that file.

## Connect Neon and load the sample birds

Create `.env.local` in the repository root with your pooled connection string for app queries and, optionally, the direct connection string for migrations:

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

## Checkout

Set these server-only values in `.env.local` to enable Stripe Checkout:

```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
APP_URL="http://localhost:3000"
```

Use the HTTPS origin of your deployed app for `APP_URL` in production. Apply database migrations and seed the birds before using checkout. Each bird card's **Order now** button sends the bird ID to `POST /api/checkout`; the server reads the price from the database, creates a pending order, and redirects the signed-in user to Stripe Checkout.

For local webhook testing, install and sign in to the [Stripe CLI](https://docs.stripe.com/stripe-cli), then run:

```powershell
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the `whsec_...` signing secret printed by `stripe listen` into `STRIPE_WEBHOOK_SECRET` in `.env.local`, then restart the Next.js dev server. Use Stripe test-mode API keys, sign in to the site, and place an order. Complete the hosted Checkout page with test card `4242 4242 4242 4242`, any future expiry date, and any CVC. Stripe sends the signed event to the local webhook; only a verified, paid Checkout Session matching the pending order can mark it paid. Keep the Stripe CLI listener running while testing and never expose either secret in client-side code or commit them.

## Authentication

The header supports email/password sign-up, sign-in, and sign-out through Neon Managed Auth. The browser talks to the app's `/api/auth` route, and its session is restored from the auth cookie when the page is refreshed.

Enable Managed Auth for the Neon branch used by this app, then configure these private values in the root `.env.local`:

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
