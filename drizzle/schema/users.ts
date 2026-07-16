import { check, jsonb, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps, id } from "./others/baseFields";
import { sql } from "drizzle-orm";
import { pincodes } from "./pincodes";

const addressSchema = {
	type: "object",
	properties: {
		houseName: { type: "string" },
		location: { type: "string" },
		state: { type: "string" },
		district: { type: "string" },
	},
	required: ["houseName", "location", "state", "district"],
	additionalProperties: false,
};

export const profiles = pgTable(
	"profiles",
	{
		id,
		userId: uuid("user_id").notNull().unique(),
		username: varchar("username", { length: 60 }),
		avatar: text("avatar").unique(),
		email: text("email").unique(),
		phoneNumber: varchar("phone_number", { length: 15 }).notNull().unique(),
		...timestamps,
	},
	(table) => [
		check("check_phone_number", sql`${table.phoneNumber} ~ /^(?:\+91[\-\s]?)?[6789]\d{9}$/`),
	],
);

export const addresses = pgTable(
	"addresses",
	{
		id,
		userId: uuid("user_id")
			.notNull()
			.references(() => profiles.id, { onDelete: "cascade" }),
		address: jsonb("address").notNull(),
		pincode: varchar("pincode", { length: 6 })
			.notNull()
			.references(() => pincodes.pincode, { onDelete: "restrict" }),
		...timestamps,
	},
	(table) => [
		check(
			"validate_address",
			sql`jsonb_matches_schema(${JSON.stringify(addressSchema)},${table.address})`,
		),
	],
);
