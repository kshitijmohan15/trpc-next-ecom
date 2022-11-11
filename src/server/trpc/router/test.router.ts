import { z } from "zod";
import jwt from "jsonwebtoken";
import axios from "axios";
import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
const getCircularReplacer = () => {
	const seen = new WeakSet();
	return (value: any) => {
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) {
				return;
			}
			seen.add(value);
		}
		return value;
	};
};
//  https://webhook.site/6c8b21ba-8290-4081-a44c-2c3901b7dd80
export const testRouter = router({
	post: publicProcedure.mutation(async ({ ctx }) => {
		const req = ctx.req.headers;
		const sent_req = JSON.stringify(req, getCircularReplacer());
		const result = await axios.post(
			"https://webhook.site/6c8b21ba-8290-4081-a44c-2c3901b7dd80",
			sent_req
		);
		return result;
	}),
	validateJwt: publicProcedure
		.input(z.string())
		.mutation(async ({ ctx, input }) => {
			try {
				const decoded = jwt.verify(
					input,
					process.env.NEXT_PUBLIC_SECRET_KEY!
				);
			} catch (error) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "JWT could not be verified",
				});
			}
		}),
});
