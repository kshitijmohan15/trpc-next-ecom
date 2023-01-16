import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
	label: string;
	name: string;
	type?: string;
};

const FormInput: React.FC<FormInputProps> = ({
	label,
	name,
	type = "text",
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	return (
		<div className=" w-full">
			<label htmlFor={name} className="text-ct-blue-600 mb-3 block">
				{label}
			</label>
			<input
				type={type}
				placeholder=" "
				className="block h-12 w-full appearance-none rounded-md border-2 border-gray-200 px-2 focus:outline-none"
				{...register(name)}
			/>

			{errors[name] && (
				<span className="block pt-1 text-xs text-red-500">
					{errors[name]?.message as unknown as string}
				</span>
			)}
		</div>
	);
};

export default FormInput;
