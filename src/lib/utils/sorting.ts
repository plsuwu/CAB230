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
