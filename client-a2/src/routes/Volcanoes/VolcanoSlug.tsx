import { fetchFromApi, useStore } from '@/lib';
import { VolcanoMap } from '@/components/map';
import { Volcano } from '@/lib/types';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const VolcanoSlug: React.FC = (): React.ReactElement => {
	const { data, add, isLoading, setIsLoading } = useStore();
	const { country, id } = useParams();

	useEffect(() => {

        /**
         * Fetch array of country names from the API
         * */
		const refetchCountry = async (): Promise<void> => {
			setIsLoading(true);
			try {
				// if there is cached content, don't make a request to the API.
				if (!isLoading && country && data[country]) {
					console.log(`volcano data for ${country} should be cached =>`, data[country]);
					return;
				} else if (country && id && !data[country]) {
					console.log(`volcano data for ${country} uncached`);
					const volcanoes: Volcano[] = await fetchFromApi(`/volcanoes?country=${country}`);
					add(country, volcanoes);
				}
			} catch (err) {
				console.error('error during fetch => ', err);
			} finally {
				setIsLoading(false);
			}
		};
		if (country && !data[country] && !isLoading) {
			console.info('did not find country data in cache!');
			refetchCountry();
		}
	}, [country]);

	return (
		<>
			<div>{country && id && <VolcanoMap country={country} id={Number(id)} />}</div>
		</>
	);
};

export default VolcanoSlug;
