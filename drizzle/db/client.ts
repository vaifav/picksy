import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/drizzle/db/index";
import { relations } from "@/drizzle/relations/relations";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL connection string is missing");

export const db = drizzle({
	client: postgres(connectionString, { prepare: false }),
	schema: { ...schema, ...relations },
});
