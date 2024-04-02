import { useState } from 'react';
import { classNames } from '../lib/utils';
import { RiArrowUpLine, RiArrowRightLine } from 'react-icons/ri';
import { VolcanoData } from '../lib/types';
import { Link } from 'react-router-dom';

interface AccordionProps {
	title: string;
	loading: boolean;
	countries: string[] | null;
	volcanoes: VolcanoData[];
	sortOptions: string[];
}

const Accordion: React.FC<AccordionProps> = ({
	title,
	loading,
	countries,
	volcanoes,
	sortOptions,
}): React.ReactElement => {
	const orderOptions = ['d', 'a'];
	const [order, setOrder] = useState(orderOptions[0]);

	// fix ordering
	const handleSetOrdering = (orderBy: string): void => {
		console.log('order by: ', orderBy, countries, sortOptions); // currently here to make the linter shuddup on orderBy/countries/sortOptions vars
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
												<button onClick={() => handleSetOrdering('name')}>
													<div className='flex items-center space-x-2'>
														<RiArrowUpLine
															className={classNames(
																order === orderOptions[0] ? '' : 'rotate-180',
																'transition-colors duration-300 ease-out hover:text-vol-peach'
															)}
														/>
														<div>Name</div>
													</div>
												</button>
											</th>
											<th
												scope='col'
												className='px-3 py-3.5 text-left text-sm font-semibold text-vol-champ'
											>
												Sub-region
											</th>
											<th
												scope='col'
												className='px-3 py-3.5 text-left text-sm font-semibold text-vol-champ'
											>
												<button onClick={() => handleSetOrdering('countries')}>
													<div className='flex items-center space-x-2'>
														<RiArrowUpLine
															className={classNames(
																order === orderOptions[0] ? '' : 'rotate-180',
																'transition-colors duration-300 ease-out hover:text-vol-peach '
															)}
														/>
														<div>Country</div>
													</div>
												</button>
											</th>
											<th
												scope='col'
												className=' flex flex-row px-3 py-3.5 text-sm font-semibold text-vol-champ'
											>
												<div>View details</div>
											</th>
										</tr>
									</thead>
									{loading ?
										<div>loading ...</div>
									:	<tbody className='divide-y divide-vol-mantle bg-vol-crust'>
											{volcanoes.map((volcano) => (
												<tr key={volcano.id}>
													<td className='text-md whitespace-nowrap py-4 pl-4 pr-3 '>
														<Link
															to={`/volcanoes/${volcano.id}`}
															className='transition-all duration-300 ease-out hover:text-vol-orange/50'
														>
															{volcano.name}
														</Link>
													</td>
													<td className='text-md whitespace-nowrap px-3 py-4 italic text-vol-white/70'>
														{volcano.subregion}
													</td>
													<td className='text-md whitespace-nowrap px-3 py-4 italic text-vol-white/70'>
														{volcano.country}
													</td>
													<td className='whitespace-nowrap px-3 py-4 text-lg text-vol-orange'>
														<Link
															to={`/volcanoes/${volcano.id}`}
															className='-ml-14 flex flex-row justify-center underline-offset-8'
														>
															<RiArrowRightLine className='text-2xl transition-all duration-300 ease-out hover:text-vol-peach/50' />
														</Link>
													</td>
												</tr>
											))}
										</tbody>
									}
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
