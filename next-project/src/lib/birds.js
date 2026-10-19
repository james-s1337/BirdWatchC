import { asc } from "drizzle-orm";
import { getDb } from "./db/index.js";
import { birds } from "./db/schema.js";

export function getFeaturedBirds() {
  return getDb()
    .select({
      id: birds.id,
      name: birds.name,
      location: birds.location,
      alt: birds.altText,
      category: birds.category,
      image: birds.imagePath,
    })
    .from(birds)
    .orderBy(asc(birds.position), asc(birds.id));
}
