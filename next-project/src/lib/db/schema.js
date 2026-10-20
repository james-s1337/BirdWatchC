import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const birds = pgTable(
  "birds",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    position: integer("position").notNull().default(0),
    name: text("name").notNull(),
    location: text("location").notNull(),
    altText: text("alt_text").notNull(),
    category: text("category").notNull(),
    imagePath: text("image_path").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("birds_slug_unique").on(table.slug)],
);

export const spottedBirds = pgTable(
  "spotted_birds",
  {
    userId: text("user_id").notNull(),
    birdId: integer("bird_id")
      .notNull()
      .references(() => birds.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.birdId] })],
);
