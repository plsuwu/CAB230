import { Disclosure } from '@headlessui/react';
import { Volcano } from '../../lib/types';
import { useStore } from '../../lib/store/storeContext';

interface AccordionRowProps {
    loadingVolcanoes: boolean;
    country: string;
    activeCountry: string;
}

const AccordionPanel: React.FC<AccordionRowProps> = ({
    loadingVolcanoes,
    country,
}): React.ReactElement => {
    const { data } = useStore();

    return (
        <Disclosure.Panel as='div' className='min-h-200 w-full pb-4 transition-all duration-300'>
            {loadingVolcanoes && <ul className='min-h-200 transition-all duration-300'>loading...</ul>}

            {!loadingVolcanoes && data[country] && (
                <ul className='px-6'>
                    {data[country][0].map((volcano: Volcano) => (
                        <li
                            key={volcano.id}
                            className='flex w-full flex-row content-center justify-between pt-2'
                        >
                            {volcano.name}
                        </li>
                    ))}
                </ul>
            )}
        </Disclosure.Panel>
    );
};

export default AccordionPanel;
