import { useEffect, useState } from 'react';
import { useStore } from '../../lib/store/storeContext';
import { fzf, paginate, handleSwapOrder } from '../../lib/utils/sorting';

// import AccordionRow from './AccordionRow';
import AccordionList from './AccordionList';
import AccordionSortButton from './AccordionSortButton';
import Searchbox from './../pages/Searchbox';
import Paginator from './../pages/Paginator';
import VolcanoGrid from '../grid/Grid';

interface AccordionProps {
    title: string;
    tagline: string;
    activeCountry: string | undefined;
    setActiveCountry: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Accordion: React.FC<AccordionProps> = ({ title, tagline, activeCountry, setActiveCountry }): React.ReactElement => {
    const { data, add, isLoading, setIsLoading } = useStore();

    const [countriesArray, setCountriesArray] = useState<string[]>([]);

    const [pages, setPages] = useState<string[][] | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(0);
    const orderOptions = ['d', 'a'];
    const [order, setOrder] = useState(orderOptions[0]);

    let debounce: number | undefined;
    async function search(input: string) {
        clearTimeout(debounce);
        debounce = setTimeout(async () => {
            let currentPageBackup: number = currentPage;

            let result: any[];
            result = fzf<string>(input, countriesArray, (item) => item);

            let paginatedResult: string[][] = paginate(result, currentPage, 10);
            console.log(paginatedResult);

            setPages(paginatedResult);

            currentPageBackup >= paginatedResult.length ?
                setCurrentPage(paginatedResult.length - 1)
                : setCurrentPage(currentPageBackup);
        }, 250);
    }

    const changePage = (pageNum: number): void => {
        if (pages && pageNum < pages.length) {
            setCurrentPage(pageNum);
        }
    };

    useEffect(() => {
        async function checkForData() {
            setIsLoading(true);
            setCountriesArray(data.countries);
            setPages(paginate(data.countries, 0, 15));
            setIsLoading(false);
        }

        if (!pages && !isLoading) {
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
                        <div className='mt-12 flex flex-col items-center'>
                            <div className='text-3xl font-bold'>{title}</div>
                            <div className=''>{tagline}</div>
                        </div>
                        <div className='mt-12 flex w-full flex-row justify-around transition-all duration-500'>
                            <>
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
                            </>
                        </div>
                        <div className='flex w-full flex-col items-center transition-all duration-300'>
                            <div className='mx-12 mt-4 w-full max-w-[65%] rounded-lg border border-vol-surface p-4 shadow-lg transition-all duration-300 ease-out'>
                                <div>
                                    {!activeCountry && (
                                        <Paginator
                                            pages={pages}
                                            changePage={changePage}
                                            prvPage={currentPage}
                                        />
                                    )}
                                </div>

                                <AccordionList
                                    pages={pages}
                                    currentPage={currentPage}
                                    setActiveCountry={setActiveCountry}
                                    activeCountry={activeCountry}
                                />

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Accordion;
