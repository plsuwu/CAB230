import { useState, useEffect } from 'react';
import { useStore } from '../../lib/store/storeContext';

interface Pages {
    pages: string[][];
    currentPage: number;
    changePage: (pageNum: number) => void;
}

const PaginatorPageNumbers: React.FC<Pages> = ({
    pages,
    currentPage,
    changePage,
}): React.ReactElement => {
    const { isLoading, setIsLoading } = useStore();
    const [pageCount, setPageCount] = useState<number[] | undefined>(undefined);

    function handleChangePage(pageNum: number) {
        changePage(pageNum);
    }

    useEffect(() => {
        if (!isLoading && (!pageCount || pageCount.length !== pages.length)) {
            setIsLoading(true);
            let tmp: number[] = [];
            for (let i = 0; i < pages.length; ++i) {
                tmp.push(i);
            }

            setPageCount(tmp);
            setIsLoading(false);
        }
    }, [pages]);

    return (
        <>
            <div className='-md-px flex'>
                {pageCount && (
                    <div className='flex flex-row content-center items-center space-x-2 text-xs select-none'>
                    <div>page:&nbsp;&nbsp;</div>
                        {pageCount.map((num) =>
                            num === currentPage ?
                                <button
                                    key={num}
                                    className='flex w-[30px] flex-1 flex-row items-center justify-between p-1'
                                >
                                    <div className='inline-flex text-xs self-start'>[</div>
                                    <div className='inline-flex text-[10px]'>{num + 1}</div>
                                    <div className='inline-flex text-xs self-end'>]</div>
                                </button>
                                : <button
                                    key={num}
                                    className='flex w-[30px] flex-row items-center justify-center space-x-1 p-1'
                                    onClick={() => handleChangePage(num)}
                                >
                                    <div className='inline-flex text-xs'></div>
                                    <div className='inline-flex text-[10px]'>{num + 1}</div>
                                    <div className='inline-flex text-xs'></div>
                                </button>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default PaginatorPageNumbers;
