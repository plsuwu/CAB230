interface PayloadBody {
	token: string;
	token_type: string;
	expires_in: number;
}

export default async function storeToken(result: Response) {
	localStorage.clear();
	const body = await result.json();

	if (body) {
		const payload: PayloadBody = {
			token: body.token,
			token_type: body.token_type,
			expires_in: body.expires_in,
		};

		localStorage.setItem('SESSION', JSON.stringify(payload));
	}
}

export const parseTokenInfo = () => {
	const raw = localStorage.getItem('SESSION');
	if (raw) {
		try {
			const jwt: PayloadBody = JSON.parse(raw);
			if (jwt?.token && jwt?.expires_in && jwt?.token_type) {
				const decoded = JSON.parse(atob(jwt.token.split('.')[1]));
				if (decoded.exp) {
					const checkTokenExpired =
						new Date(decoded.exp * 1000).getTime() - new Date(Date.now()).getTime();
					if (checkTokenExpired < 0) {
                        console.error('expired token', jwt.token);
						return '';
					}

                    console.warn('found valid token');
					return jwt.token;
				}
			}
		} catch (err) {
			console.error('unable to parse jwt => ', err);
            return '';
		}
	}

    console.error('no token stored');
	return '';
};

// 2024-05-19T14:01:59.489Z
