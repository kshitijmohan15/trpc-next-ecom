import type { GetServerSideProps, NextPage } from "next";
import { object, string, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import FormInput from "../components/FormInput";
import Link from "next/link";
import { LoadingButton } from "../components/LoadingButton";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { trpc } from "../utils/trpc";
import { CreateUserInput, createUserSchema } from "../server/schema/user.schema";
import Layout from "../components/Layout";

const RegisterPage: NextPage = () => {
	const router = useRouter();
	const { mutate: SignUpUser, isLoading } = trpc.auth.registerUser.useMutation({
		onSuccess(data) {
			toast(`Welcome ${data.data.user.name}!`, {
				type: "success",
				position: "top-right",
			});
			console.log(data.data.user.name);
		},
		onError(error) {
			toast(error.message, {
				type: "error",
				position: "top-right",
			});
		},
	});

	const methods = useForm<CreateUserInput>({
		resolver: zodResolver(createUserSchema),
	});

	const {
		reset,
		handleSubmit,
		formState: { isSubmitSuccessful },
	} = methods;

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSubmitSuccessful]);

	const onSubmitHandler: SubmitHandler<CreateUserInput> = (values) => {
		// registering
		SignUpUser(values);
	};
	return (
		<Layout title="Register">
			<section className="bg-ct-blue-600 grid min-h-screen w-full place-items-center py-8">
				<div className="w-full">
					<h1 className="text-ct-yellow-600 mb-4 text-center text-4xl font-[600] xl:text-6xl">
						Welcome to myEcommerceSite!
					</h1>
					<h2 className="text-ct-dark-200 mb-4 text-center text-lg">
						Sign Up To Get Started!
					</h2>
					<FormProvider {...methods}>
						<form
							onSubmit={handleSubmit(onSubmitHandler)}
							className="bg-ct-dark-200 mx-auto w-full max-w-md space-y-5 overflow-hidden rounded-2xl p-8 shadow-lg"
						>
							<FormInput label="Full Name" name="name" />
							<FormInput label="Email" name="email" type="email" />
							<FormInput label="Password" name="password" type="password" />
							<FormInput
								label="Confirm Password"
								name="passwordConfirm"
								type="password"
							/>
							<span className="block">
								Already have an account?{" "}
								<Link legacyBehavior href="/login">
									<a className="text-ct-blue-600">Login Here</a>
								</Link>
							</span>
							<LoadingButton loading={isLoading} textColor="text-ct-blue-600">
								Sign Up
							</LoadingButton>
						</form>
					</FormProvider>
				</div>
			</section>
		</Layout>
	);
};

export default RegisterPage;
