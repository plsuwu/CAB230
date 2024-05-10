import { SpiralSpinner } from 'react-spinners-kit';
import { useState, useEffect } from 'react';
import { useStore, fetchFromApi } from '@/lib';
import { VolcanoGrid, Accordion } from '@/components/accordion';
import { useParams } from 'react-router';

const VolcanoRoot: React.FC = (): React.ReactElement => {
	const { data, isLoading, setIsLoading, add } = useStore();
	const [activeCountry, setActiveCountry] = useState<string | undefined>(undefined);
    const { country } = useParams();
	const catalogTitle: string = 'Global Catalog of Volcanoes';
	const catalogTag: string = 'Select a country to see a list of volcanoes for that region';

	useEffect(() => {
        console.log(country);
		const fetchCountries = async (): Promise<void> => {
            setIsLoading(true)
			try {
				// if there is cached content, don't make a request to the API.
				if (data['countries']) {
					return;
				} else if (!data['countries'] && !isLoading) {
					const countries: string[] = await fetchFromApi('/countries');
					add('countries', countries);
				}
			} catch (err) {
				console.error(`error during fetch: ${err}`);
			} finally {
                setIsLoading(false);
            }
		};
		if (!data['countries']) {
			fetchCountries();
		}
        if (country) {
            setActiveCountry(country);
        } else {
            setActiveCountry(undefined);
        };
	}, [data, country]);

	return (
		<>
			{isLoading ?
				<div className='flex h-full w-full flex-col items-center justify-center'>
					<SpiralSpinner size={100} frontColor='#f1ae6a' backColor='#c62810' loading={true} />
				</div>
			:	<div className='w-full mt-12'>
					<Accordion
						title={catalogTitle}
						tagline={catalogTag}
						activeCountry={activeCountry}
						setActiveCountry={setActiveCountry}
					/>
				</div>
			}
			{activeCountry && <VolcanoGrid country={activeCountry} />}
		</>
	);
};

export default VolcanoRoot;
