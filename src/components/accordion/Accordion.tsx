import { useEffect, useState } from 'react';
import { useStore } from '../../lib/store/storeContext';
import { sleep } from '../../lib/utils/utils';
import { fzf, paginate, handleSwapOrder } from '../../lib/utils/sorting';

// import AccordionPanel from './AccordionPanel';
// import AccordionRow from './AccordionRow';
import AccordionList from './AccordionList';
import AccordionSortButton from './AccordionSortButton';
import Searchbox from './../pages/Searchbox';
import Paginator from './../pages/Paginator';

interface AccordionProps {
    title: string;
}

const Accordion: React.FC<AccordionProps> = ({ title }): React.ReactElement => {
    const { data, isLoading, setIsLoading } = useStore();

    const [countriesArray, setCountriesArray] = useState<string[]>([]);

    const [pages, setPages] = useState<string[][] | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(0);

    const orderOptions = ['d', 'a'];
    const [order, setOrder] = useState(orderOptions[0]);

    async function search(input: string) {
        let currentPageBackup: number = currentPage;

        let result: string[] = fzf(input, countriesArray);
        let paginatedResult: string[][] = paginate(result, currentPage);

        setPages(paginatedResult);

        currentPageBackup >= paginatedResult.length ?
            setCurrentPage(paginatedResult.length - 1)
            : setCurrentPage(currentPageBackup);
    }

    const changePage = (pageNum: number): void => {
        if (pages && pageNum < pages.length) {
            setCurrentPage(pageNum);
        }
    };

    useEffect(() => {
        async function checkForData() {
            while (!data.countries) {
                await sleep(300);
            }
            setCountriesArray(data.countries[0]);
            setPages(paginate(data.countries[0], 0));
            setIsLoading(false);
        }

        if (!pages && !isLoading) {
            setIsLoading(true);
            checkForData();
        }
    }, []);

    return (
        <>
            {/* replace with actual loader animation or whatever */}
            {isLoading && <div>LOADING placeholder</div>}
            {/* ------------------------------------------------ */}

            {!isLoading && pages && (
                <>
                    <div className='flex flex-col content-center items-center justify-center overflow-hidden transition-all duration-500'>
                        <div className='mt-12 flex flex-col items-center text-3xl font-bold'>
                            <div>{title}</div>
                        </div>
                        <div className='mt-12 flex w-full flex-row justify-around transition-all duration-500'>
                            <div>
                                <Searchbox searchBuffer={(input) => search(input)} />
                            </div>
                            <div>
                                <div className='mx-1 my-px p-3 transition-all duration-500'>
                                    <AccordionSortButton
                                        order={order}
                                        handleSwapOrder={() =>
                                            handleSwapOrder(order, orderOptions, countriesArray)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex w-full flex-col items-center transition-all duration-300'>
                            <div className='mx-12 mt-4 w-full max-w-[90%] rounded-lg border border-vol-surface p-4 shadow-lg transition-all duration-300 ease-out sm:max-w-[65%] xl:max-w-[64em]'>
                                <div>
                                    <Paginator pages={pages} changePage={changePage} prvPage={currentPage} />
                                </div>

                                <AccordionList pages={pages} currentPage={currentPage} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Accordion;
