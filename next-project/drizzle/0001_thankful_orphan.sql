CREATE TABLE "spotted_birds" (
	"user_id" text NOT NULL,
	"bird_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "spotted_birds_user_id_bird_id_pk" PRIMARY KEY("user_id","bird_id")
);
--> statement-breakpoint
ALTER TABLE "spotted_birds" ADD CONSTRAINT "spotted_birds_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;