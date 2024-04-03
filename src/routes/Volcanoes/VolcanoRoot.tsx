import { useEffect } from 'react';
import { useStore } from '../../lib/store/storeContext';
import { fetchFromApi } from '../../lib/store/fetch';
import { sleep } from '../../lib/utils';
import Accordion from '../../components/Accordion';

const VolcanoRoot: React.FC = (): React.ReactElement => {
	const { data, isLoading, setIsLoading, add } = useStore();

	const volcanoAccordionTitle: string = 'Global Catalog of Volcanoes';

	useEffect(() => {
		console.log('data @ preloader: ', data);

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
				await sleep(500);

				console.log('data post-load: ', data);
			}
		};
		if (!data.countries && !isLoading) {
            setIsLoading(true);
			fetchCountries();
		}
	}, []);

	return (
		<>
			{isLoading ?
				<div>loading...</div>
			:	<div className='w-full'>
					<Accordion title={volcanoAccordionTitle} />
				</div>
			}
		</>
	);
};
export default VolcanoRoot;
