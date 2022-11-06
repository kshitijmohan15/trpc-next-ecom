import { type NextPage } from "next";
import Layout from "../components/Layout";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
	const { data: products } = trpc.product.getAll.useQuery();
	const { mutate: createOne, data: createItem } = trpc.product.createOne.useMutation();

	return (
		<>
			<Layout>
				<div className=" grid w-screen grid-cols-3 gap-6">
					{products?.map((item, index) => {
						return (
							<div key={index} className="relative flex flex-col items-center gap-4">
								<img
									alt={item.title}
									src={item.image}
									className="h-[200px] w-[200px] object-contain"
								/>
								<div>{item.title}</div>
								{/* <div className="h-1/2 w-full rounded-t-lg bg-slate-500"></div> */}
							</div>
						);
					})}
				</div>
			</Layout>
		</>
	);
};

export default Home;
