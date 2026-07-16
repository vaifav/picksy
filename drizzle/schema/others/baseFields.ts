import { sql } from "drizzle-orm";
import { timestamp, uuid } from "drizzle-orm/pg-core";
export const timestamps = {
	createdAt: timestamp("created_at", { precision: 6, mode: "string" }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: "string" })
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date().toISOString()),
};

export const id = uuid("id")
	.default(sql`gen_random_uuid()`)
	.primaryKey()
	.notNull();