import { API_URL } from '@/lib/index';

export const fetchFromApi = async (endpoint: string) => {
	const url = `${API_URL}${endpoint}`;
	try {
		const response = await fetch(url);
		return response.json();
	} catch (err) {
		console.log(`Err fetching from endpoint (@ ${url}) =>`, err);
	}
};


export const fetchFromApiWithAuth = async (endpoint: string, token: string) => {
	const url = `${API_URL}${endpoint}`;
	try {
		const response = await fetch(url,  {
            headers: {'Authorization': `Bearer ${token}`, 'accept': 'application/json'}
        });
		return response.json();
	} catch (err) {
		console.log(`Err fetching from endpoint (@ ${url}) =>`, err);
	}
};
