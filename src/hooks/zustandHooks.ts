import { useState, useEffect } from "react";

export function useGetFromStore<T, F>(
	store: (callback: (state: T) => unknown) => unknown,
	storeCallback: (state: T) => F
): F {
	const got = store(storeCallback) as F;
	const [state, setState] = useState<F>();
	useEffect(() => {
		setState(got);
	}, [got]);

	return state as F;
}
