import axios from "axios";
import { useState } from "react";

import React from "react";

type Props = { data: any; x: string; y: string };

export const ScatterPlot = ({ data, x, y }: Props) => {
	const [state, setState] = useState<string>();
	async function getChart() {
		const result = await axios
			.post(`http://localhost:8000/js?x=${x}&y=${y}`, data)
			.then((res) => res.data);
		setState(result);
	}
	return (
		<div>
			<button onClick={getChart}>Get New</button>
			{state ? (
				<div className="max-w-sm">
					<img src={`data:image/png;base64,${state}`} />
				</div>
			) : null}
		</div>
	);
};
