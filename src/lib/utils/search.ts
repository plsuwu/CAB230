/**
 * fuzzy matching search function - provides better search handling compared to exact equality checking (typos/differing locales/etc).
 *
 * @template T - array element type
 * @param {string} query - string to search for in `data`
 * @param {T[]} data - array of items with type `T` to perform match operations on
 * @param {(item: T) => string} keyedItem - selector function to flatten desired fields in type `T` to a searchable string
 * @returns {T[]} a filtered copy of `data` based on each item's relevance to `query`
 */
export function fuzzySearch<T>(query: string, data: T[], keyedItem: (item: T) => string): T[] {
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
