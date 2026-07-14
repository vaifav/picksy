CREATE TABLE
	"ingredients" (
		"id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
		"slug" varchar NOT NULL UNIQUE,
		"name" varchar NOT NULL UNIQUE,
		"created_at" timestamp(6) DEFAULT now () NOT NULL,
		"updated_at" timestamp(6) DEFAULT now () NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"modifiers" (
		"id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
		"slug" varchar NOT NULL UNIQUE,
		"name" varchar NOT NULL UNIQUE,
		"added_price" numeric(2, 10) NOT NULL,
		"created_at" timestamp(6) DEFAULT now () NOT NULL,
		"updated_at" timestamp(6) DEFAULT now () NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"payment_methods" (
		"id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
		"slug" varchar NOT NULL UNIQUE,
		"name" varchar NOT NULL UNIQUE,
		"is_active" boolean DEFAULT true NOT NULL,
		"created_at" timestamp(6) DEFAULT now () NOT NULL,
		"updated_at" timestamp(6) DEFAULT now () NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"products_ingredients" (
		"product_id" uuid,
		"ingredient_id" uuid,
		CONSTRAINT "products_ingredients_id" PRIMARY KEY ("product_id", "ingredient_id")
	);

--> statement-breakpoint
CREATE TABLE
	"products_modifiers" (
		"product_id" uuid,
		"modifier_id" uuid,
		CONSTRAINT "products_modifiers_id" PRIMARY KEY ("product_id", "modifier_id")
	);

--> statement-breakpoint
CREATE TABLE
	"products_payment_methods" (
		"product_id" uuid,
		"payment_method_id" uuid,
		CONSTRAINT "products_payment_method_id" PRIMARY KEY ("product_id", "payment_method_id")
	);

--> statement-breakpoint
ALTER TABLE "products_ingredients" ADD CONSTRAINT "products_ingredients_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

--> statement-breakpoint
ALTER TABLE "products_ingredients" ADD CONSTRAINT "products_ingredients_ingredient_id_ingredients_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id") ON DELETE CASCADE;

--> statement-breakpoint
ALTER TABLE "products_modifiers" ADD CONSTRAINT "products_modifiers_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

--> statement-breakpoint
ALTER TABLE "products_modifiers" ADD CONSTRAINT "products_modifiers_modifier_id_modifiers_id_fkey" FOREIGN KEY ("modifier_id") REFERENCES "modifiers" ("id") ON DELETE CASCADE;

--> statement-breakpoint
ALTER TABLE "products_payment_methods" ADD CONSTRAINT "products_payment_methods_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

--> statement-breakpoint
ALTER TABLE "products_payment_methods" ADD CONSTRAINT "products_payment_methods_fS3OcP3nuOq7_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods" ("id") ON DELETE CASCADE;