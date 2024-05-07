import { SpiralSpinner } from 'react-spinners-kit';
import { useState, useEffect } from 'react';
import { useStore, fetchFromApi, sleep } from '@/lib';
import VolcanoGrid from '@/components/grid/Grid';
import Accordion from '@/components/accordion/Accordion';
import { Outlet } from 'react-router';

const VolcanoRoot: React.FC = (): React.ReactElement => {
	const { data, isLoading, setIsLoading, add } = useStore();
	const [activeCountry, setActiveCountry] = useState<string | undefined>(undefined);
	const catalogTitle: string = 'Global Catalog of Volcanoes';
	const catalogTag: string = 'Select a country to see a list of volcanoes for that region';

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
				<div className='mt-48 flex h-full w-full flex-col items-center justify-center'>
					<SpiralSpinner size={100} frontColor='#f1ae6a' backColor='#c62810' loading={true} />
				</div>
			:	<div className='w-full'>
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
