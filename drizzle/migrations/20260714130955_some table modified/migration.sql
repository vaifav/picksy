ALTER TABLE "order_items" ALTER COLUMN "price" SET DATA TYPE numeric(10,2) USING "price"::numeric(10,2);--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "tax" SET DATA TYPE numeric(10,2) USING "tax"::numeric(10,2);--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "discount" SET DATA TYPE numeric(10,2) USING "discount"::numeric(10,2);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "delivery_charge" SET DATA TYPE numeric(10,2) USING "delivery_charge"::numeric(10,2);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "total_item_price" SET DATA TYPE numeric(10,2) USING "total_item_price"::numeric(10,2);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "total_item_tax" SET DATA TYPE numeric(10,2) USING "total_item_tax"::numeric(10,2);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "total_discount" SET DATA TYPE numeric(10,2) USING "total_discount"::numeric(10,2);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "final_amount" SET DATA TYPE numeric(10,2) USING "final_amount"::numeric(10,2);--> statement-breakpoint
ALTER TABLE "modifiers" ALTER COLUMN "added_price" SET DATA TYPE numeric(10,2) USING "added_price"::numeric(10,2);