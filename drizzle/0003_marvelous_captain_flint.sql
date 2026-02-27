CREATE TABLE "website_images" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "website_images_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" varchar(255) NOT NULL,
	"image_type" varchar(10) NOT NULL,
	"mime_type" varchar(50) NOT NULL,
	"image_data" "bytea" NOT NULL,
	"original_url" varchar(2048),
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "website_images_slug_image_type_idx" ON "website_images" USING btree ("slug","image_type");