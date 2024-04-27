import { Dispatch, SetStateAction, createContext, useContext } from 'react';

// type def -- move to lib/types.ts
export interface StoreContextType<T = any> {
	data: Record<string, T[]>;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	// error: Error | null;
	add: (key: string, item: T) => void;
	remove: (key: string, identifier: (item: T) => boolean) => void;
	reset: (key: string) => void;
}

// init context with `undefined`
export const StoreContext = createContext<StoreContextType<any> | undefined>(undefined);

// global store hook
export function useStore<T = any>() {
	// useContext should match context type
	const context = useContext<StoreContextType<T> | undefined>(StoreContext);

	if (context === undefined) {
		throw new Error('`useStore()` not inside `<StoreProvider>` wrapper.');
	}

	return context;
}
