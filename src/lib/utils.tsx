// simulates network delay
export const sleep = (ms: number) => {
    new Promise((r) => setTimeout(r, ms));
}

export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}
