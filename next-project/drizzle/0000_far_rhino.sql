CREATE TABLE "birds" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL,
	"alt_text" text NOT NULL,
	"category" text NOT NULL,
	"image_path" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "birds_slug_unique" ON "birds" USING btree ("slug");