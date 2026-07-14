CREATE TABLE
	"pincodes" (
		"id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
		"pincode" char(6) NOT NULL UNIQUE,
		"state" varchar(100) NOT NULL,
		"district" varchar(100) NOT NULL,
		"latitude" double precision,
		"longitude" double precision
	);