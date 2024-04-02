import { VolcanoData } from './types';

export const countries: string[] = ['Japan', 'New Zealand', 'United States', 'Chile']; // replace with API data
export const volcanoes: VolcanoData[] = [
	{
		id: 1,
		name: 'Abu',
		country: 'Japan',
		region: 'Japan, Taiwan, Marianas',
		subregion: 'Honshu',
	},
	{
		id: 3,
		name: 'Antillanca Volcanic Complex',
		country: 'Chile',
		region: 'South America',
		subregion: 'Central Chile and Argentina',
	},
	{
		id: 21,
		name: 'Adams',
		country: 'United States',
		region: 'Canada and Western USA',
		subregion: 'USA (Washington)',
	},
	{
		id: 42,
		name: 'Brothers',
		country: 'New Zealand',
		region: 'New Zealand to Fiji',
		subregion: 'New Zealand',
	},
];
