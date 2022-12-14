import React from "react";
import { trpc } from "../utils/trpc";

const Test = () => {
	const { data, mutate } = trpc.test.post.useMutation();
	async function handleMutation() {
		mutate();
	}
	return (
		<div>
			<button onClick={handleMutation}>Send Request</button>
		</div>
	);
};

export default Test;
