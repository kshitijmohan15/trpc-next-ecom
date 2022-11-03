import Link from "next/link";
import React from "react";

type Props = {
	children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<div className="flex min-h-screen flex-col justify-between ">
			<header>
				<nav className="flex h-12 items-center justify-between px-4 shadow-md">
					<Link legacyBehavior href="/">
						<a href="" className="text-lg font-bold ">
							Website Name
						</a>
					</Link>
					<div>
						<Link legacyBehavior href={"/cart"}>
							<a>Cart</a>
						</Link>
						<Link legacyBehavior href={"/login"}>
							<a>Login</a>
						</Link>
					</div>
				</nav>
			</header>
			<main className="container my-auto mt-4 px-4">{children}</main>
			<footer className="flex h-10 items-center justify-center shadow-inner">Footer</footer>
		</div>
	);
};

export default Layout;
