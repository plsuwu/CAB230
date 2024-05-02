// import { Disclosure } from '@headlessui/react';
import { Volcano } from '@/lib/types';
import { useStore, fetchFromApi} from '@/lib/index';
import { useEffect, useState } from 'react';

interface AccordionRowProps {
	activeCountry: string;
}

const AccordionPanel: React.FC<AccordionRowProps> = ({ activeCountry }): React.ReactElement => {
	const { data, add } = useStore();
	const [loadingVolcanoes, setLoadingVolcanoes] = useState<boolean>(false);

	useEffect(() => {
		async function fetchVolcanoes(country: string): Promise<void> {
			setLoadingVolcanoes(true);
			try {
				if (!data[country]) {
					const volcanoes = await fetchFromApi(`/volcanoes?country=${country}`);
					add(country, volcanoes);
					setLoadingVolcanoes(false);
				} else {
					setLoadingVolcanoes(false);
					return;
				}
			} catch (error) {
				console.error(`failed volcano fetch for country ${country}: `, error);
			} finally {
				setLoadingVolcanoes(false);
				console.log(`fetch result for country '${country}':`, data[country]);
			}
		}

        if (activeCountry) {
            fetchVolcanoes(activeCountry);
        }
	}, [activeCountry]);

	return (
		<div className='min-h-200 w-full pb-4 transition-all duration-300'>
			{loadingVolcanoes && <ul className='min-h-200 transition-all duration-300'>loading...</ul>}

			{!loadingVolcanoes && data[activeCountry] && (
				<ul className='px-6'>
					{data[activeCountry].map((volcano: Volcano) => (
						<li
							key={volcano.id}
							className='flex w-full flex-row content-center justify-between pt-2'
						>
							{volcano.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default AccordionPanel;
