const apiUrl = 'http://4.237.58.241:3000'

export async function fetchFromApi(endpoint: string) {
    const url = `${apiUrl}${endpoint}`;

    console.log('requesting data from endpoint @', url);

    const response = await fetch(url);
    const data = await response.json();

    return data;
}
