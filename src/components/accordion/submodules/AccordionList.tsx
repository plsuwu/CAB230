import { Disclosure } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';
import { classNames } from '@/lib';
import { AccordionRowCollapsed, AccordionRowExpanded } from '@/components/accordion';

interface AccordionListProps {
	pages: string[][];
	currentPage: number;
	activeCountry: string | undefined;
	setActiveCountry: Dispatch<SetStateAction<string | undefined>>;
	searchTerm: string | undefined;
}

const AccordionList: React.FC<AccordionListProps> = ({
	pages,
	currentPage,
	activeCountry,
	setActiveCountry,
	searchTerm,
}): React.ReactElement => {
	/**
	 * Determines whether a country is currently selected, and if so, deactivates it. Otherwise, the country is activated.
	 * @param {string} country - country that a user has clicked on
	 * @returns {Promise<void>} side effect used to manage component state
	 */
	const toggleActiveCountry = async (country: string): Promise<void> => {
		if (country !== activeCountry) {
			setActiveCountry(undefined);
			setActiveCountry(country);
		} else {
			setActiveCountry(undefined);
		}
	};

	return (
		<ul className='flex w-full flex-col items-center justify-between space-y-0.5 self-center transition-all duration-500'>
			{/*
                `activeCountry` defines which country has been clicked (if any), and sets the list state accordingly:
                    - if `activeCountry` contains a string, display the `expanded` component
                    - if `activeCountry` is undefined, map all countries into a `collapsed` component and
                        display as a list.
            */}
			{(activeCountry && (
				<AccordionRowExpanded
					country={activeCountry}
					activeCountry={activeCountry}
					open={true}
					collapseCountry={toggleActiveCountry}
				/>
			)) ??
				pages[currentPage].map((country: string, index: number) => (
					<Disclosure
						as='li'
						key={index}
						className={classNames(
							index % 2 === currentPage % 2 ? 'bg-vol-crust/35' : 'bg-vol-crust',
							'flex w-full flex-col items-center justify-around rounded-md p-1.5 transition-all duration-200 ease-in-out'
						)}
					>
						{({ open }) =>
							country === 'No results' || country === ' ' ?
								<>
									<div className='transition-all duration-500'>
										{country !== ' ' ?
											<div className='ml-2.5 flex flex-1 items-center justify-center space-x-1 rounded-lg font-semibold text-vol-peach'>
												{country}{' '}
												{searchTerm && (
													<>
														<div className='ml-1'>
															{' '}
															found for "
															<span className='mr-1 font-normal italic'>
																{searchTerm}
															</span>
															"!
														</div>
													</>
												)}
											</div>
										:	<div className='flex-0 mr-4 flex flex-row items-center justify-center rounded-md px-2 py-1'>
												<div className='h-[24px]'> </div>
											</div>
										}
									</div>
								</>
							:	<>
									<AccordionRowCollapsed
										country={country}
										open={open}
										expandCountry={toggleActiveCountry}
									/>
								</>
						}
					</Disclosure>
				))}
		</ul>
	);
};
export default AccordionList;
