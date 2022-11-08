import Link from "next/link";
import React from "react";
import Head from "next/head";

type Props = {
	children: React.ReactNode;
	title?: string;
};

const Layout = ({ children, title }: Props) => {
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
					<div className="flex gap-2">
						<Link legacyBehavior href={"/cart"}>
							<a>Cart</a>
						</Link>
						<Link legacyBehavior href={"/login"}>
							<a>Login</a>
						</Link>
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
