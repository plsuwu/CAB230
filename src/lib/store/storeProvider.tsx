import { useState, useCallback } from 'react';
import { StoreContext } from './storeContext';


interface StoreProviderProps {
	children: React.ReactNode;
}

interface StoreData {
	[key: string]: any[];
}

/**
 * Wraps the application with a context provider for storing data accessible across components
 *
 * @param {StoreProviderProps} props - component props to provide context
 * @returns {JSX.Element} the provider component with shared state/functions
 */
export function StoreProvider({ children }: StoreProviderProps): JSX.Element {
	const [data, setData] = useState<StoreData>({});
	const [isLoading, setIsLoading] = useState(false); // this loading state is not heavily utilized.


    /**
     * Adds data referenced via a key in the store
     * @template T
     * @param {string} key - indicates a specific record and its data
     * @param {T[]} items - an array of items to be added into the store under a reference key
     * */
	const add = useCallback(<T,>(key: string, items: T[]) => {
		setIsLoading(true);
		setData((prevData) => {

			// data pushed to this record must be supplied as an array
			const updatedData = Array.isArray(prevData[key]) ? [...prevData[key], ...items] : [...items];

			return {
				...prevData,
				[key]: updatedData,
			};
		});
		setIsLoading(false);
	}, []);

    /**
     * Empties the stored data cache, resetting it to an empty object
     * */
	const reset = useCallback(() => {
		setIsLoading(true);
		setData({});
		setIsLoading(false);
	}, []);

	return (
		<StoreContext.Provider value={{ data, isLoading, setIsLoading, add, reset }}>
			{children}
		</StoreContext.Provider>
	);
}
