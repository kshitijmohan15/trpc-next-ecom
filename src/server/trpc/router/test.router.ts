import { createGzip } from "zlib";
import { string, z } from "zod";
import { createProductSchema } from "../../schema/product.schema";
import axios from "axios";
import { router, publicProcedure } from "../trpc";
const getCircularReplacer = () => {
	const seen = new WeakSet();
	return (key: any, value: any) => {
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
});
