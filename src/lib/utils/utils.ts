// simulate network delay
export const sleep = async (ms: number) => {
    return new Promise((r) => setTimeout(r, ms));
}

// evaluates a ternery and merges the resulting `className` definition with any static definitions
export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}
