import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLockClosed } from 'react-icons/io5';
import { VolcanoDetail } from '@/lib/types';
import { VolcanoDataTable } from '@/components/map';

export interface VolcanoDetailDataProps {
	detail: VolcanoDetail[];
}

const VolcanoDetailData: React.FC<VolcanoDetailDataProps> = ({ detail }): React.ReactElement => {
	const [population, setPopulation] = useState<number | string | undefined>(detail[0]['population_5km']);
	const [selectionValue, setSelectionValue] = useState<string>('5km');

    /**
    * updates `population` and related page text state when a new value is selected by a user
    * @param {React.ChangeEvent} event - the select box element's event
    * @returns {void} produces a state-changing side effect
    */
	const handlePopulationChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		const { value } = event.target;

		const distance = value.split('_')[1];
		setSelectionValue(distance);

		const newPopulation = detail[0][value];
		setPopulation(newPopulation);
	};

	return (
		<>
			<div>
				<VolcanoDataTable detail={detail} />
				<div className='mt-12 flex flex-col items-center justify-between'>
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
										<span className='text-lg font-semibold text-vol-white'>
											&nbsp;{population.toLocaleString()}&nbsp;
										</span>
										<span>
											{population === 1 ?
												<span>person</span>
											:	<span>people</span>}{' '}
											live within {selectionValue} of {detail[0].name}.
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
