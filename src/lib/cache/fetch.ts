const apiUrl = 'http://4.237.58.241:3000'

export async function fetchFromApi(endpoint: string) {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    const data = await response.json();

    return data;
}
