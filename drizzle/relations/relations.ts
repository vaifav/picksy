import { defineRelations } from "drizzle-orm";
import * as schema from "../db/index";

export const relations = defineRelations(schema, (r) => ({
	pincodes: {
		profiles: r.many.profiles({
			from: r.pincodes.pincode.through(r.addresses.pincode),
			to: r.profiles.id.through(r.addresses.userId)
		}),
		orders: r.many.orders(),
	},
	profiles: {
		pincodes: r.many.pincodes(),
	},
	orders: {
		products: r.many.products({
			from: r.orders.id.through(r.orderItems.orderId),
			to: r.products.id.through(r.orderItems.productId)
		}),
		pincode: r.one.pincodes({
			from: r.orders.addressPincode,
			to: r.pincodes.pincode
		}),
	},
	products: {
		orders: r.many.orders(),
		productImages: r.many.productImages(),
		category: r.one.categories({
			from: r.products.categoryId,
			to: r.categories.id
		}),
		ingredients: r.many.ingredients(),
		modifiers: r.many.modifiers(),
		paymentMethods: r.many.paymentMethods(),
		tags: r.many.tags({
			from: r.products.id.through(r.productsToTags.productId),
			to: r.tags.id.through(r.productsToTags.tagId)
		}),
		variants: r.many.variants(),
	},
	productImages: {
		product: r.one.products({
			from: r.productImages.productId,
			to: r.products.id
		}),
	},
	categories: {
		products: r.many.products(),
	},
	ingredients: {
		products: r.many.products({
			from: r.ingredients.id.through(r.productsToIngredients.ingredientId),
			to: r.products.id.through(r.productsToIngredients.productId)
		}),
	},
	modifiers: {
		products: r.many.products({
			from: r.modifiers.id.through(r.productsToModifiers.modifierId),
			to: r.products.id.through(r.productsToModifiers.productId)
		}),
	},
	paymentMethods: {
		products: r.many.products({
			from: r.paymentMethods.id.through(r.productsToPaymentMethods.paymentMethodId),
			to: r.products.id.through(r.productsToPaymentMethods.productId)
		}),
	},
	tags: {
		products: r.many.products(),
	},
	variants: {
		product: r.one.products({
			from: r.variants.productId,
			to: r.products.id
		}),
	},
}))