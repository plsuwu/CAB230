// simulate network delay
export const sleep = async (ms: number) => {
    return new Promise((r) => setTimeout(r, ms));
}

/**
 * evaluates which JSX element classes to use based on the outcome of a ternery
 *
 * @param {string[]} ...classes - rest parameter for an indefinite number of html element classNames strings
 * @returns {string} - filtered `classes` array as a single a string
 */
export function classNames(...classes: string[]): string {
	return classes.filter(Boolean).join(' ');
}
