import { router } from "../trpc";
import { authRouter } from "./auth.router";
import { productRouter } from "./product.router";

export const appRouter = router({
	product: productRouter,
	auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
