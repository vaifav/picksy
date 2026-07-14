CREATE TABLE
	"profile" (
		"id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
		"user_id" uuid NOT NULL UNIQUE,
		"username" varchar(60),
		"avatar" text UNIQUE,
		"email" text UNIQUE,
		"created_at" timestamp(6) DEFAULT now () NOT NULL,
		"updated_at" timestamp(6) DEFAULT now () NOT NULL
	);