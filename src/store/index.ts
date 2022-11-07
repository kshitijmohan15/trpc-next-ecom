import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IUser } from "../types/types";

interface Global {
	token: string | null;
	updateToken: (newToken: string) => void;
	authUser: IUser | null;
	setAuthUser: (user: IUser) => void;
}

export const useStore = create<Global>()(
	devtools(
		persist(
			(set) => ({
				token: null,
				updateToken: (newToken) => set(() => ({ token: newToken })),
				authUser: null,
				setAuthUser: (user) => set(() => ({ authUser: user })),
			}),
			{ name: "global" }
		)
	)
);
