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
        // more efficient than push ops in a `for` loop
        paginatedCountries[finalPage].length = first;
        paginatedCountries[finalPage].fill(' ', last, first);
    }

    return paginatedCountries;
};
