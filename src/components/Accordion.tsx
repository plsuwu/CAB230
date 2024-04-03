import { useState } from 'react';
import { useStore } from '../lib/store/storeContext';
import { classNames } from '../lib/utils';
import { RiArrowUpLine } from 'react-icons/ri';
import { Country } from '../lib/types';

interface AccordionProps {
	title: string;
}

const Accordion: React.FC<AccordionProps> = ({ title }): React.ReactElement => {
	const { data, isLoading } = useStore();

	let countries: Country[] = data.countries;

	const orderOptions = ['d', 'a'];
	const [order, setOrder] = useState(orderOptions[0]);

	const handleSetLog = (): void => {
		console.log('data in store: ', data.countries, data.volcanoes);

		order === orderOptions[0] ? setOrder(orderOptions[1]) : setOrder(orderOptions[0]);
	};

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
												<button onClick={() => handleSetLog()}>
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
                                        <div> LOADING </div>
									)}
									{/*                                         */}
									{countries && !isLoading && (
                                        <ul>
                                        {countries.map((country) => (
                                            <li>
                                                {country}
                                            </li>
                                        ))}
                                        </ul>
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
