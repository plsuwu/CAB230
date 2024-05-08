import { useEffect, useState } from 'react';
import PopulationChart from './chart/PopulationChart';
import { Map, Marker, Point } from 'pigeon-maps';
import { fetchFromApi, useStore } from '@/lib';
import { VolcanoDetail } from '@/lib/types';
import MapBackButton from './MapBackButton';
import VolcanoDetailData from './VolcanoDetailData';
import { parseTokenInfo } from '@/lib/utils/token';
import { fetchFromApiWithAuth } from '@/lib/store/fetch';

interface VolcanoMapProps {
	country: string;
	id: number;
}

const VolcanoMap: React.FC<VolcanoMapProps> = ({ country, id }): React.ReactElement => {
	const { data, add } = useStore();
	const idStr = id.toString();
	const [coordinates, setCoordinates] = useState<Point | undefined>(undefined);
	const [current, setCurrent] = useState<VolcanoDetail[] | undefined>(undefined);

	const readInfo = async () => {
		try {
			const auth = parseTokenInfo();
			if (auth !== '') {
				const currentVolcanoDetail = await fetchFromApiWithAuth(`/volcano/${id}`, auth);
				add(idStr, new Array(await currentVolcanoDetail));
				setCoordinates([
					Number(currentVolcanoDetail.latitude),
					Number(currentVolcanoDetail.longitude),
				]);
				console.log(await currentVolcanoDetail);
			} else {
				const currentVolcanoDetail = await fetchFromApi(`/volcano/${id}`);

				console.log(currentVolcanoDetail);
				add(idStr, new Array(currentVolcanoDetail));
				setCoordinates([
					Number(currentVolcanoDetail.latitude),
					Number(currentVolcanoDetail.longitude),
				]);
			}
		} catch (err) {
			console.error('error while fetching volano detail => ', err);
		}
	};

	useEffect(() => {
		if (country && id) {
			if (!data[idStr]) {
				readInfo();
			} else {
				setCurrent(data[idStr]);

				setCoordinates([Number(data[idStr][0].latitude), Number(data[idStr][0].longitude)]);
				console.log(current);
			}
		}
	}, [data[idStr]]);

	return (
		<div>
			{current && (
				<>
					<div className='my-12 flex h-full w-full flex-col items-center justify-center '>
						<>
							<div className='my-4 flex flex-row items-center space-x-3 text-3xl font-semibold'>
								<div className='text-4xl font-bold'>{current[0].name}</div>{' '}
								<div className='font-normal italic'>({country})</div>
							</div>
						</>
						<MapBackButton />
					</div>
					<div className='flex flex-row items-center justify-center self-center rounded-md'>
						<div className='flex w-[80%] flex-row items-center justify-between self-center rounded-md bg-vol-surface'>
							<div className='mx-8 my-4 flex-1 rounded-md'>
								<VolcanoDetailData detail={current} />

								{(current[0].population_5km === 0 || current[0].population_5km === 0) && (
									<PopulationChart detail={current} />
								)}
							</div>
							<div className='w-[60%] justify-self-end rounded-md py-6 px-4'>
								<Map height={600} defaultCenter={coordinates} defaultZoom={5}>
									<Marker width={40} anchor={coordinates} />
								</Map>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default VolcanoMap;
