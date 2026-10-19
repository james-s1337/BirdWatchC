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

## Validate

```powershell
npm run lint
npm run build
```

The original Vite app remains in the sibling `../vite-project` directory while this version is being tested.
