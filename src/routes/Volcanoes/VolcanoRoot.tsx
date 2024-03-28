import { useState, useEffect } from 'react';
import { mkGET } from '../../lib/mkGet';

// probably a reusable component

interface VolcanoData {
	id: number;
	name: string;
	country: string;
	region: string;
	subregion: string;
}

const VolcanoRoot: React.FC = (): React.ReactElement => {
	const [loading, setLoading] = useState(true);
	const [countriesData, setCountriesData] = useState<string[]>([]);
	const [volcanoData, setVolcanoData] = useState<VolcanoData[]>([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCountries = async (): Promise<void> => {
			try {
				const countries = await mkGET(`http://4.237.58.241:3000/countries`);
                console.log(countries)
				setCountriesData(countries);
				setError(null);
			} catch (err: any) {
                console.log(err);
				setError(err.message);
				setCountriesData([]);
			} finally {
                setLoading(false);
            }
		};

        fetchCountries();
	}, []);

	return (
		<div className=''>
			<div className='text-3xl font-semibold'>Volcanoes:</div>
			<div>
            {loading}, {error}
				{/* make this a table */}
                {countriesData.map((country) =>
                    <li> {country} </li>
                )}
			</div>
		</div>
	);
};

export default VolcanoRoot;
