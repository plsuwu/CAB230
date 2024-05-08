/**
 * Performs a fuzzy search on an array based on the specified query string. This function uses a basic scoring
 * system to sequentially metch items based on the aforementioned query; filters returned results that have a score
 * at least one point greater than the number of characters in a query minus one, and sorts in descending order.
 * @template T the type of elements in the data array
 * @param {string} query - string used to match against items in the data array
 * @param {T[]} data - an array of items to be searched.
 * @param {(item: T) => string} keyedItem - function accepting an item of type T, returning a string that can be used
 *          for searching.
 * @returns {T[]} an array of items that match the query based on each items' score
 */
export function fuzzySearch<T>(query: string, data: T[], keyedItem: (item: T) => string): T[] {
    query = query.toLowerCase();

    // scoring function called on each item
    const scoreItem = (item: T): number => {
        let score = 0;
        let queryIndex = 0;
        const lowerItem = keyedItem(item).toLowerCase(); // case insensitive

        // increment score for item based on number of sequential matching characters in query
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
        // filter items with increasing specificity proportional to query length minus one
        .filter(({ score }) => score > query.length - 1)
        .sort((a, b) => b.score - a.score)
        .map(({ item }) => item);
}
