import React from "react";
import { trpc } from "../utils/trpc";

const Home = () => {
	const { data } = trpc.product.getEnv.useQuery();
	return <div>{data}</div>;
};

export default Home;
