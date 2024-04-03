import { useState, useCallback } from 'react';
import { StoreContext } from './storeContext';

interface StoreProviderProps {
	children: React.ReactNode;
}

// will we actually store state for anything other thcountry/volcano data?
// is storing user data here fine considering this (i assume) runs clientside?
interface StoreData {
	[key: string]: any[];
}

/**
 * provides context for globally accessible state management.
 * this component wraps its children and provides them with access to a mutable global store and mutation functions.
 *
 * @component
 * @param {StoreProviderProps} props - component props.
 * @param {React.ReactNode} props.children - child components to be rendered.
 */
export function StoreProvider({ children }: StoreProviderProps) {
	const [data, setData] = useState<StoreData>({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	/**
	 * adds a new item to specified key in store.
	 *
	 * @param {string} key - key in store to which item will be added.
	 * @param {T} item - item to be added.
	 * @template T - type of item.
	 */
	const add = useCallback(<T,>(key: string, item: T) => {
		setIsLoading(true);
		setData((prevData) => ({
			...prevData,
			[key]: [...(prevData[key] || []), item],
		}));
		setIsLoading(false);
	}, []);

	/**
	 * removes item identified by `identifier` function from specified key in store.
	 *
	 * @param {string} key - key in store from which item will be removed.
	 * @param {(item: T) => boolean} identifier - a function that determines which item to remove.
	 * @template T - type of items in array.
	 */
	const remove = useCallback(<T,>(key: string, identifier: (item: T) => boolean) => {
		setIsLoading(true);
		setData((prevData) => ({
			...prevData,
			[key]: prevData[key] ? prevData[key].filter((item) => !identifier(item)) : [],
		}));
		setIsLoading(false);
	}, []);

	/**
	 * resets value at specified key in store to empty array.
	 *
	 * @param {string} key - key in store to reset.
	 */
	const reset = useCallback((key: string) => {
		setIsLoading(true);
		setData((prevData) => ({
			...prevData,
			[key]: [],
		}));
		setIsLoading(false);
	}, []);

	return (
		<StoreContext.Provider value={{ data, isLoading, setIsLoading, error, add, remove, reset }}>
			{children}
		</StoreContext.Provider>
	);
}
