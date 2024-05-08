import { Dispatch, SetStateAction, createContext, useContext } from 'react';

interface StoreContextType<T = any> {
	data: Record<string, T[]>;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	add: (key: string, items: T[]) => void;
	reset: (key: string) => void;
}

/**
 * Creates and initializes the store context with an undefined inital value
 */
export const StoreContext:React.Context<StoreContextType<any> | undefined> = createContext<StoreContextType<any> | undefined>(undefined);


/**
 * Custom hook to access store context
 * @template T Data type of context-managed items
 * @returns {StoreContextType<T>} store context object
 * @throws Throws if hook is used outside of a `<StoreProvider>` component
 */
export function useStore<T>(): StoreContextType<T> {
	const context = useContext<StoreContextType<T> | undefined>(StoreContext);

	if (context === undefined) {
		throw new Error('`useStore()` not inside `<StoreProvider>` wrapper.');
	}

	return context;
}
