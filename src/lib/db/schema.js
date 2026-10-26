import {
  check,
  integer,
  index,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

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

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    status: text("status").notNull().default("pending"),
    totalAmount: integer("total_amount").notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("USD"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    paidAt: timestamp("paid_at", { withTimezone: true }),
  },
  (table) => [
    index("orders_user_id_idx").on(table.userId),
    check("orders_total_amount_nonnegative", sql`${table.totalAmount} >= 0`),
  ],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    birdId: integer("bird_id").references(() => birds.id, {
      onDelete: "set null",
    }),
    photoName: text("photo_name").notNull(),
    imagePath: text("image_path").notNull(),
    unitPrice: integer("unit_price").notNull(),
    quantity: integer("quantity").notNull().default(1),
  },
  (table) => [
    index("order_items_order_id_idx").on(table.orderId),
    check("order_items_unit_price_nonnegative", sql`${table.unitPrice} >= 0`),
    check("order_items_quantity_positive", sql`${table.quantity} > 0`),
  ],
);
