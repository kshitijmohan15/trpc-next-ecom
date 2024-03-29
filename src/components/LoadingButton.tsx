import React from "react";
import Spinner from "./Spinner";

type LoadingButtonProps = {
	loading: boolean;
	btnColor?: string;
	textColor?: string;
	children: React.ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
	textColor = "text-white",
	btnColor = "bg-ct-yellow-600",
	children,
	loading = false,
}) => {
	return (
		<button
			type="submit"
			className={`w-full py-3 font-semibold ${btnColor} flex justify-center rounded-lg border-none outline-none ${
				loading ? "bg-[#ccc]" : ""
			}`}
		>
			{loading ? (
				<div className="flex items-center gap-3">
					<Spinner />
					<span className="inline-block text-slate-500">
						Loading...
					</span>
				</div>
			) : (
				<span className={`${textColor}`}>{children}</span>
			)}
		</button>
	);
};
