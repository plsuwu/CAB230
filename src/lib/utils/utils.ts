/**
 * Function that will delay program execution for a period of time.
 * @async
 * @param {number} ms - time to sleep in milliseconds
 * @returns {Promise<void>} program continues execution once this function resolves
 */
export const sleep = async (ms: number): Promise<void> => {
    return new Promise((r) => setTimeout(r, ms));
}

/**
 * evaluates which JSX element classes to use, based on the outcome of a ternery
 * @param {string[]} ...classes - rest parameter for an indefinite number of html element classNames strings
 * @returns {string} filtered array as a single string
 */
export function classNames(...classes: string[]): string {
	return classes.filter(Boolean).join(' ');
}
