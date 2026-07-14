import { defineConfig } from "drizzle-kit";
import "dotenv";

if (!process.env.DIRECT_URL) {
	throw new Error("DIRECT_URL is missing for migrations");
}

export default defineConfig({
	dialect: "postgresql",
	schema: "./drizzle/schema",
	out: "./drizzle/migrations",
	dbCredentials: {
		url: process.env.DIRECT_URL,
	},
	verbose: true,
	strict: true,
	schemaFilter: ["public","auth"],
});
