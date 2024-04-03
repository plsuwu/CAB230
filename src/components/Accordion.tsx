import { useEffect, useState } from 'react';
import { useStore } from '../lib/store/storeContext';
import { classNames, sleep } from '../lib/utils';
import { RiArrowDownLine } from 'react-icons/ri';
import { Country } from '../lib/types';
import { fzf } from '../lib/sorting';

import Searchbox from './Searchbox';
import Paginator from './Paginator';

interface AccordionProps {
	title: string;
}

type Page = Country[];

/**
 *
 *    -----------------------------------------------------------------------------------
 *     the absurd amount of sorting functionality here truly needs to be refactored out.
 *    -----------------------------------------------------------------------------------
 *
 * */

const Accordion: React.FC<AccordionProps> = ({ title }): React.ReactElement => {
	const { data, isLoading, setIsLoading } = useStore();
	const [pages, setPages] = useState<Page[] | undefined>(undefined);
	const [currentPage, setCurrentPage] = useState(0);

	const orderOptions = ['d', 'a'];
	const [order, setOrder] = useState(orderOptions[0]);

	const paginate = (array: string[]): Page[] => {
		if (!array || array.length <= 0) {
			console.info('NO ARRAY LENGTH!');
			return [['No results :(']];
		}
		if (currentPage > array.length - 1) {
			setCurrentPage(array.length - 1);
		}

		let itemsPerPage = 14; // pass this as a param when working
		let finalPage = Math.max(0, Math.floor(array.length / itemsPerPage));
		let paginatedCountries: Page[] = [];

		for (let i = 0; i < array.length / itemsPerPage; ++i) {
			let arraySlice: string[] = array.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage);
			paginatedCountries.push(arraySlice);
		}

		// pad out the length of the last final page to match the other pages to stop insane layout
		// shift when changing pages
		let last: number = paginatedCountries[finalPage].length;
		let first: number = paginatedCountries[0].length;
		if (last < first) {
			for (let i = last - 1; i < first - 1; ++i) {
				paginatedCountries[finalPage].push(' ');
			}
		}

		return paginatedCountries;
	};

	const handlePageChange = (pageNum: number): void => {
		if (pages && pageNum <= pages.length) {
			setCurrentPage(pageNum);
		}
	};

	// fuzzy-find matches search given a search term. would be ideal to implement a loading spinner or
	// something while the request is processed so we can buffer input slightly and obfuscate UI state changes.
	const handleBufferedSearch = (input: string): void => {
		// so we don't throw an error by trying to read a page that doesn't exist
		// when returning a new set of pages from a search
		let currentPageBackup = currentPage;
		setCurrentPage(0);

		if (!data.countries[0] && isLoading) {
			return;
		}
		if (!input || input.length === 0) {
			let resetPages = paginate(data.countries[0]);
			setPages(resetPages);
			return;
		}

		let result = fzf(input, data.countries[0]);
		let arranged = paginate(result);

		console.log(arranged);
		setPages(arranged);

		// restore page from backup if viable to do so
		currentPageBackup >= arranged.length ?
			setCurrentPage(arranged.length - 1)
		:	setCurrentPage(currentPageBackup);
	};

	useEffect(() => {
		async function checkForData() {
			while (!data.countries) {
				await sleep(100);
			}

			setPages(paginate(data.countries[0]));
			setIsLoading(false);
		}

		if (!pages && !isLoading) {
			setIsLoading(true);
			checkForData();
		}
	}, []);

	const handleSwapOrder = (): void => {
		order === orderOptions[0] ? setOrder(orderOptions[1]) : setOrder(orderOptions[0]);
	};

	return (
		<>
			{/* replace with actual loader animation or whatever */}
			{isLoading && <div>LOADING placeholder</div>}
			{/* ------------------------------------------------ */}

			{!isLoading && pages && (
				<>
					<div className='flex flex-col content-center items-center justify-center'>
						<div className='mt-12 flex flex-col items-center text-3xl font-bold'>
							<div>{title}</div>
						</div>
						<div className='mt-12 flex w-full flex-row justify-around'>
							<div>
								<Searchbox handleBufferedSearch={handleBufferedSearch} />
							</div>
							<div>[ selection placeholder ]</div>
						</div>
						<div className='flex w-full flex-col items-center'>
							<div className='mx-12 mt-4 w-full max-w-[90%] rounded-lg border border-vol-surface p-4 shadow-lg transition-all duration-300 ease-out sm:max-w-[65%] xl:max-w-[64em]'>
								<div className='mx-1 my-px p-3'>
									<button
										onClick={() => handleSwapOrder()}
										className='flex flex-row content-center items-center justify-center space-x-2 transition-all duration-100 ease-out hover:text-vol-peach/75'
									>
										<div className='flex flex-row space-x-1'>
											<div>[ </div>
											{order === 'd' ?
												<div className='text-align-middle mt-0.5 self-center font-mono text-[10px]'>
													dsc
												</div>
											:	<div className='text-align-middle mt-0.5 self-center font-mono text-[10px]'>
													asc
												</div>
											}
											<div> ]</div>
										</div>
										<RiArrowDownLine
											className={classNames(
												order === 'd' ? '' : 'rotate-180',
												'inline-flex items-center transition-all duration-200 ease-out'
											)}
										/>
									</button>
								</div>
								<ul className='flex flex-col content-stretch justify-center space-y-2'>
									{pages[currentPage].map((country: string, index: number) => (
										<li
											key={index}
											className={classNames(
												index % 2 === currentPage % 2 ?
													'bg-vol-mantle/25'
												:	'bg-vol-surface/50',
												'inline-flex rounded-md p-1.5'
											)}
										>
											{' '}
											{country === 'No results :(' || country === ' ' ?
												<>
													<div className='ml-2.5 flex w-0 flex-1 items-center justify-center rounded-lg font-semibold'>
														{country}
													</div>

													<div className='flex-0 mr-4 flex flex-row items-center justify-center rounded-md px-2 py-1'>
														<div className='h-[24px]'> </div>
													</div>
												</>
											:	<>
													<div className='ml-2.5 flex w-0 flex-1 items-center justify-start rounded-lg font-semibold'>
														{country}
													</div>
													<button className='flex-0 group mr-4 flex flex-row items-center justify-center rounded-md px-2 py-1 transition-all duration-100 ease-out hover:text-vol-base/50 group-hover:text-vol-peach/75'>
														[{' '}
														<span className='mx-2 mt-1 font-mono text-xs tracking-tighter transition-all duration-200 ease-out group-hover:text-vol-peach/75'>
															view volcano list
														</span>
														<RiArrowDownLine className='ml-px mr-0.5 mt-px inline align-middle text-sm transition-all duration-200 ease-out group-hover:text-vol-peach/75' />
														]
													</button>
												</>
											}
										</li>
									))}
								</ul>
								<div>
									<Paginator
										pages={pages}
										handlePageChange={handlePageChange}
										prvPage={currentPage}
									/>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Accordion;
