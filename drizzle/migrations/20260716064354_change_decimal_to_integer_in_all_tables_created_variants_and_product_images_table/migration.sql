CREATE TABLE "product_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"product_id" uuid NOT NULL,
	"url" text NOT NULL,
	"alt_text" varchar(255) DEFAULT 'product image',
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp(6) DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"product_id" uuid NOT NULL,
	"sku" varchar NOT NULL UNIQUE,
	"stock" integer NOT NULL,
	"size" varchar DEFAULT '100g' NOT NULL,
	"price_cents" integer NOT NULL,
	"compare_price_cents" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "price" SET DATA TYPE integer USING "price"::integer;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "tax" SET DATA TYPE integer USING "tax"::integer;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "discount" SET DATA TYPE integer USING "discount"::integer;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "delivery_charge" SET DATA TYPE integer USING "delivery_charge"::integer;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "total_item_price" SET DATA TYPE integer USING "total_item_price"::integer;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "total_item_tax" SET DATA TYPE integer USING "total_item_tax"::integer;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "total_discount" SET DATA TYPE integer USING "total_discount"::integer;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "final_amount" SET DATA TYPE integer USING "final_amount"::integer;--> statement-breakpoint
ALTER TABLE "modifiers" ALTER COLUMN "added_price" SET DATA TYPE integer USING "added_price"::integer;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "variants" ADD CONSTRAINT "variants_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE;