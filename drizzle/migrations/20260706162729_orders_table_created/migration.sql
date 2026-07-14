CREATE TYPE "order_status_enum" AS ENUM (
	'pending',
	'shipped',
	'out for delivery',
	'delivered',
	'returned',
	'requires_review'
);

--> statement-breakpoint
CREATE TYPE "payment_status_enum" AS ENUM (
	'pending',
	'authorized',
	'captured',
	'paid',
	'failed',
	'cancelled',
	'refunded',
	'partially_refunded'
);

--> statement-breakpoint
CREATE TABLE
	"order_items" (
		"id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
		"order_id" uuid NOT NULL,
		"product_id" uuid NOT NULL,
		"name" varchar NOT NULL,
		"sku" varchar NOT NULL,
		"quantity" integer NOT NULL,
		"price" integer NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"orders" (
		"id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
		"order_id" varchar(32) NOT NULL UNIQUE,
		"status" "order_status_enum" DEFAULT 'pending'::"order_status_enum" NOT NULL,
		"payment_status" "payment_status_enum" DEFAULT 'pending'::"payment_status_enum" NOT NULL,
		"delivery_charge" numeric(2, 10) NOT NULL,
		"total_item_price" numeric(2, 10) NOT NULL,
		"total_item_tax" numeric(2, 10) NOT NULL,
		"total_discount" numeric(2, 10) DEFAULT 0.00 NOT NULL,
		"total_amount" numeric(2, 10) NOT NULL,
		"shipping_address" jsonb NOT NULL,
		"billing_address" jsonb NOT NULL,
		"address_pincode" varchar(6) NOT NULL,
		"created_at" timestamp(6) DEFAULT now () NOT NULL,
		"updated_at" timestamp(6) DEFAULT now () NOT NULL,
		CONSTRAINT "validate_shipping_address" CHECK (
			jsonb_matches_schema (
				'{"type":"object","properties":{"houseName":{"type":"string"},"location":{"type":"string"},"state":{"type":"string"},"district":{"type":"string"}},"required":["houseName","location","state","district"],"additionalProperties":false}',
				"shipping_address"
			)
		),
		CONSTRAINT "validate_billing_address" CHECK (
			jsonb_matches_schema (
				'{"type":"object","properties":{"houseName":{"type":"string"},"location":{"type":"string"},"state":{"type":"string"},"district":{"type":"string"}},"required":["houseName","location","state","district"],"additionalProperties":false}',
				"billing_address"
			)
		)
	);

--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE;

--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT;

--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_address_pincode_pincodes_pincode_fkey" FOREIGN KEY ("address_pincode") REFERENCES "pincodes" ("pincode") ON DELETE RESTRICT;