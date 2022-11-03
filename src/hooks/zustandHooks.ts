import { useState, useEffect } from "react";

export function useStoreInComponent<T>(store: (callback: T) => unknown, storeCallback: T) {
	const got = store(storeCallback);
	const [state, setState] = useState<any>();
	useEffect(() => {
		setState(got);
	}, [got]);

	return state;
}
