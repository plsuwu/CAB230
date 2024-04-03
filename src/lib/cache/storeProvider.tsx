import { useState } from 'react';
import { StoreContext } from './storeContext';

interface StoreProviderProps {
	children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
	const [data, setData] = useState<Record<string, any[]>>({});
	const [isLoading, setIsLoading] = useState(true);
	const [error ] = useState<any>(null);

	const add = <T,>(key: string, item: T) => {
		if (!data.hasOwnProperty(key)) {
			setData((prevData) => ({
				...prevData,
				[key]: [...(prevData[key] || []), item],
			}));
		}
	};

	const remove = <T,>(key: string, identifier: (item: T) => boolean) => {
		setData((prevData) => ({
			...prevData,
			[key]: prevData[key].filter((item) => !identifier(item)),
		}));
	};

	// resets field content to empty array - change to completely erasing the record when time permits.
	const reset = (key: string) => {
		setData((prevData) => ({
			...prevData,
			[key]: [], 
		}));
	};

	return (
		<StoreContext.Provider value={{ data, isLoading, setIsLoading, error, add, remove, reset }}>
			{children}
		</StoreContext.Provider>
	);
}
