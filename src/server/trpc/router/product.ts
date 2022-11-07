import { createGzip } from "zlib";
import { string, z } from "zod";
import { createProductSchema } from "../../schema/product.schema";
import { router, publicProcedure } from "../trpc";

export const productRouter = router({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const products = await ctx.prisma.product.findMany();
		return products;
	}),
	createOne: publicProcedure.input(createProductSchema).mutation(async ({ ctx, input }) => {
		const data = await ctx.prisma?.product.create({
			data: { ...input, price: String(input.price) },
		});
		return { data };
	}),
});
