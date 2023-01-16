import { string, object } from "zod";

export const createProductSchema = object({
	category: string({ required_error: "Category is required" }),
	description: string({ required_error: "Description is required" }).email(
		"Invalid email"
	),
	price: string({ required_error: "Price is required" }),
	image: string({ required_error: "Image is required" }),
	rating: string({ required_error: "Rating is necessary" }),
	title: string({ required_error: "Title is required" }),
});
