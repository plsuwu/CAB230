import { Dispatch, SetStateAction, createContext, useContext } from 'react';

/**
 * type definition for context of store used in React application.
 * this context provides access to mutable global state and mutation functions.
 *
 * @template T - the base type for items in data store.
 */
export interface StoreContextType<T = any> {
	data: Record<string, T[]>;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	error: Error | null;
	add: (key: string, item: T) => void;
	remove: (key: string, identifier: (item: T) => boolean) => void;
	reset: (key: string) => void;
}

// init context with `undefined`
export const StoreContext = createContext<StoreContextType<any> | undefined>(undefined);

/**
 * hook to access store context.
 * ensures that context is used within a component tree that has a `StoreProvider`.
 *
 * @template T - The type of item in store.
 * @throws Error if `useStore` used outside of `StoreProvider`.
 * @returns the store context with access to mutable global state.
 */
export function useStore<T = any>() {
	// useContext should match context type
	const context = useContext<StoreContextType<T> | undefined>(StoreContext);

	if (context === undefined) {
		throw new Error('`useStore()` hook must be used within a `<StoreProvider>`.');
	}

	return context;
}
