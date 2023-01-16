import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useGetFromStore } from "../hooks/zustandHooks";
import { IUser } from "../types/types";

interface State {
	token: string | null;
	authUser: IUser | null;
}
interface Actions {
	actions: {
		updateToken: (newToken: string) => void;
		setAuthUser: (user: IUser) => void;
		reset: () => void;
	};
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
				actions: {
					updateToken: (newToken) => set({ token: newToken }),
					setAuthUser: (user) => set({ authUser: user }),
					reset: () => set(initialState),
				},
				updateToken: (newToken) => set({ token: newToken }),
				setAuthUser: (user) => set({ authUser: user }),
				reset: () => set(initialState),
			}),
			{ name: "global" }
		)
	)
);

export const useToken = () => useGetFromStore(useStore, (state) => state.token);
export const useAuthUser = () =>
	useGetFromStore(useStore, (state) => state.authUser);

// export const useActions = () => useStore((state) => state.actions);
