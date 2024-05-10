import { fetchFromApi, fetchFromApiWithAuth, useStore, parseTokenInfo } from '@/lib';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageButton } from '@/components/landing';
import AbuJapan from '/public/img/abu.png';
import OkatainaNZ from '/public/img/okataina.png';

const RootLanding: React.FC = (): React.ReactElement => {
	const { add } = useStore();
	const [randomId, setRandomId] = useState<number | undefined>(undefined);
	const [randomCountry, setRandomCountry] = useState<string | undefined>(undefined);
	const [randomVolcano, setRandomVolcano] = useState<string | undefined>(undefined);

	const imageOne = { name: AbuJapan, href: '/volcanoes/Japan/1' };
    const imageTwo = { name: OkatainaNZ, href: 'volcanoes/New%20Zealand/833' };

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
			add(num.toString(), new Array(volcano));
			setRandomCountry(volcano.country);
			setRandomVolcano(volcano.name);
			setRandomId(num);
		} else {
			const volcano = await fetchFromApi(`/volcano/${num}`);
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
		<div className='w-full flex flex-col items-center justify-center text-3xl font-semibold'>
			<div className='my-12 text-6xl font-bold self-center items-center'>
				<span className='text-xl font-normal italic'>Welcome to</span>
				<div className='text-vol-orange'>Volcano DB</div>
                {/*<div className='my-4 text-base font-normal'>Use the navigation above, or click to view details of a volcano below:</div>*/}
			</div>
        <div className='w-[50%] flex flex-col items-center justify-center '>
			<div className='w-[80%] flex flex-row justify-around space-x-12 items-center bg-vol-mantle rounded-md px-8'>
				<div className='my-12'>
					<ImageButton image={imageOne.name} href={imageOne.href} content={['Abu', 'Japan']} />
				</div>

				<div className='my-12'>
					<ImageButton image={imageTwo.name} href={imageTwo.href} content={['Okataina', 'New Zealand']} />
				</div>
            </div>
				<div className='mt-4 flex flex-col items-center justify-center text-2xl'>
					<div className='text-base font-normal'>
						{' '}
						<span>Or,</span> check out this randomly selected volcano in{' '}
						<span className='text-md font-semibold'> {randomCountry}</span>, named
					</div>
					<Link
						className='group text-vol-peach transition-all duration-200 hover:opacity-75 group-hover:text-vol-fawn'
						to={`/volcanoes/${randomCountry}/${randomId}`}
					>
						<span className='group mt-8 flex text-4xl  transition-all duration-200 group-hover:text-vol-fawn'>
							{randomVolcano}
						</span>{' '}
						<span className='group transition-all duration-200 group-hover:text-vol-fawn'></span>
					</Link>
				</div>
</div>
		</div>
	);
};

export default RootLanding;
