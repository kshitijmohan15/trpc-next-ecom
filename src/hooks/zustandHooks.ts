import { useState, useEffect } from "react";

export function useStoreInComponent<T, F>(
	store: (callback: (state: T) => unknown) => unknown,
	storeCallback: (state: T) => F
) {
	const got = store(storeCallback) as F;
	const [state, setState] = useState<F>();
	useEffect(() => {
		setState(got);
	}, [got]);

	return state as F;
}
