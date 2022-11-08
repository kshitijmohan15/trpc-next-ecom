import { Button } from "@mui/material";
import { type NextPage } from "next";
import Layout from "../components/Layout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { trpc } from "../utils/trpc";
import { useStore } from "../store/globalStore";
import { getFromStore } from "../hooks/zustandHooks";
import { signJwt } from "../utils/jwt";

const Products: NextPage = () => {
	const { data: products } = trpc.product.getAll.useQuery();

	const token = getFromStore(useStore, (state) => state.token);
	const updateToken = useStore((state) => state.updateToken);

	return (
		<Layout title="Products">
			<div className=" grid w-screen grid-cols-1 gap-6 bg-gray-100 py-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{products?.map((item, index) => {
					return (
						<div
							key={index}
							className="relative flex flex-col items-center justify-between gap-4 rounded-lg bg-white p-6"
						>
							<img
								alt={item.title}
								src={item.image}
								className="h-[200px] w-[200px] object-contain"
							/>
							<div className="flex w-full justify-between gap-8">
								<div className="flex flex-col items-center">
									<div className="md:text-md text-lg font-medium text-gray-600">
										{item.title}
									</div>
									<div className="md:text-md flex w-full justify-start text-lg font-semibold text-black">
										${item.price}
									</div>
								</div>
								<div>
									<FavoriteIcon sx={{ color: "red" }} />
								</div>
							</div>

							<div className="flex w-full justify-start">
								<Button variant="contained" className="md:text-md text-lg">
									Add to cart
								</Button>
							</div>
						</div>
					);
				})}
			</div>
		</Layout>
	);
};

export default Products;
