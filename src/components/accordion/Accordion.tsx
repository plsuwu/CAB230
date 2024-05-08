import { useEffect, useState } from 'react';
import { useStore, fuzzySearch, paginate, reOrder } from '@/lib/index';
import { AccordionList, AccordionSortButton } from '@/components/accordion';
import SearchCountries from '@/components/search/SearchCountries';
import Paginator from '@/components/pages/Paginator';

interface AccordionProps {
    title: string;
    tagline: string;
    activeCountry: string | undefined;
    setActiveCountry: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Accordion: React.FC<AccordionProps> = ({
    title,
    tagline,
    activeCountry,
    setActiveCountry,
}): React.ReactElement => {
    const { data, isLoading, setIsLoading } = useStore();
    const [countriesArray, setCountriesArray] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
    const [pages, setPages] = useState<string[][] | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(0);
    const orderOptions = ['d', 'a'];
    const [order, setOrder] = useState(orderOptions[0]);

    let debounce: NodeJS.Timeout | undefined;
    async function search(input: string) {
        clearTimeout(debounce);
        debounce = setTimeout(async () => {
            if (searchTerm !== input) {
                setSearchTerm(input);
            }
            let currentPageBackup: number = currentPage;
            let result: any[];
            result = fuzzySearch<string>(input, countriesArray, (item) => item);

            // single-func search & filter for volcanoes & countries - something like:
            // ```
            // result = fuzzySearch<Volcano>(input, data[activeCountry], (item) => `${item.name} ${item.id} {item.region} ${item.subregion}`);
            // ```

            let paginatedResult: string[][] = paginate(result, 13);
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

    function handleReOrder() {
        setOrder(order === orderOptions[0] ? orderOptions[1] : orderOptions[0]);
        let reorderedCountries = reOrder(order, orderOptions, countriesArray);
        setCountriesArray(reorderedCountries);
        let paginated = paginate(countriesArray, 13);
        setPages(paginated);
    }

    useEffect(() => {
        async function checkForData() {
            setIsLoading(true);
            setCountriesArray(data.countries as string[]);
            setPages(paginate(data.countries as string[], 13));
            setIsLoading(false);
        }

        if (!pages && !isLoading) {
            checkForData();
        }
    }, []);

    useEffect(() => {
        setCountriesArray(data.countries as string[]);
        setPages(paginate(data.countries as string[], 13));
    }, [activeCountry]);

    return (
        <>
            {/* replace with actual loader animation or whatever */}
            {isLoading && <div>LOADING placeholder</div>}
            {/* ------------------------------------------------ */}

            {!isLoading && pages && (
                <>
                    <div className='flex flex-col content-center items-center justify-center overflow-hidden transition-all duration-300'>
                        <div className='flex flex-col items-center'>
                            <div className='text-3xl font-bold'>{title}</div>
                            <div className=''>{tagline}</div>
                        </div>
                        <div className='mt-12 flex flex-row justify-center items-center space-x-4 transition-all duration-500'>
                            <>
                                <div>
                                    {(activeCountry && (
                                    <></>
                                    )) ?? <SearchCountries searchBuffer={(input) => search(input)} />}
                                </div>
                                <div>
                                    <div className='mx-1 my-px p-3 transition-all duration-500'>
                                        <AccordionSortButton
                                            searchTerm={searchTerm}
                                            setSearchTerm={(value) => setSearchTerm(value)}
                                            order={order}
                                            handleReOrder={() => handleReOrder()}
                                        />
                                    </div>
                                </div>
                            </>
                        </div>
                        <div className='flex w-full flex-col items-center transition-all duration-300'>
                            <div className='shadow-xl mx-12 mt-4 w-full md:w-2/3 2xl:w-[40%] rounded-lg bg-vol-mantle border border-vol-surface p-4 transition-all duration-300 ease-out flex flex-col justify-center'>
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
                                    searchTerm={searchTerm}
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
