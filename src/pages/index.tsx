import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
	const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

	return <Layout>{hello.data?.greeting}</Layout>;
};

export default Home;
