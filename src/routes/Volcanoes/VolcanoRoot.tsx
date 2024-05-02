import { useState,useEffect } from 'react';
import { useStore } from '@/lib/index';
import { fetchFromApi } from '@/lib/index';
import VolcanoGrid from '@/components/grid/Grid';
import Accordion from '@/components/accordion/Accordion';

const VolcanoRoot: React.FC = (): React.ReactElement => {
    const { data, isLoading, setIsLoading, add } = useStore();
    const [activeCountry, setActiveCountry] = useState<string | undefined>(undefined);

    const catalogTitle: string = 'Global Catalog of Volcanoes';
    const catalogTag: string = 'Select a country to get started';

    useEffect(() => {
        const fetchCountries = async (): Promise<void> => {
            try {
                // if there is cached content, don't make a request to the API.
                if (data.countries !== undefined) {

                    return;
                } else {
                    const countries: string[] = await fetchFromApi('/countries');
                    console.log(countries);
                    add('countries', countries);
                }
            } catch (err) {
                throw new Error(`error during fetch: ${err}`);
            } finally {
                setIsLoading(false);
                // await sleep(500);       // delay for animation/loading feedback
                console.log('data loaded: ', data);
            }
        };
        if (!data.countries && !isLoading) {
            setIsLoading(true);
            fetchCountries();
        } else {
            console.log('data in cache: ', data);
        }
    }, [data]);

    return (
        <>
            {isLoading ?
                <div>loading...</div>
                : <div className='w-full'>
                    <Accordion title={catalogTitle} tagline={catalogTag} activeCountry={activeCountry} setActiveCountry={setActiveCountry} />
                    {/*<Grid />*/}
                </div>
            }

            {activeCountry && <VolcanoGrid country={activeCountry}  />}
        </>
    );
};
export default VolcanoRoot;
