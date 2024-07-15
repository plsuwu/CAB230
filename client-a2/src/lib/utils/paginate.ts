/**
 * Divides an array of strings into a paginated 2D array, with each subarray representing a page of items.
 * If no items exist, returns an array containing a single page with "No results".
 * Optionally adjusts the number of items per page; defaults to 13 if not specified.
 *
 * @param {string[]} array - The array of strings to be paginated
 * @param {number} [pageLength=13] - The number of items per page; defaults to 13
 * @returns {string[][]} - A 2D array where each subarray contains the items for a specific page
 */
export const paginate = (array: string[], pageLength: number = 13): string[][] => {
    if (!array || array.length < 1) {
        return [['No results']];
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
        // more efficient than repeated push operations in a `for` loop
        paginatedCountries[finalPage].length = first;
        paginatedCountries[finalPage].fill(' ', last, first);
    }

    return paginatedCountries;
};
