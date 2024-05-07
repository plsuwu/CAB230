import { API_URL } from '@/lib/index';

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
