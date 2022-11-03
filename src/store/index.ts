import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Global {
	token: string;
	token2: string;
	count: number;
	incrementCount: () => void;
	updateToken: (newToken: string) => void;
}

export const useStore = create<Global>()(
	devtools(
		persist(
			(set) => ({
				token: "Kshitij1",
				token2: "Second Token",
				count: 0,
				incrementCount: () => set((state) => ({ count: state.count + 1 })),
				updateToken: (newToken) => set((state) => ({ token: newToken })),
			}),
			{ name: "global" }
		)
	)
);
