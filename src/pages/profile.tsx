import React from "react";
import Layout from "../components/Layout";
import { useGetFromStore } from "../hooks/zustandHooks";
import { useStore } from "../store/globalStore";

const Profile = () => {
	const user = useStore((state) => state.authUser);
	// const user = useGetFromStore(useStore, (state) => state.authUser);
	return (
		<Layout title="Profile">
			<div className="min-w-screen my-4 flex min-h-screen flex-col items-start px-10 text-lg">
				<div className="flex justify-start">Name: {user?.name}</div>
				<div className="flex justify-start">Email: {user?.email}</div>
				<div className="flex justify-start">Role: {user?.role}</div>
			</div>
		</Layout>
	);
};

export default Profile;
