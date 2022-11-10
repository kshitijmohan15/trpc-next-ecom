import { router } from "../trpc";
import { authRouter } from "./auth.router";
import { productRouter } from "./product.router";
import { testRouter } from "./test.router";

export const appRouter = router({
	product: productRouter,
	auth: authRouter,
	test: testRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
