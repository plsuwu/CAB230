interface PayloadBody {
    token: string;
    token_type: string;
    expires_in: number;
}

/**
 * Asynchronously stores JWT session information into local storage. Clears any existing locally stored
 * items before parsing a JSON object, constructing a token payload, and finally storing this JWT if a
 * non-null response was recieved.
 * @async
 * @param {Response} result - the response object recieved from an API request
 * @returns {Promise<void>} - A promise that resolves once the token is stored
 */
export default async function storeToken(result: Response): Promise<void> {
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

/**
 * Pulls a JWT from local storage and attempts to parse it to check for validity. If the token is expired
 * or unparsable, the respective error is logged and an empty string is returned. Otherwise, if the token
 * is valid, it is returned to the caller.
 * @returns {string} a valid token, or an empty string if there is no valid token available in local storage.
 */
export const parseTokenInfo = (): string => {
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

                    return jwt.token;
                }
            }
        } catch (err) {
            console.error('unable to parse jwt => ', err);
            return '';
        }
    }

    return '';
};
