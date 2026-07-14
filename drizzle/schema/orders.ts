import {
	check,
	decimal,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { timestamps, id } from "./others/baseFields";
import { pincodes } from "./pincodes";
import { sql } from "drizzle-orm";
import { products } from "./products";

// type Items = { id: SetNotNull<PgUUIDBuilder>; name: string; price: string; count: number }; PgUUIDBuilder, SetNotNull, jsonb, text
export const orderStatus = pgEnum("order_status_enum", [
	"pending",
	"shipped",
	"out for delivery",
	"delivered",
	"returned",
	"requires_review",
]);

export const paymentStatus = pgEnum("payment_status_enum", [
	"pending",
	"authorized",
	"captured",
	"paid",
	"failed",
	"cancelled",
	"refunded",
	"partially_refunded",
]);

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

export const orders = pgTable(
	"orders",
	{
		id,
		orderId: varchar("order_id", { length: 32 }).notNull().unique(),
		status: orderStatus("status").notNull().default("pending"),
		paymentStatus: paymentStatus("payment_status").notNull().default("pending"),
		deliveryCharge: decimal("delivery_charge", { scale: 10, precision: 2 }).notNull(),
		totalItemPrice: decimal("total_item_price", { scale: 10, precision: 2 }).notNull(),
		totalItemTax: decimal("total_item_tax", { scale: 10, precision: 2 }).notNull(),
		totalDiscount: decimal("total_discount", { scale: 10, precision: 2 })
			.notNull()
			.default(sql`${0.0}`),
		totalAmount: decimal("total_amount", { scale: 10, precision: 2 }).notNull(),
		shippingAddress: jsonb("shipping_address").notNull(),
		billingAddress: jsonb("billing_address").notNull(),
		addressPincode: varchar("address_pincode", { length: 6 })
			.notNull()
			.references(() => pincodes.pincode, { onDelete: "restrict" }),
		...timestamps,
	},
	(table) => [
		check(
			"validate_shipping_address",
			sql`jsonb_matches_schema(${JSON.stringify(addressSchema)},${table.shippingAddress})`,
		),
		check(
			"validate_billing_address",
			sql`jsonb_matches_schema(${JSON.stringify(addressSchema)},${table.billingAddress})`,
		),
	],
);

export const orderItems = pgTable("order_items", {
	id,
	orderId: uuid("order_id")
		.notNull()
		.references(() => orders.id, { onDelete: "cascade" }),
	productId: uuid("product_id")
		.notNull()
		.references(() => products.id, { onDelete: "restrict" }),

	name: varchar("name").notNull(),
	sku: varchar("sku").notNull(),
	quantity: integer("quantity").notNull(),
	price: integer("price").notNull(),
});
