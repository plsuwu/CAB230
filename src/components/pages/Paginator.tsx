import { useState, useEffect } from 'react';
import {
	RiArrowRightSLine,
	RiArrowLeftSLine,
	RiArrowLeftDoubleLine,
	RiArrowRightDoubleLine,
} from 'react-icons/ri';
import PaginatorPageNumbers from '@/components/pages/PaginatorPageNumbers';

interface PaginatorProps {
	pages: string[][];
	prvPage: number;
	changePage: (pageNum: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ pages, prvPage, changePage }): React.ReactElement => {
	const [currentPage, setCurrentPage] = useState<number>(prvPage);
	const [pageMinMax] = useState<number[]>([0, pages.length - 1]);

	const pageClick = (pageNum: number): void => {
		if (pageNum >= pages.length || currentPage >= pages.length) {
			// console.log(`received invalid pagenumber`);
			return;
		}

		if (currentPage === pageNum) {
			return;
		}

		setCurrentPage(pageNum);
		if (pageNum < pages.length) {
			changePage(pageNum);
		}
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
		<div className='mb-4 flex items-center justify-between border-b border-vol-orange pb-4'>
			{/* left sect */}
			<div className='-my-px flex w-0 flex-1 justify-start'>
				<button
					onClick={() => pageClick(pageMinMax[0])}
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
					onClick={() => pageClick(Math.max(0, currentPage - 1))}
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
					changePage={(pageNum) => pageClick(pageNum)}
				/>
			</div>

			<div className='-my-px flex w-0 flex-1 justify-end'>
				<button
					onClick={() => pageClick(Math.min(pages.length, currentPage + 1))}
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
						<div className='mx-2 inline content-center text-xs transition-opacity duration-300 ease-out group-hover:opacity-55'>
							next
						</div>
						<span className='transition-opacity duration-300 ease-out group-hover:opacity-55'>
							]
						</span>
					</div>
				</button>
				<button
					onClick={() => pageClick(pageMinMax[1])}
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
						<div className='mx-2 inline content-center text-xs transition-opacity duration-300 ease-out group-hover:opacity-55'>
							last
						</div>
						<span className='transition-opacity duration-300 ease-out group-hover:opacity-55'>
							]
						</span>
					</div>
				</button>
			</div>
		</div>
	);
};
export default Paginator;
