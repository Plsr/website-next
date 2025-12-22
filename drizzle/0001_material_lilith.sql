ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "os" varchar(50);--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "country" varchar(2);