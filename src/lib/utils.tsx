export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export async function getCountriesFromApi(): Promise<string[]> {
    const response = await fetch('http://4.237.58.241:3000/countries');
    if (response.ok) {
        return response.json();
    }
}
