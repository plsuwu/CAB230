import { Country, Volcano } from './types';

/*       replace with API responses      */

export const countries: Country[] = ['Japan', 'New Zealand', 'United States', 'Chile'];
export const volcanoes: Volcano[] = [
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
