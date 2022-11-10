import { zodResolver } from "@hookform/resolvers/zod";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import FormInput from "../components/FormInput";
import { getFromStore } from "../hooks/zustandHooks";
import { LoadingButton } from "../components/LoadingButton";
import { LoginUserInput, loginUserSchema } from "../server/schema/user.schema";
import { useStore } from "../store/globalStore";
import { verifyJwt } from "../utils/jwt";
import { trpc } from "../utils/trpc";
import { IUser } from "../types/types";
import Layout from "../components/Layout";

const Login = () => {
	// zustand interactions
	const token = getFromStore(useStore, (state) => state.token);
	const authUser = getFromStore(useStore, (state) => state.authUser);
	// const [token, user] = getFromStore(useStore, (state) => [state.token, state.authUser]);
	const [setAuthUser, updateToken, logout] = useStore((state) => [
		state.setAuthUser,
		state.updateToken,
		state.reset,
	]);

	// handle zustand interactions
	function handleLogout() {
		logout();
	}

	// hook-form interactions
	const methods = useForm<LoginUserInput>({
		resolver: zodResolver(loginUserSchema),
	});
	const {
		reset,
		handleSubmit,
		formState: { isSubmitSuccessful },
	} = methods;

	//  trpc
	const { mutate: loginUser, isLoading } = trpc.auth.loginUser.useMutation({
		meta: { headers: { Authorization: `Bearer ${token}` } },
		async onSuccess(data) {
			const { signedToken } = data;
			const decoded = await verifyJwt<IUser>(
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

	const onSubmitHandler: SubmitHandler<LoginUserInput> = (values) => {
		// 👇 Executing the loginUser Mutation
		loginUser(values);
	};

	return (
		<Layout title="Login">
			<FormProvider {...methods}>
				<ToastContainer />
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
						<Link legacyBehavior href="#" className="">
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
						<Link legacyBehavior href="/register">
							<a className="text-ct-blue-600">Sign Up Here</a>
						</Link>
					</span>
				</form>
				<button onClick={handleLogout}>Logout</button>
			</FormProvider>
			<div>{JSON.stringify(authUser)}</div>
		</Layout>
	);
};

export default Login;
