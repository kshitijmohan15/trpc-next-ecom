import { zodResolver } from "@hookform/resolvers/zod";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import FormInput from "../components/FormInput";
import Button from "@mui/material/Button";
import { useGetFromStore } from "../hooks/zustandHooks";
import { LoadingButton } from "../components/LoadingButton";
import { LoginUserInput, loginUserSchema } from "../server/schema/user.schema";
import { useAuthUser, useStore, useToken } from "../store/globalStore";
import { verifyJwt } from "../utils/jwt";
import { trpc } from "../utils/trpc";
import { IUser } from "../types/types";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const Login = () => {
	// zustand interactions
	const token = useToken();
	const authUser = useAuthUser();
	// these never change, so they can be imported together at once without re-rendering this component.
	const [logout, setAuthUser, updateToken] = useStore((state) => [
		state.reset,
		state.setAuthUser,
		state.updateToken,
	]);

	// handle zustand interactions
	const nextRouter = useRouter();
	// hook-form interactions
	const methods = useForm<LoginUserInput>({
		resolver: zodResolver(loginUserSchema),
	});
	const {
		handleSubmit,
		formState: { isSubmitSuccessful },
	} = methods;

	//  trpc
	const { mutate: loginUser, isLoading } = trpc.auth.loginUser.useMutation({
		async onSuccess(data) {
			const { signedToken } = data;
			verifyJwt<IUser>(
				signedToken,
				process.env.NEXT_PUBLIC_SECRET_KEY!,
				async (err: any, result: any) => {
					if (err) {
						toast(err.message, {
							type: "error",
							position: "top-right",
						});
					}
					toast("Logged in", {
						type: "success",
						position: "top-right",
					});
					updateToken(signedToken);
					setAuthUser({
						name: result.name,
						role: result.role,
						email: result.email,
					});
					nextRouter.push("/profile");
					return result;
				}
			);
		},
		onError(error) {
			toast(error.message, {
				type: "error",
				position: "top-right",
			});
		},
	});
	const { mutate: testJwt } = trpc.test.validateJwt.useMutation({
		onSuccess() {
			handleToast("JWT Verified", "success");
		},
		onError(error) {
			handleToast(error.message, "error");
			logout();
		},
	});

	function handleVerifyJWT() {
		testJwt(token as string);
	}

	const onSubmitHandler: SubmitHandler<LoginUserInput> = (values) => {
		loginUser(values);
	};

	const handleToast = (message: string, type: ToastOptions["type"]) =>
		toast(message, { type: type, position: "top-right" });

	return (
		<Layout title="Login">
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(onSubmitHandler)}
					className="bg-ct-dark-200 mx-auto flex w-full max-w-md flex-col space-y-5 overflow-hidden rounded-2xl p-8 shadow-lg"
				>
					<FormInput label="Email" name="email" type="email" />
					<FormInput
						label="Password"
						name="password"
						type="password"
					/>

					<div className="text-right">
						<Link href="#" className="">
							Forgot Password?
						</Link>
					</div>
					<LoadingButton
						loading={isLoading}
						textColor="text-ct-blue-600"
					>
						Login
					</LoadingButton>
					<span className="block">
						Need an account?{" "}
						<Link href="/register">
							<div className="text-ct-blue-600">Sign Up Here</div>
						</Link>
					</span>
				</form>
			</FormProvider>
			<div className="flex w-10 flex-col gap-4 px-8">
				<pre>
					<div>{JSON.stringify(authUser, null, 2)}</div>
				</pre>
				<Button variant="outlined" onClick={handleVerifyJWT}>
					Done
				</Button>
			</div>
			<ToastContainer />
		</Layout>
	);
};

export default Login;
