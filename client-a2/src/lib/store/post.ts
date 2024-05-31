import { API_URL } from '@/lib';

/**
 * Simple function to handle a POST request to a specific API endpoint ('`http://4.237.58.241:3000`')
 * @param endpoint - API endpoint specifier to make the POST request to, including the first forward slash (e.g, `/user/login`)
 * @param body - Data body of request
 * @returns The raw response from the endpoint
 */
export const postToApi = async (endpoint: string, body: BodyInit): Promise<void | Response> => {
	const url = `${API_URL}${endpoint}`;

	try {
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: body,
		});

		return response;
	} catch (err) {
		console.info('ERR =>', err);
	}
};
