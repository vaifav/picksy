import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps, id } from "./others/baseFields";

export const profiles = pgTable("profiles", {
	id,
	userId: uuid("user_id").notNull().unique(),
	username: varchar("username", { length: 60 }),
	avatar: text("avatar").unique(),
	email: text("email").unique(),
	...timestamps,
});
