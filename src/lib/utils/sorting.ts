

/**
 * re-orders an array of strings into either ascending or descending order
 *
 * @param {string} currentOrder - currently set order (currently only 'a'/'ascending' || 'd'/'descending')
 * @param {string[]} orderOptions - array of available ordering options (also currently only `['a', 'd']`)
 * @param {string[]} countries - array of countries to sort
 * @returns {string[]} re-ordered `countries` array
 */
export const reOrder = (currentOrder: string, orderOptions: string[], countries: string[]): string[] => {
    let sorted: string[];

    // returns either `(a > b)` or `(a < b)`
    if (currentOrder === orderOptions[0]) {
        sorted = countries.sort((a, b) => (a > b ? -1 : 1));
    } else {
        sorted = countries.sort((a, b) => (a > b ? 1 : -1));
    }

    return sorted;
};

/**
 * fuzzy matching search function to handle typos/locale/etc.
 *
 * @template T - array element type
 * @param {string} query - string to search for in `data`
 * @param {T[]} data - array of items with type `T` to perform match operations on
 * @param {(item: T) => string} keyedItem - selector function to flatten desired fields in type `T` to a searchable string
 * @returns {T[]} a filtered copy of `data` based on each item's relevance to `query`
 */
export function fzf<T>(query: string, data: T[], keyedItem: (item: T) => string): T[] {
    query = query.toLowerCase();

    // scoring function called on each item
    const scoreItem = (item: T): number => {
        let score = 0;
        let queryIndex = 0;
        const lowerItem = keyedItem(item).toLowerCase(); // case insensitive

        // incr score for `item` based on number of sequential matching characters in `query`
        for (let i = 0; i < lowerItem.length && queryIndex < query.length; i++) {
            if (lowerItem[i] === query[queryIndex]) {
                score++;
                queryIndex++;
            }
        }

        return score;
    };

    return data
        .map((item) => ({ item, score: scoreItem(item) }))
        .filter(({ score }) => score > query.length - 1) // filter items with increasing specificity proportional to query length
        .sort((a, b) => b.score - a.score)
        .map(({ item }) => item); // i assume more efficient to use something other than a `map` here but fuck it we ball
}

/**
 * splits an array into pages (an array of arrays)
 *
 * @param {string[]} array - array of items to split into pages
 * @param {number} pageLength - number of pages to split `array` across
 * @returns {string[][]} an array containing nested arrays ('pages')
 */
export const paginate = (array: string[], pageLength?: number | undefined): string[][] => {
    if (!array || array.length < 1) {
        return [['No results']];
    }

    if (!pageLength) {
        pageLength = 13;
    }

    let finalPage = Math.max(0, Math.floor(array.length / pageLength));
    let paginatedCountries: string[][] = [];

    for (let i = 0; i < array.length / pageLength; ++i) {
        let page: string[] = array.slice(i * pageLength, i * pageLength + pageLength);
        paginatedCountries.push(page);
    }

    // create placeholder items to prevent layout shift if last page contains fewer elements
    // than the others
    let last: number = paginatedCountries[finalPage].length;
    let first: number = paginatedCountries[0].length;
    if (last < first) {
        // more efficient than push() ops in a `for` loop
        paginatedCountries[finalPage].length = first;
        paginatedCountries[finalPage].fill(' ', last, first);
    }

    return paginatedCountries;
};
