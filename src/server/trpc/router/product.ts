import { createGzip } from "zlib";
import { string, z } from "zod";

import { router, publicProcedure } from "../trpc";

export const productRouter = router({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const products = await ctx.prisma.product.findMany();
		return products;
	}),
	createOne: publicProcedure.input(z.any()).mutation(async ({ ctx, input }) => {
		const { id, ...result } = input;
		const data = await ctx.prisma?.product.create({
			data: { ...result, price: String(result.price) },
		});
		return { data };
	}),
});
