import { useState, useEffect } from 'react';
import { StoreContext, useStore } from './storeContext';
import { fetchFromApi } from './fetch';
import { Country, Volcano } from '../types';

interface StoreProviderProps {
	children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
	const [data, setData] = useState<any>({
		countries: [],
		volcanoes: [],
	});

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>(null);

    /* `React.ComponentState` (= <any>) not seem like the right type for country & volcano?? */
    const addCountry = (country: Country) => {
        setData((prevData: React.ComponentState) => ({
            ...prevData,
            countries: [...prevData.countries, country]
        }));
    };

    const addVolcano = (volcano: Volcano) => {
        setData((prevData: React.ComponentState) => ({
            ...prevData,
            volcanoes: [...prevData.volcanoes, volcano]
        }));
    };

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			try {
				const response = await fetchFromApi('countries'); // tbi
				setData(response);

			} catch (error) {
				setError(error);
			} finally {

                // log resulting data and/or errors
                console.log(data);
                if (error) {
                    console.error(error);
                }

				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
        <StoreContext.Provider value={{ data, setData, isLoading, error, addCountry, addVolcano }}>
            {children}
        </StoreContext.Provider>
    );
}
