import { createContext, useContext } from 'react';
import type { Country, Volcano } from '../types';

// properly type when this works
interface StoreContextType {
	data: {
		countries?: Country[];
		volcanoes?: Volcano[];
	};

	isLoading: boolean;
	error: any;
    addDataField?: (fieldKey: keyof StoreContextType['data'], item: string | Volcano) => void;
    removeDataField?: (fieldKey: keyof StoreContextType['data'], identifier: string | number) => void;

    // /* alternatively, if above is too difficult to implement, fall back to something like: */
    // addCountry?: (country: string) => void;
    // addVolcano?: (volcano: Volcano) => void;
    // removeCountry?: (country: string) => void;
    // removeVolcano?: (volcanoId: number) => void;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function useStore() {
	const context = useContext(StoreContext);
	if (context === undefined) {
		throw new Error('`useStore()` must be used as a child of a `<StoreProvider>` wrapper');
	}

	return context;
}
