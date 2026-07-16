import { check, integer, jsonb, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps, id } from "./others/baseFields";
import { pincodes } from "./pincodes";
import { sql } from "drizzle-orm";
import { products } from "./products";

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
		deliveryCharge: integer("delivery_charge").notNull(),
		totalItemPrice: integer("total_item_price").notNull(),
		totalItemTax: integer("total_item_tax").notNull(),
		totalDiscount: integer("total_discount")
			.notNull()
			.default(sql`${0.0}`),
		finalAmount: integer("final_amount").notNull(),
		customerName: varchar("customer_name").notNull(),
		phoneNumber: varchar("phone_number", { length: 15 }).notNull(),
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
		check("check_phone_number", sql`${table.phoneNumber} ~ /^(?:\+91[\-\s]?)?[6789]\d{9}$/`),
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
	tax: integer("tax").notNull(),
	discount: integer("discount").notNull(),
});
