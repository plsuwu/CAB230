import { Dispatch, SetStateAction, createContext, useContext } from 'react';
// import type { Country, Volcano } from '../types';

// properly type when this works
export interface StoreContextType {
	data: Record<string, any[]>;
	isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
	error: any;
    add: <T>(key: string, items: T) => void;
    remove: <T>(key: string, identifier: (item: T) => boolean) => void;
    reset: (key: string) => void;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function useStore() {
	const context = useContext(StoreContext);

	if (context === undefined) {
		throw new Error('`useStore()` hook cannot be used outside of a parent `<StoreProvider>` wrapper.');
	}

	return context;
}
