import { VolcanoDetail } from '@/lib/types';

interface VolcanoDataTableProps {
	detail: VolcanoDetail[];
}

const VolcanoDataTable: React.FC<VolcanoDataTableProps> = ({ detail }): React.ReactElement => {
	return (
		<div className='flex flex-col space-y-0.5'>
			<div className='flex flex-row justify-between'>
				<div className='p-1'>
					<span className='text-2xl font-semibold text-vol-white'>{detail[0].name}</span>
				</div>
			</div>

			<div className='flex flex-row justify-between'>
				<div>Region: </div>
				<div>
					<span className='text-lg font-semibold text-vol-white'>{detail[0].region}</span>
				</div>
			</div>
			<div className='flex flex-row justify-between'>
				<div>Sub-region: </div>
				<div>
					{' '}
					<span className='text-lg font-semibold text-vol-white'>{detail[0].subregion}</span>
				</div>
			</div>

			<div className='flex flex-row justify-between'>
				<div>Last erupted: </div>
				<div>
					<span className='text-lg font-semibold text-vol-white'>{detail[0].last_eruption}</span>
				</div>
			</div>

			<div className='flex flex-row justify-between'>
				<div>Summit: </div>
				<div>
					{' '}
					<span className='text-lg font-semibold text-vol-white'>{detail[0].summit}</span> m
				</div>
			</div>

			<div className='flex flex-row justify-between'>
				<div>Elevation: </div>
				<div>
					<span className='text-lg font-semibold text-vol-white'>{detail[0].elevation}</span> m
				</div>
			</div>
			<div className='flex flex-row justify-between'>
				<div>Coordinates: </div>
				<div>
					{' '}
					<span className='text-lg font-semibold text-vol-white'>
						{detail[0].latitude}
					</span> lat,{' '}
					<span className='text-lg font-semibold text-vol-white'>{detail[0].longitude}</span> long
				</div>
			</div>
		</div>
	);
};

export default VolcanoDataTable;
