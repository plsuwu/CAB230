import { VolcanoDetail } from '@/lib/types';
import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';

interface VolcanoDetailDataProps {
	detail: VolcanoDetail[];
}

const VolcanoDetailData: React.FC<VolcanoDetailDataProps> = ({ detail }): React.ReactElement => {
	const [population, setPopulation] = useState<number | undefined>(detail[0]['population_5km']);

	const handlePopulationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		const newPopulation = detail[0][value];
		setPopulation(newPopulation);
	};

	return (
		<>
			<div>
				<ul className='space-y-0.5'>
					<li>
						Name: <span className='text-lg font-semibold text-vol-white'>{detail[0].name}</span>
					</li>
					<li>
						Region:{' '}
						<span className='text-lg font-semibold text-vol-white'>{detail[0].region}</span>
					</li>
					<li>
						Sub-region:{' '}
						<span className='text-lg font-semibold text-vol-white'>{detail[0].subregion}</span>
					</li>
					<li>
						Last erupted:{' '}
						<span className='text-lg font-semibold text-vol-white'>
							{detail[0].last_eruption}
						</span>
					</li>
					<li>
						Summit:{' '}
						<span className='text-lg font-semibold text-vol-white'>{detail[0].summit}</span> m
					</li>
					<li>
						Elevation:{' '}
						<span className='text-lg font-semibold text-vol-white'>{detail[0].elevation}</span> m
					</li>
					<li>
						Coordinates:{' '}
						<span className='text-lg font-semibold text-vol-white'>{detail[0].latitude}</span>{' '}
						lat,{' '}
						<span className='text-lg font-semibold text-vol-white'>{detail[0].longitude}</span>{' '}
						long
					</li>

				</ul>
					<div className='mt-8 flex flex-row space-x-2 justify-around'>
						<span className='text-lg font-bold'>Population data</span>
						<select
							onChange={(event) => handlePopulationChange(event)}
							className='bg-vol-crust text-xs text-vol-fawn rounded-lg justify-center'
						>
							<option value={'population_5km'}>within 5km</option>
							<option value={'population_10km'}>within 10km</option>
							<option value={'population_30km'}>within 30km</option>
							<option value={'population_100km'}>within 100km</option>
						</select>
					</div>
					<div className='mt-8 flex-col flex'>
						{((population === 0 || population) && (
							<div className='flex-row flex space-x-1 items-center justify-center'>
                            <p className='inline'>
								<span>there {(population === 1 ? <span>is</span> : <span>are</span>)}</span>

								<span className='font-semibold text-lg text-vol-white'>&nbsp;{population}&nbsp;</span>
								<span>{(population === 1 ? <span>person</span> : <span>people</span>)} living within the selected range.</span>
                                </p>
							</div>
						)) ?? (
							<Link
								to={'/account/login'}
								className='flex-row flex justify-center items-center text-vol-white opacity-55 transition-all duration-300 ease-out hover:text-vol-fawn hover:opacity-100'
							>
								<div>Sign in to access population data</div>
							</Link>
						)}
					</div>
			</div>
		</>
	);
};

export default VolcanoDetailData;
