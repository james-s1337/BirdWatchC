# Bird Watch (Next.js)

This is the Next.js App Router version of the Bird Watch photography site.
It is a port of the existing React UI; the gallery still uses local sample data from `src/data/birds.js`.
Neon/Postgres is not connected yet.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Validate

```powershell
npm run lint
npm run build
```

The original Vite app remains in the sibling `../vite-project` directory while this version is being tested.
