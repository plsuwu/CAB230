import { useState, useEffect } from 'react';
import { useStore } from '../lib/store/storeContext';
import {
	RiArrowRightSLine,
	RiArrowLeftSLine,
	RiArrowLeftDoubleLine,
	RiArrowRightDoubleLine,
} from 'react-icons/ri';
import type { Country } from '../lib/types';
import PaginatorPageNumbers from './PaginatorPageNumbers';

type Page = Country[];

interface PaginatorProps {
	pages: Page[];
	prvPage: number;
	handlePageChange: (pageNum: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ pages, prvPage, handlePageChange }): React.ReactElement => {
	const [currentPage, setCurrentPage] = useState<number>(prvPage);
	const [pageMinMax, setPageMinMax] = useState<number[]>([0, pages.length-1]);

	const handlePageClick = (pageNum: number): void => {
		if (pageNum >= pages.length || currentPage >= pages.length) {
			console.log(`received invalid pagenumber`);
			setCurrentPage(pages.length - 1);
		}

		if (currentPage === pageNum) {
			return;
		}

		setCurrentPage(pageNum);
		handlePageChange(pageNum);
	};

	useEffect(() => {
		if (!currentPage) {
			if (prvPage) {
				setCurrentPage(prvPage);
			} else {
				setCurrentPage(0);
			}
		}
	}, []);

	return (
		<div className='mt-6 flex items-center justify-between border-t border-vol-orange'>
			{/* left sect */}
			<div className='-my-px flex w-0 flex-1 justify-start'>
				<button
					onClick={() => handlePageClick(pageMinMax[0])}
					className='group -mb-3 flex flex-col items-center p-2 text-sm font-medium transition-all duration-300 ease-out group-hover:opacity-55'
				>
					<RiArrowLeftDoubleLine
						className='mr-1 transition-all duration-300 ease-out group-hover:text-vol-surface group-hover:opacity-40'
						aria-hidden='true'
					/>
					<div>
						<span className='transition-opacity duration-300 ease-out group-hover:opacity-55'>
							[
						</span>
						<div className='mx-2 inline content-center border-t-2 border-transparent text-xs transition-opacity duration-300 ease-out group-hover:opacity-55'>
						    first
						</div>
						<span className='transition-opacity duration-300 ease-out group-hover:opacity-55'>
							]
						</span>
					</div>
				</button>

				<button
					onClick={() => handlePageClick(Math.max(0, currentPage - 1))}
					className='group -mb-3 flex flex-col items-center p-2 text-sm font-medium transition-all duration-300 ease-out group-hover:opacity-55'
				>
					<RiArrowLeftSLine
						className='mr-1 transition-all duration-300 ease-out group-hover:text-vol-surface group-hover:opacity-40'
						aria-hidden='true'
					/>
					<div>
						<span className='transition-opacity duration-300 ease-out group-hover:opacity-55'>
							[
						</span>
						<div className='mx-2 inline content-center border-t-2 border-transparent text-xs transition-opacity duration-300 ease-out group-hover:opacity-55'>
							prev
						</div>
						<span className='transition-opacity duration-300 ease-out group-hover:opacity-55'>
							]
						</span>
					</div>
				</button>
			</div>

			<div>
				<PaginatorPageNumbers
					pages={pages}
					currentPage={currentPage}
					changePage={(pageNum) => handlePageClick(pageNum)}
				/>
			</div>

			<div className='-my-px flex w-0 flex-1 justify-end'>
				<button
					onClick={() => handlePageClick(Math.min(pages.length, currentPage + 1))}
					className='group -mb-3 flex flex-col items-center p-2 text-sm font-medium transition-all duration-300 ease-out group-hover:opacity-55'
				>
					<RiArrowRightSLine
						className='ml-1 transition-all duration-300 ease-out group-hover:text-vol-surface group-hover:opacity-40'
						aria-hidden='true'
					/>
					<div>
						<span className='transition-opacity duration-300 ease-out group-hover:opacity-55'>
							[
						</span>
						<div className='mx-2 inline content-center border-t-2 border-transparent text-xs transition-opacity duration-300 ease-out group-hover:opacity-55'>
							next
						</div>
						<span className='transition-opacity duration-300 ease-out group-hover:opacity-55'>
							]
						</span>
					</div>
				</button>
                <button
					onClick={() => handlePageClick(pageMinMax[1])}
					className='group -mb-3 flex flex-col items-center p-2 text-sm font-medium transition-all duration-300 ease-out group-hover:opacity-55'
				>
					<RiArrowRightDoubleLine
                    className='ml-1 transition-all duration-300 ease-out group-hover:text-vol-surface group-hover:opacity-40'
						aria-hidden='true'
					/>
					<div>
						<span className='transition-opacity duration-300 ease-out group-hover:opacity-55'>
							[
						</span>
						<div className='mx-2 inline content-center border-t-2 border-transparent text-xs transition-opacity duration-300 ease-out group-hover:opacity-55'>
						    last
						</div>
						<span className='transition-opacity duration-300 ease-out group-hover:opacity-55'>
							]
						</span>
					</div>
				</button>

			</div>
			{/* right sect */}
		</div>
	);
};
export default Paginator;
