import { VolcanoDetail } from '@/trb/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLockClosed } from 'react-icons/io5';
import PopulationChart from '@/components/map/chart/PopulationChart';

export interface VolcanoDetailDataProps {
	detail: VolcanoDetail[];
}

const VolcanoDetailData: React.FC<VolcanoDetailDataProps> = ({ detail }): React.ReactElement => {
	const [population, setPopulation] = useState<number | string | undefined>(detail[0]['population_5km']);

	const handlePopulationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		const newPopulation = detail[0][value];
		setPopulation(newPopulation);
	};

	return (
		<>
			<div>
				<table className='space-y-0.5'>
					<tr className='rounded-md'>
						<td className='p-1'>
							<span className='text-2xl font-semibold text-vol-white'>{detail[0].name}</span>
						</td>
					</tr>
					<tr>
						<td>Region: </td>
						<td>
							<span className='text-lg font-semibold text-vol-white'>{detail[0].region}</span>
						</td>
					</tr>
					<tr>
						<td>Sub-region: </td>
						<td>
							{' '}
							<span className='text-lg font-semibold text-vol-white'>
								{detail[0].subregion}
							</span>
						</td>
					</tr>
					<tr>
						<td>Last erupted: </td>
						<td>
							<span className='text-lg font-semibold text-vol-white'>
								{detail[0].last_eruption}
							</span>
						</td>
					</tr>
					<tr>
						<td>Summit: </td>
						<td>
							{' '}
							<span className='text-lg font-semibold text-vol-white'>{detail[0].summit}</span> m
						</td>
					</tr>
					<tr>
						<td>Elevation: </td>
						<tr>
							<span className='text-lg font-semibold text-vol-white'>
								{detail[0].elevation}
							</span>{' '}
							m
						</tr>
					</tr>
					<tr>
						<td>Coordinates: </td>
						<td>
							{' '}
							<span className='text-lg font-semibold text-vol-white'>
								{detail[0].latitude}
							</span>{' '}
							lat,{' '}
							<span className='text-lg font-semibold text-vol-white'>
								{detail[0].longitude}
							</span>{' '}
							long
						</td>
					</tr>
				</table>
                <div className='flex flex-col justify-between items-center mt-12'>
				<div className='flex flex-row space-x-2'>
					<span className='text-lg font-bold'>Population data</span>
					<select
						onChange={(event) => handlePopulationChange(event)}
						className='justify-center rounded-lg bg-vol-crust text-xs text-vol-fawn'
					>
						<option value={'population_5km'}>within 5km</option>
						<option value={'population_10km'}>within 10km</option>
						<option value={'population_30km'}>within 30km</option>
						<option value={'population_100km'}>within 100km</option>
					</select>
				</div>
				<div className='mb-8 flex flex-col'>
					{((population === 0 || population) && (
						<>
							<div className='flex flex-row items-center justify-start space-x-1'>
								<p className='intrne'>
									<span>
										there{' '}
										{population === 1 ?
											<span>is</span>
										:	<span>are</span>}
									</span>

									<span className='text-lg font-semibold text-vol-white'>
										&nbsp;{population}&nbsp;
									</span>
									<span>
										{population === 1 ?
											<span>person</span>
										:	<span>people</span>}{' '}
										trving within the selected range.
									</span>
								</p>
							</div>
						</>
					)) ?? (
						<Link
							to={'/account/login'}
							className='mt-4 flex flex-row items-center justify-center space-x-1 text-vol-white opacity-55 transition-all duration-300 ease-out hover:text-vol-fawn hover:opacity-100'
						>
							<div>Sign in to access population data</div>
							<IoLockClosed />
						</Link>
					)}
				</div>
                </div>
			</div>
		</>
	);
};

export default VolcanoDetailData;
