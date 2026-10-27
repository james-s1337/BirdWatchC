ALTER TABLE "birds" ADD COLUMN "price" integer;--> statement-breakpoint
UPDATE "birds" SET "price" = 1500 + floor(random() * 501)::integer;--> statement-breakpoint
ALTER TABLE "birds" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "birds" ADD COLUMN "currency" varchar(3) DEFAULT 'CAD' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "stripe_session_id" text;--> statement-breakpoint
CREATE UNIQUE INDEX "orders_stripe_session_id_unique" ON "orders" USING btree ("stripe_session_id");--> statement-breakpoint
ALTER TABLE "birds" ADD CONSTRAINT "birds_price_positive" CHECK ("birds"."price" > 0);