import {
	pgTable,
	uuid,
	varchar,
	text,
	boolean,
	index,
	primaryKey,
	check,
	decimal,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { id, timestamps } from "@/drizzle/schema/others/baseFields";
import { ltree } from "@/drizzle/schema/others/extensions";

export const products = pgTable(
	"products",
	{
		id,
		slug: varchar("slug").unique().notNull(),
		name: varchar("name", { length: 150 }).notNull(),
		description: text("description").notNull(),
		isActive: boolean("is_active").default(true).notNull(),
		isFeatured: boolean("is_featured").default(false).notNull(),
		isBestseller: boolean("is_bestseller").default(false).notNull(),
		isVeg: boolean("is_veg").default(true).notNull(),
		isVegan: boolean("is_vegan").default(false).notNull(),
		categoryId: uuid("category_id")
			.notNull()
			.references(() => categories.id, { onDelete: "cascade" }),
		...timestamps,
	},
	(table) => [check("veg_vegan_check", sql`NOT ${table.isVegan} OR ${table.isVeg}`)],
);

export const tags = pgTable("tags", {
	id,
	slug: varchar("slug").unique().notNull(),
	name: varchar("name").unique().notNull(),
	...timestamps,
});

export const ingredients = pgTable("ingredients", {
	id,
	slug: varchar("slug").unique().notNull(),
	name: varchar("name").unique().notNull(),
	...timestamps,
});

export const modifiers = pgTable("modifiers", {
	id,
	slug: varchar("slug").unique().notNull(),
	name: varchar("name").unique().notNull(),
	addedPrice: decimal("added_price", { scale: 10, precision: 2 }).notNull(),
	...timestamps,
});

export const paymentMethods = pgTable("payment_methods", {
	id,
	slug: varchar("slug").unique().notNull(),
	name: varchar("name").unique().notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	...timestamps,
});

export const categories = pgTable(
	"categories",
	{
		id,
		name: varchar("name").unique().notNull(),
		image: text("image").unique().notNull(),
		isActive: boolean("is_active").default(true).notNull(),
		path: ltree("path").notNull(),
		...timestamps,
	},
	(table) => [index("category_path_gist_index").using("gist", table.path)],
);

export const productsToTags = pgTable(
	"products_tags",
	{
		productId: uuid("product_id")
			.notNull()
			.references(() => products.id, { onDelete: "cascade" }),
		tagId: uuid("tag_id")
			.notNull()
			.references(() => tags.id, { onDelete: "cascade" }),
	},
	(table) => [primaryKey({ name: "products_tags_id", columns: [table.productId, table.tagId] })],
);

export const productsToIngredients = pgTable(
	"products_ingredients",
	{
		productId: uuid("product_id")
			.notNull()
			.references(() => products.id, { onDelete: "cascade" }),
		ingredientId: uuid("ingredient_id")
			.notNull()
			.references(() => ingredients.id, { onDelete: "cascade" }),
	},
	(table) => [
		primaryKey({
			name: "products_ingredients_id",
			columns: [table.productId, table.ingredientId],
		}),
	],
);

export const productsToModifiers = pgTable(
	"products_modifiers",
	{
		productId: uuid("product_id")
			.notNull()
			.references(() => products.id, { onDelete: "cascade" }),
		modifierId: uuid("modifier_id")
			.notNull()
			.references(() => modifiers.id, { onDelete: "cascade" }),
	},
	(table) => [
		primaryKey({ name: "products_modifiers_id", columns: [table.productId, table.modifierId] }),
	],
);

export const productsToPaymentMethods = pgTable(
	"products_payment_methods",
	{
		productId: uuid("product_id")
			.notNull()
			.references(() => products.id, { onDelete: "cascade" }),
		paymentMethodId: uuid("payment_method_id")
			.notNull()
			.references(() => paymentMethods.id, { onDelete: "cascade" }),
	},
	(table) => [
		primaryKey({
			name: "products_payment_method_id",
			columns: [table.productId, table.paymentMethodId],
		}),
	],
);
