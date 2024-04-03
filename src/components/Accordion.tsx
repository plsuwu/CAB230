// import { Volcano } from '../lib/types';
import { useState, useEffect } from 'react';
import { useStore } from '../lib/cache/storeContext';
import { classNames } from '../lib/utils';
import { RiArrowUpLine, RiArrowRightLine } from 'react-icons/ri';

interface AccordionProps {
    title: string;
    sortOptions: string[];
}

const Accordion: React.FC<AccordionProps> = ({ title, sortOptions }): React.ReactElement => {
    const { data, isLoading, error, addCountry, addVolcano } = useStore();

    const orderOptions = ['d', 'a'];
    const [order, setOrder] = useState(orderOptions[0]);

    let volcanoes = data.volcanoes;
    let countries = data.countries;

    // fix ordering
    const handleSetOrdering = (orderBy: string): void => {
        console.log('data in store: ', data.countries, data.volcanoes);
        console.log('order by: ', orderBy, countries, sortOptions); // currently here to make the linter shuddup on orderBy/countries/sortOptions vars
        order === orderOptions[0] ? setOrder(orderOptions[1]) : setOrder(orderOptions[0]);
    };

    useEffect(() => {
        async function updateStore() {

        }

        if (!countries && !isLoading) {
            updateStore();
        }
    }, []);

    return (
        <>
            <div className='mx-12 my-10 mt-24 flex flex-col'>
                <div className='mb-10 w-[26rem] self-center'>
                    <div className='text-3xl font-bold'>{title}</div>
                </div>

                <div className='mt-8 flow-root w-[126rem] max-w-[65%] self-center'>
                    <div className='overflow-x-auto'>
                        <div className='inline-block min-w-full px-8 py-2 align-middle'>
                            <div className='overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5'>
                                <table className='min-w-full divide-y divide-vol-orange'>
                                    <thead className='bg-vol-mantle'>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-vol-champ'
                                            >
                                                <button onClick={() => handleSetOrdering('name')}>
                                                    <div className='flex items-center space-x-2'>
                                                        <RiArrowUpLine
                                                            className={classNames(
                                                                order === orderOptions[0] ? '' : 'rotate-180',
                                                                'transition-colors duration-300 ease-out hover:text-vol-peach'
                                                            )}
                                                        />
                                                        <div>Country</div>
                                                    </div>
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>
                                    {isLoading && !countries && (
                                        <tbody className='divide-y divide-vol-mantle bg-vol-crust'>
                                            <tr className='table-skeleton h-9'></tr>

                                            <tr className='table-skeleton h-9'></tr>

                                            <tr className='table-skeleton h-9'></tr>

                                            <tr className='table-skeleton h-9'></tr>
                                        </tbody>
                                    )}
                                    {/*                                         */}
                                    {countries && !isLoading && (
                                        <tbody className='divide-y divide-vol-mantle bg-vol-crust'>
                                            {countries.map((country) => (
                                                <td>{country}</td>
                                            ))}
                                        </tbody>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Accordion;
