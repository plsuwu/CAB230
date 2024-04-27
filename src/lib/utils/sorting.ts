import { Page } from '../types.ts';

type SearchResult = {
	item: string;
	score: number;
};

export const handleSwapOrder = (
	currentOrder: string,
	orderOptions: string[],
	countries: string[]
): string[] => {
	let newOrder = '';
	currentOrder === orderOptions[0] ?
		(newOrder = orderOptions[1])
	:	(newOrder = orderOptions[0]);

	let sorted: string[];
	if (currentOrder === orderOptions[0]) {
		sorted = countries.sort((a, b) => (a > b ? -1 : 1));
	} else {
		sorted = countries.sort((a, b) => (a > b ? 1 : -1));
	}
	return sorted;
};

export function fzf<T>(query: string, data: T[], keyedItem: (item: T) => string): T[] {
	query = query.toLowerCase();

	const scoreItem = (item: T): number => {
		let score = 0;
		let queryIndex = 0;
		// const lowerItem = item.toLowerCase();
        const lowerItem = keyedItem(item).toLowerCase();

		for (
			let i = 0;
			i < lowerItem.length && queryIndex < query.length;
			i++
		) {
			if (lowerItem[i] === query[queryIndex]) {
				score++;
				queryIndex++;
			}
		}

		return score;
	};

	return data
		.map((item) => ({ item, score: scoreItem(item) }))
		.filter(({ score }) => score > query.length - 1)
		.sort((a, b) => b.score - a.score)
		.map(({ item }) => item);
}

export const paginate = (array: string[], currentPage: number, pageLength: number): string[][] => {
	if (!array || array.length < 1) {
		return [['No results :(']];
	}

	// let pageLength = 10; // pass this as a param when working
	let finalPage = Math.max(0, Math.floor(array.length / pageLength));
	let paginatedCountries: string[][] = [];

	for (let i = 0; i < array.length / pageLength; ++i) {
		let page: string[] = array.slice(
			i * pageLength,
			i * pageLength + pageLength
		);
		paginatedCountries.push(page);
	}

	// pad out the last page with empty strings to match other pages to stop huge layout
	// shift when changing pages
	let last: number = paginatedCountries[finalPage].length;
	let first: number = paginatedCountries[0].length;
	if (last < first) {
		for (let i = last - 1; i < first - 1; ++i) {
			paginatedCountries[finalPage].push(' ');
		}
	}

	return paginatedCountries;
};
