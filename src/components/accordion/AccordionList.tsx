import { Disclosure, Transition } from '@headlessui/react';
import { useState } from 'react';
import { useStore } from '../../lib/store/storeContext';
import { classNames, sleep } from '../../lib/utils/utils';
import { fetchFromApi } from '../../lib/store/fetch';

import AccordionRow from './AccordionRow';
import AccordionPanel from './AccordionPanel';

interface AccordionListProps {
    pages: string[][];
    currentPage: number;
}

const AccordionList: React.FC<AccordionListProps> = ({ pages, currentPage }): React.ReactElement => {
    const { data, isLoading, add } = useStore();
    const [activeCountry, setActiveCountry] = useState<string>('');
    const [loadingVolcanoes, setLoadingVolcanoes] = useState(false);

    const expandCountry = async (country: string): Promise<void> => {
        if (country !== activeCountry) {
            setActiveCountry('');
            setActiveCountry(country);
            await fetchVolcanoes(country);
        } else {
            setActiveCountry('');
        }
    };

    async function fetchVolcanoes(country: string): Promise<void> {
        while (isLoading) {
            await sleep(300);
        }

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
            await sleep(300);
        }
    }

    return (
        <ul className='flex-0 flex flex-col content-normal justify-center space-y-px transition-all duration-500'>
            {pages[currentPage].map((country: string, index: number) => (
                <Disclosure
                    as='li'
                    key={index}
                    className={classNames(
                        index % 2 === currentPage % 2 ? 'bg-vol-mantle/25' : 'bg-vol-surface/50',
                        'flex w-full flex-col items-center justify-around rounded-md p-1.5 transition-all duration-200 ease-in-out'
                    )}
                >
                    {({ open }) =>
                        country === 'No results :(' || country === ' ' ?
                            <>
                                <div className='transition-all duration-500'>
                                    <div className='ml-2.5 flex w-0 flex-1 items-center justify-center rounded-lg font-semibold'>
                                        {country}
                                    </div>

                                    <div className='flex-0 mr-4 flex flex-row items-center justify-center rounded-md px-2 py-1'>
                                        <div className='h-[24px]'> </div>
                                    </div>
                                </div>
                            </>
                            : <>
                                <AccordionRow
                                    country={country}
                                    activeCountry={activeCountry ? activeCountry : ''}
                                    open={open}
                                    expandCountry={expandCountry}
                                />
                                {activeCountry && (
                                    <Transition
                                        show={!loadingVolcanoes && country === activeCountry}
                                        enter='transition duration-0 delay-150 ease-out'
                                        enterFrom='transform -translate-y-6 opacity-0'
                                        enterTo='transform translate-y-0 opacity-100'
                                        leave='duration-0'
                                        leaveFrom='transform translate-y-0 opacity-100'
                                        leaveTo='transform -translate-y-6 opacity-0'
                                    >
                                        <AccordionPanel
                                            loadingVolcanoes={loadingVolcanoes}
                                            activeCountry={activeCountry}
                                            country={country}
                                        />
                                    </Transition>
                                )}
                            </>
                    }
                </Disclosure>
            ))}
        </ul>
    );
};
export default AccordionList;
