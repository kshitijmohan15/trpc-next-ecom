import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Global {
	token: string;
	token2: string;
	updateToken: (newToken: string) => void;
	count: number;
}

export const useStore = create<Global>()(
	devtools(
		persist(
			(set) => ({
				token: "Kshitij1",
				updateToken: (newToken) => set((state) => ({ ...state, token: newToken })),
				count: 2200,
				token2: "oken",
			}),
			{ name: "global" }
		)
	)
);
