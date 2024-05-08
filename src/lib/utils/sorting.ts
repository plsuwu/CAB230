/**
 * Reorders an array based on the specified order options
 * @param {string} currentOrder - the order currently applied
 * @param {string[]} orderOptions - an array of ordrering options (this could be a boolean instead)
 * @param {string[]} countries - the array of items to be sorted
 * @returns {string[]} an array of country names, resorted depending on the previously applied sort
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
