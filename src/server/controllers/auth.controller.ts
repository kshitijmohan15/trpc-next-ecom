import { Prisma, PrismaClient } from "@prisma/client";
import { CreateUserInput, LoginUserInput } from "../schema/user.schema";
import bcrypt from "bcryptjs";
import { Context } from "../trpc/context";
import { TRPCError } from "@trpc/server";
import { signJwt } from "../../utils/jwt";

export const registerController = async ({
	ctx,
	input,
}: {
	ctx: Context;
	input: CreateUserInput;
}) => {
	const { email, name, password } = input;
	try {
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await ctx.prisma?.user.create({
			data: {
				email: email.toLowerCase(),
				name: name,
				password: hashedPassword,
				role: "admin",
				provider: "local",
			},
		});
		return { data: { user }, status: "success" };
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === "P2002") {
				throw new TRPCError({
					code: "CONFLICT",
					message: "Email already exists",
				});
			}
		}
		throw err;
	}
};

export const loginController = async ({ input, ctx }: { input: LoginUserInput; ctx: Context }) => {
	{
		try {
			// Get the user from the collection
			const user = await ctx.prisma.user.findFirst({
				where: { email: input.email.toLowerCase() },
			});

			// Check if user exist and password is correct
			if (!user || !(await bcrypt.compare(input.password, user.password))) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Invalid email or password",
				});
			}

			// Create the Access and refresh Tokens
			const signedToken = signJwt(user);

			// Send Access Token
			const result = {
				status: "success",
				signedToken,
			};
			return result;
		} catch (err: any) {
			throw err;
		}
	}
};
