import { useState, useEffect } from 'react';
import { useStore } from '../lib/store/storeContext';
import { Country } from '../lib/types';

type Page = Country[];

interface Pages {
	pages: Page[];
	currentPage: number;
	changePage: (pageNum: number) => void;
}

const PaginatorPageNumbers: React.FC<Pages> = ({ pages, currentPage, changePage }): React.ReactElement => {
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
			console.log(tmp);

			setPageCount(tmp);
			setIsLoading(false);
		}
	}, [pages]);

	return (
		<>
			<div className='-md-px flex'>
				{pageCount && (
					<div className='flex flex-row content-center items-center justify-center space-x-10 text-center text-xs'>
						{pageCount.map((num) =>
							num === currentPage ?
								<button className='flex flex-1 flex-row space-x-1 p-1 items-center text-center w-[25px]'>
									<div className='inline-flex text-xs'>[</div>
									<div className='inline-flex text-[10px]'>{num}</div>
									<div className='inline-flex text-xs'>]</div>
								</button>
							:	<button
									className='flex flex-1 flex-row space-x-1 p-1 items-center w-[25px]'
									onClick={() => handleChangePage(num)}
								>
									<div className='inline-flex text-xs'></div>
									<div className='inline-flex text-[10px]'>{num}</div>
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
