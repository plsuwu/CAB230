import dotenv from 'dotenv';
dotenv.config();

// quick reference for the constants (e.g, error handler messages, env vars, etc.)

export const __ME = {
    STUDENT: {
        NAME: process.env.STUDENT_NAME as string,
        NUM: process.env.STUDENT_NUM as string,
    },
};

export const __JWT = {
    SECRET: process.env.JWT_SECRET as string,
};

export const __SERVER = {
    FILEPATH: {
        CERT: process.env.CERT_FILE as string,
        KEY: process.env.KEY_FILE as string,
    },

    PORT: 8080,
    URL: 'https://localhost:8080',
};

export const __VOLCANO = {
    NOT_FOUND: {
        message: 'Volcano with ID: {{dyn}} not found.',
        status: 404,
    },
};

export const __USER = {
    PROFILE: {
        COLS: {
            NO_AUTH: ['address'],
            PASSWD: ['password'],
        },
        NOT_FOUND: {
            message: 'User not found',
            status: 404,
        },
        UPDATE: {
            NONSTRING: {
                message:
                    'Request body invalid: firstName, lastName and address must be strings only.',
                status: 400,
            },
            INCOMPLETE: {
                message:
                    'Request body incomplete: firstName, lastName, dob and address are required.',
                status: 400,
            },
            INVALID_DOB: {
                FORMAT: {
                    message:
                        'Invalid input: dob must be a real date in format YYYY-MM-DD.',
                    status: 400,
                },
                IN_FUTURE: {
                    message: 'Invalid input: dob must be a date in the past.',
                    status: 400,
                },
            },
        },
    },
};

export const __FAVORITES = {
    ADD: {
        EXISTS: {
            message:
                "Cannot add volcano with ID '{{dyn}}': Volcano already in this user's favorites.",
            status: 400,
        },
        SUCCESS: {
            message: 'Volcano added to favorites:',
            status: 201,
        },
    },
    DELETE: {
        NOT_EXISTS: {
            message:
                "Cannot delete volcano with ID '{{dyn}}': Volcano not in this user's favorites.",
            status: 404,
        },
        SUCCESS: {
            message: 'Volcano deleted from favorites:',
            status: 200,
        },
    },
};

export const __AUTH = {
    UNAUTHORIZED: {
        message: 'Unauthorized',
        status: 401,
    },
    FORBIDDEN: {
        message: 'Forbidden',
        status: 403,
    },
    HEADER: {
        NO_BEARER: {
            message: "Authorization header ('Bearer token') not found",
            status: 401,
        },
        JWT: {
            INVALID: {
                message: 'Invalid JWT token', // json web token token...
                status: 401,
            },
            EXPIRED: {
                message: 'JWT token has expired.',
                status: 401,
            },
        },
        MALFORMED: {
            BEARER: {
                message: 'Authorization header is malformed',
                status: 401,
            },
        },
    },
    PASSWORD: {
        HASHROT: 10,
    },
    REGISTER: {
        EXISTS: {
            message: 'User already exists',
            status: 409,
        },
        SUCCESS: {
            message: 'User created.',
            status: 201,
        },
    },
    LOGIN: {
        INCORRECT: {
            message: 'Incorrect email or password',
            status: 401,
        },
        SUCCESS: {
            token_type: 'Bearer',
            expires_in: 86400, // 24 hours in seconds
            status: 200,
        },
    },
};

export const __GENERAL = {
    INVALID: {
        QUERY: {
            message:
                'Invalid query parameters. Query parameters are not permitted.',
            status: 400,
        },
    },
    INCOMPLETE: {
        BODY: {
            message:
                'Request body incomplete, both email and password are required',
            status: 400,
        },
    },
};

export const __VOLCANOES = {
    MISSING: {
        COUNTRY: {
            message: 'Country is a required query parameter',
            status: 400,
        },
    },
    INVALID: {
        POP_WITHIN: {
            message:
                'Invalid value for populatedWithin: {{dyn}}. Only: 5km,10km,30km,100km are permitted',
            status: 400,
        },
        QUERY: {
            message:
                'Invalid query parameters. Only country and populatedWithin are permitted.',
            status: 400,
        },
    },
    COLS: {
        POP_WITHIN: ['5km', '10km', '30km', '100km'],
        MULTIVIEW: ['id', 'name', 'country', 'region', 'subregion'],
        RESTRICTED: [
            'population_5km',
            'population_10km',
            'population_30km',
            'population_100km',
        ],
    },
};
