import Link from "next/link";
import React from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { useGetFromStore } from "../hooks/zustandHooks";
import { useAuthUser, useStore, useToken } from "../store/globalStore";
import { Button } from "@mui/material";

type Props = {
	children: React.ReactNode;
	title?: string;
};

const Layout = ({ children, title }: Props) => {
	const token = useToken();
	const user = useAuthUser();
	const logout = useStore((state) => state.reset);
	function handleLogout() {
		logout();
	}
	return (
		<div className="min-w-screen flex min-h-screen w-full flex-col justify-between">
			<Head>
				<title>{title}</title>
			</Head>

			<header>
				<nav className="flex h-12 w-full items-center justify-between px-4 shadow-md">
					<Link legacyBehavior href="/">
						<a href="" className="text-lg font-bold ">
							Website Name
						</a>
					</Link>
					{token ? (
						<div className="font-bold text-blue-900">
							Welcome {user?.name}
						</div>
					) : null}
					<div className="flex items-center gap-4">
						<Link legacyBehavior href={"/cart"}>
							<a>Cart</a>
						</Link>

						{token ? (
							<Button variant="outlined" onClick={handleLogout}>
								Logout
							</Button>
						) : null}
					</div>
				</nav>
			</header>
			<main className="min-w-screen">{children}</main>
			<footer className="flex h-10 items-center justify-center bg-gray-100 shadow-inner">
				Made with love by Kshitij
			</footer>
		</div>
	);
};

export default Layout;
