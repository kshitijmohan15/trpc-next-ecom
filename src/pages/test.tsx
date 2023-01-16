import axios from "axios";
import React, { useState } from "react";
import { hell } from "../utils/data";
import { ScatterPlot } from "../utils/reshapeDataApi";
import { trpc } from "../utils/trpc";
import { cva, VariantProps } from "class-variance-authority";
import Head from "next/head";
import clsx from "clsx";
import { cn } from "../utils/tailwlind-helper";
import { twMerge } from "tailwind-merge";

const Test = () => {
	const [state, setState] = useState<boolean>(false);
	return (
		<>
			<Head>
				<title>Test</title>
			</Head>

			<div className="grid w-full grid-cols-3">
				<div className="flex items-center justify-center py-4">
					<Button intent="cool">Cool</Button>
				</div>
			</div>
		</>
	);
};

export default Test;

const buttonStyles = cva("rounded-md py-1 px-2", {
	variants: {
		intent: {
			danger: "bg-red-300 text-red-800",
			success: "bg-green-300 text-green-800",
			cool: "bg-blue-300 text-blue-800",
		},
	},
});
interface ButtonProps extends VariantProps<typeof buttonStyles> {}
const Button = ({
	intent,
	as,
	className,
	...props
}: ButtonProps & {
	children: React.ReactNode;
	as?: React.ElementType;
	className?: string;
}) => {
	const Component = as || "button";
	return (
		<Component
			className={twMerge(buttonStyles({ intent: intent }), className)}
			{...props}
		></Component>
	);
};
