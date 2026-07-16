CREATE TABLE "addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"address" jsonb NOT NULL,
	"pincode" varchar(6) NOT NULL,
	"created_at" timestamp(6) DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) DEFAULT now() NOT NULL,
	CONSTRAINT "validate_address" CHECK (jsonb_matches_schema('{"type":"object","properties":{"houseName":{"type":"string"},"location":{"type":"string"},"state":{"type":"string"},"district":{"type":"string"}},"required":["houseName","location","state","district"],"additionalProperties":false}',"address"))
);
--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_profiles_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_pincode_pincodes_pincode_fkey" FOREIGN KEY ("pincode") REFERENCES "pincodes"("pincode") ON DELETE RESTRICT;