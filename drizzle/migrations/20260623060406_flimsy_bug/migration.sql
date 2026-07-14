--> Extensions
CREATE EXTENSION IF NOT EXISTS ltree;

--> statement-breakpoint
CREATE TABLE
	"categories" (
		"id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
		"name" varchar NOT NULL UNIQUE,
		"image" text NOT NULL UNIQUE,
		"is_active" boolean DEFAULT true NOT NULL,
		"path" ltree NOT NULL,
		"created_at" timestamp(6) DEFAULT now () NOT NULL,
		"updated_at" timestamp(6) DEFAULT now () NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"products" (
		"id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
		"slug" varchar NOT NULL UNIQUE,
		"name" varchar(150) NOT NULL,
		"description" text NOT NULL,
		"is_active" boolean DEFAULT true NOT NULL,
		"is_featured" boolean DEFAULT false NOT NULL,
		"is_bestseller" boolean DEFAULT false NOT NULL,
		"is_veg" boolean DEFAULT true NOT NULL,
		"is_vegan" boolean DEFAULT false NOT NULL,
		"category_id" uuid NOT NULL,
		"created_at" timestamp(6) DEFAULT now () NOT NULL,
		"updated_at" timestamp(6) DEFAULT now () NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"products_tags" (
		"product_id" uuid,
		"tag_id" uuid,
		CONSTRAINT "products_tags_id" PRIMARY KEY ("product_id", "tag_id")
	);

--> statement-breakpoint
CREATE TABLE
	"tags" (
		"id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
		"slug" varchar NOT NULL UNIQUE,
		"name" varchar NOT NULL UNIQUE,
		"created_at" timestamp(6) DEFAULT now () NOT NULL,
		"updated_at" timestamp(6) DEFAULT now () NOT NULL
	);

--> statement-breakpoint
CREATE INDEX "category_path_gist_index" ON "categories" USING gist ("path");

--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE CASCADE;

--> statement-breakpoint
ALTER TABLE "products_tags" ADD CONSTRAINT "products_tags_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

--> statement-breakpoint
ALTER TABLE "products_tags" ADD CONSTRAINT "products_tags_tag_id_tags_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE CASCADE;