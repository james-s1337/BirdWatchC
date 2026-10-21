import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema.js";

let database;

export function getDb() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is missing. Add your pooled Neon connection string to next-project/.env.local.",
    );
  }

  database ??= drizzle(neon(connectionString), { schema });
  return database;
}
