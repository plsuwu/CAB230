import { useState, useEffect } from 'react';
// import type { VolcanoData } from '../../lib/types';
import Accordion from '../../components/Accordion';
import { getCountriesFromApi } from '../../lib/utils';
import { volcanoes } from '../../lib/exampleData';

const VolcanoRoot: React.FC = (): React.ReactElement => {
    const [loading, setLoading] = useState<boolean>(true);
	const sortOptions: string[] = ['Country', 'Name']; // could do other sort options e.g 'activity', 'altitude', 'most populated', ...
	const volcanoAccordionTitle: string = 'Global Catalog of Volcanoes';

	const [countries, setCountries] = useState<null | string[]>(null);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	useEffect(() => {
		async function fetchCountries() {
			let countries = await getCountriesFromApi();
			setCountries(countries);

			console.log(countries);
            await sleep(5000);      // simulated network delay
            setLoading(false);
		}

		fetchCountries();
	}, []);

	return (
		<>
			<div>
				<Accordion
					title={volcanoAccordionTitle}
                    loading={loading}
					countries={countries}
					volcanoes={volcanoes}
					sortOptions={sortOptions}
				/>
			</div>
		</>
	);
};
export default VolcanoRoot;
