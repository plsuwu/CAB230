import { fetchFromApi, useStore } from '@/lib';
import { fetchFromApiWithAuth } from '@/lib/store/fetch';
import { parseTokenInfo } from '@/lib/utils/token';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RootLanding: React.FC = (): React.ReactElement => {
	const { add } = useStore();
	const [randomId, setRandomId] = useState<number | undefined>(undefined);
	const [randomCountry, setRandomCountry] = useState<string | undefined>(undefined);
	const [randomVolcano, setRandomVolcano] = useState<string | undefined>(undefined);

 /** Fetches a random volcano for an authed or unauthed user on the landing page.
  * @async
  * @returns {Promise<void>} Used on component mount to set the state of parameters used in this component's HTML.
  */
	async function fetchRandom(): Promise<void> {
		const token = parseTokenInfo();
		const num = Math.floor(Math.random() * 1000);
		if (token !== '') {
			// console.log(num);
			const volcano = await fetchFromApiWithAuth(`/volcano/${num}`, token);
			console.log(volcano.country);
			add(num.toString(), new Array(volcano));
			setRandomCountry(volcano.country);
			setRandomVolcano(volcano.name);
			setRandomId(num);
		} else {
			const volcano = await fetchFromApi(`/volcano/${num}`);
			console.log(volcano.country);
			add(num.toString(), new Array(volcano));
			setRandomCountry(volcano.country);
			setRandomVolcano(volcano.name);
			setRandomId(num);
			// setRandom(num);
		}
	}

	useEffect(() => {
		fetchRandom();
	}, []);

	return (
		<div className='flex h-full w-full flex-col items-center justify-center text-3xl font-semibold'>
			<div className='text-6xl font-bold'>Volcano DB</div>
			<div className='mt-4 flex flex-col items-center justify-center text-2xl'>
				<div className='text-base font-normal'>
					{' '}
					<span>Just browsing?</span> Check out this volcano in{' '}
					<span className='text-md font-semibold'> {randomCountry}</span>, named
				</div>
				<Link
					className='group text-vol-peach transition-all duration-200 hover:opacity-75 group-hover:text-vol-fawn'
					to={`/volcanoes/${randomCountry}/${randomId}`}
				>
					<span className='flex mt-8 group text-4xl  transition-all duration-200 group-hover:text-vol-fawn'>
						{randomVolcano}
					</span>{' '}
					<span className='group transition-all duration-200 group-hover:text-vol-fawn'></span>
				</Link>
			</div>
		</div>
	);
};

export default RootLanding;
