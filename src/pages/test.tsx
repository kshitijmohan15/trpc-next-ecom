import React, { useEffect, useState } from "react";
import { useStoreInComponent } from "../hooks/zustandHooks";
import { useStore } from "../store";

type Props = {};

const Test = (props: Props) => {
	// const zToken = useStore((state) => [state.count, state.token]);
	// const zToken = useStoreInComponent(useStore, (state: any) => state.);
	const ztoken = useStoreInComponent(useStore, (state) => [
		state.count,
		state.token,
		state.token2,
	]);
	return (
		<>
			<div className="flex flex-col gap-2">
				{ztoken?.length === 1 ? ztoken : ztoken?.map((item: any) => <div>{item}</div>)}
				{/* <div className="text-black">{ztoken}</div> */}
			</div>
		</>
	);
};

export default Test;
