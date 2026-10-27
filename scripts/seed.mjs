import dotenv from "dotenv";
import { sql } from "drizzle-orm";
import { birds as seedBirds } from "../src/data/birds.js";
import { getDb } from "../src/lib/db/index.js";
import { birds } from "../src/lib/db/schema.js";

dotenv.config({ path: ".env.local" });
dotenv.config();

const database = getDb();

await database
  .insert(birds)
  .values(
    seedBirds.map((bird, position) => ({
      slug: bird.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
      position,
      name: bird.name,
      location: bird.location,
      altText: bird.alt,
      category: bird.category,
      imagePath: bird.image,
      price: Math.floor(Math.random() * 501) + 1500,
      currency: "CAD",
    })),
  )
  .onConflictDoUpdate({
    target: birds.slug,
    set: {
      position: sql`excluded.position`,
      name: sql`excluded.name`,
      location: sql`excluded.location`,
      altText: sql`excluded.alt_text`,
      category: sql`excluded.category`,
      imagePath: sql`excluded.image_path`,
    },
  });

console.log(`Seeded ${seedBirds.length} birds.`);
