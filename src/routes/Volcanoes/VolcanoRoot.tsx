// import { volcanoes, countries } from '../../lib/exampleData';

import { useEffect } from 'react';
import { useStore } from '../../lib/cache/storeContext';
import { fetchFromApi } from '../../lib/cache/fetch';
import Accordion from '../../components/Accordion';

const VolcanoRoot: React.FC = (): React.ReactElement => {
	const { data, isLoading, setIsLoading, add, reset /*, remove,  */ } = useStore();

	const volcanoAccordionTitle: string = 'Global Catalog of Volcanoes';

	useEffect(() => {
		console.log('pre-load: ', data);

		const fetchCountries = async (): Promise<void> => {
			try {
				const countries = await fetchFromApi('countries');
                if (data.countries) {
                    return;
                } else {
				    add('countries', countries);
                }
			} catch (error) {
				console.error('failed country fetch: ', error);
			} finally {
				setIsLoading(false);
				console.log('post-load: ', data);
			}
		};
        if (!data.countries && !isLoading) {
		    fetchCountries();
        } else {
            reset('countries');
            fetchCountries();
        }
	}, []);

	return (
		<>
			{isLoading ?
				<div>loading...</div>
			:	<div>
					<Accordion title={volcanoAccordionTitle} />
				</div>
			}
		</>
	);
};
export default VolcanoRoot;
