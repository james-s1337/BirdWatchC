import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env.local" });
dotenv.config();

const databaseUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

// `drizzle-kit generate` only diffs the schema against existing migrations and
// doesn't need a connection, so credentials are optional here. Commands that do
// connect (migrate, push, studio) will report a clear error if they're missing.
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.js",
  out: "./drizzle",
  ...(databaseUrl && { dbCredentials: { url: databaseUrl } }),
});
