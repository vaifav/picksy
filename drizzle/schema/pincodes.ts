import { char, doublePrecision, pgTable, varchar } from "drizzle-orm/pg-core";
import { id } from "./others/baseFields";

export const pincodes = pgTable("pincodes", {
	id,
	pincode: char("pincode", { length: 6 }).unique().notNull(),
	state: varchar("state", { length: 100 }).notNull(),
	district: varchar("district", { length: 100 }).notNull(),
	latitude: doublePrecision("latitude"),
	longitude: doublePrecision("longitude"),
});

