// simulates network delay
export const sleep = async (ms: number) => {
    return new Promise((r) => setTimeout(r, ms));
}

export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}
