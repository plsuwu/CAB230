import { API_URL } from '@/lib/index';

/**
 * Handles simple, unauthorized GET requests to an API endpoint ('`http://4.237.58.241:3000`')
 * @param endpoint - Endpoint to make the GET request to
 * @returns The response as a JSON object
 */
export const fetchFromApi = async (endpoint: string) => {
	const url = `${API_URL}${endpoint}`;
	try {
		const response = await fetch(url);
		return response.json();
	} catch (err) {
		console.log(`Err fetching from endpoint (@ ${url}) =>`, err);
	}
};


/**
 * @param endpoint - Endpoint to make the GET request to
 * @param token - An authenticated user's JWT token
 * @returns The response as a JSON object
 */
export const fetchFromApiWithAuth = async (endpoint: string, token: string) => {
	const url = `${API_URL}${endpoint}`;
	try {
		const response = await fetch(url,  {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json'
            }
        });
		return response.json();
	} catch (err) {
		console.log(`Err fetching from endpoint (@ ${url}) =>`, err);
	}
};
