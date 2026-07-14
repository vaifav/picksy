import { defineRelations } from "drizzle-orm";
import * as schema from "../db/index";

export const relations = defineRelations(schema, (relation) => {
	return {
		products: {
			categories: relation.one.categories({
				from: relation.products.categoryId,
				to: relation.categories.id,
			}),
			productsToTags: relation.many.productsToTags(),
			productsToIngredients: relation.many.productsToIngredients(),
			productsToModifiers: relation.many.productsToModifiers(),
			productsToPaymentMethods: relation.many.productsToPaymentMethods(),
		},
		categories: { products: relation.many.products() },
		tags: { productsToTags: relation.many.productsToTags() },
		modifiers: { productsToModifiers: relation.many.productsToModifiers() },
		ingredients: { productsToIngredients: relation.many.productsToIngredients() },
		paymentMethods: { productsToPaymentMethods: relation.many.productsToPaymentMethods() },
		productsToTags: {
			products: relation.one.products({
				from: relation.productsToTags.productId,
				to: relation.products.id,
			}),
			tags: relation.one.tags({ from: relation.productsToTags.tagId, to: relation.tags.id }),
		},
		productsToIngredients: {
			products: relation.one.products({
				from: relation.productsToIngredients.productId,
				to: relation.products.id,
			}),
			ingredients: relation.one.ingredients({
				from: relation.productsToIngredients.ingredientId,
				to: relation.ingredients.id,
			}),
		},
		productsToModifiers: {
			products: relation.one.products({
				from: relation.productsToModifiers.productId,
				to: relation.products.id,
			}),
			modifiers: relation.one.modifiers({
				from: relation.productsToModifiers.modifierId,
				to: relation.modifiers.id,
			}),
		},
		productsToPaymentMethods: {
			products: relation.one.products({
				from: relation.productsToPaymentMethods.productId,
				to: relation.products.id,
			}),
			paymentMethods: relation.one.paymentMethods({
				from: relation.productsToPaymentMethods.paymentMethodId,
				to: relation.paymentMethods.id,
			}),
		},

		
	};
});
// profiles: {
		// 	users: relation.one.users({ from: relation.profiles.userId, to: relation.users.id }),
		// },
		// users: { profiles: relation.one.profiles() },