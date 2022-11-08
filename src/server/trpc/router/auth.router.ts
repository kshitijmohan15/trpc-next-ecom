import { loginController, registerController } from "../../controllers/auth.controller";
import { createUserSchema, loginUserSchema } from "../../schema/user.schema";
import { publicProcedure, router } from "../trpc";

export const authRouter = router({
	registerUser: publicProcedure
		.input(createUserSchema)
		.mutation(async ({ input, ctx }) => registerController({ ctx, input })),
	loginUser: publicProcedure
		.input(loginUserSchema)
		.mutation(async ({ input, ctx }) => loginController({ ctx, input })),
});
