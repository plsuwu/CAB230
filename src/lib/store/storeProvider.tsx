import { useState, useCallback } from 'react';
import { StoreContext } from './storeContext';

interface StoreProviderProps {
    children: React.ReactNode;
}

interface StoreData {
    [key: string]: any[];
}

export function StoreProvider({ children }: StoreProviderProps) {
    const [data, setData] = useState<StoreData>({});
    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<Error | null>(null);

    const add = useCallback(<T,>(key: string, items: T[]) => {
        setIsLoading(true);
        setData((prevData) => {
            const updatedData = Array.isArray(prevData[key]) ? [...prevData[key], ...items] : [...items];
            return {
                ...prevData,
                [key]: updatedData,
            };

        });
        setIsLoading(false);
    }, []);

    // these aren't really going to be used
    const remove = useCallback(<T,>(key: string, identifier: (item: T) => boolean) => {
        setIsLoading(true);
        setData((prevData) => ({
            ...prevData,
            [key]: prevData[key] ? prevData[key].filter((item) => !identifier(item)) : [],
        }));
        setIsLoading(false);
    }, []);

    const reset = useCallback((key: string) => {
        setIsLoading(true);
        setData((prevData) => ({
            ...prevData,
            [key]: [],
        }));
        setIsLoading(false);
    }, []);

    return (
        <StoreContext.Provider value={{ data, isLoading, setIsLoading, add, remove, reset }}>
            {children}
        </StoreContext.Provider>
    );
}
