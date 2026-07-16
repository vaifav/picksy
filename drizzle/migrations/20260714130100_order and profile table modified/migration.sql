ALTER TABLE "orders" RENAME COLUMN "total_amount" TO "final_amount";--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "tax" numeric(2,10) NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "discount" numeric(2,10) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "customer_name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "phone_number" varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "phone_number" varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "price" SET DATA TYPE numeric(2,10) USING "price"::numeric(2,10);--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_phone_number_key" UNIQUE("phone_number");--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "check_phone_number" CHECK ("phone_number" ~ '/^(?:+91[-s]?)?[6789]d{9}$/');--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "check_phone_number" CHECK ("phone_number" ~ '/^(?:+91[-s]?)?[6789]d{9}$/');