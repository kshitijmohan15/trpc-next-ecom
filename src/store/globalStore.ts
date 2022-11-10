import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IUser } from "../types/types";

interface State {
	token: string | null;
	authUser: IUser | null;
}
interface Actions {
	updateToken: (newToken: string) => void;
	setAuthUser: (user: IUser) => void;
	reset: () => void;
}

const initialState: State = {
	token: null,
	authUser: null,
};

export const useStore = create<State & Actions>()(
	devtools(
		persist(
			(set) => ({
				...initialState,
				updateToken: (newToken) => set(() => ({ token: newToken })),
				setAuthUser: (user) => set(() => ({ authUser: user })),
				reset: () => {
					set(initialState);
				},
			}),
			{ name: "global" }
		)
	)
);
