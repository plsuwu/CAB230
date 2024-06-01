import dotenv from 'dotenv';

dotenv.config();

export const __ME_STUDENT_NAME = process.env.STUDENT_NAME as string;
export const __ME_STUDENT_NUM = process.env.STUDENT_NUMBER as string;

export const __JWT_SECRET = process.env.JWT_SECRET as string;
export const __SERVER_FILEPATH_CERT = process.env.CERT_FILE as string;
export const __SERVER_FILEPATH_KEY = process.env.KEY_FILE as string;
export const __SERVER_PORT = 3000;
export const __SERVER_URL = 'http://localhost:3000';

export const __VOLCANOID_VOLCANO_NOT_FOUND = {
    message: 'Volcano with ID: {{dyn}} not found.',
    status: 404,
};

export const __USER_PROFILE_COLUMNS_UNAUTHORIZED = [
    'address',
]
export const __USER_PROFILE_USER_NOT_FOUND = {
    message: 'User not found',
    status: 404,
};
export const __USER_PROFILE_COLUMNS_PASSWORD = ['password'];
export const __COMMON_JWT_EXPIRED = {
    message: 'JWT token has expired.',
    status: 401,
}

export const __AUTH_UNAUTHORIZED = {
    message: 'Unauthorized',
    status: 401,
};

export const __AUTH_FORBIDDEN = {
    message: 'Forbidden',
    status: 403,
};

export const __AUTH_HEADER_BEARER_NOT_FOUND = {
    message: "Authorization header ('Bearer token') not found",
    status: 401,
}

export const __AUTH_MALFORMED_BEARER = {
    message: 'Authorization header is malformed',
    status: 401,
};

export const __AUTH_JWT_MALFORMED = {
    message: 'Invalid JWT token', // json web token token...
    status: 401,
};

export const __AUTH_PASSWORD_HASH_ROTS = 10;
export const __AUTH_INCOMPLETE_BODY = {
    message: 'Request body incomplete, both email and password are required',
    status: 400,
};

export const __AUTH_REGISTER_USER_CREATED = {
    message: 'User created.',
    status: 201,
};

export const __AUTH_REGISTER_USER_EXISTS = {
    message: 'User already exists',
    status: 409,
};

export const __AUTH_LOGIN_INCORRECT_FIELD = {
    message: 'Incorrect email or password',
    status: 401,
};

export const __AUTH_LOGIN_SUCCESS = {
    token_type: 'Bearer',
    expires_in: 86400, // 24 hours in seconds
    status: 200,
};
export const __COMMON_INVALID_QUERY_PARAM = {
    message: 'Invalid query parameters. Query parameters are not permitted.',
    status: 400,
};

export const __FAVORITES_ADD_EXISTS = {
    message: "Cannot add volcano with ID '{{dyn}}': Volcano already in this user's favorites.",
    status: 400,
}

export const __FAVORITES_DEL_NOT_EXISTS = {
    message: "Cannot delete volcano with ID '{{dyn}}': Volcano not in this user's favorites.",
    status: 404,
};

export const __FAVORITES_ADD_SUCCESS = {
    message: "Volcano added to favorites:",
    status: 201,
};

export const __FAVORITES_DEL_SUCCESS = {
    message: "Volcano removed from favorites.",
    status: 200,
};

export const __PROFILE_UPDATE_REQUEST_STRING_ONLY = {
    message: "Request body invalid: firstName, lastName and address must be strings only.",
    status: 400,
}

export const __PROFILE_UPDATE_REQUEST_INCOMPLETE = {
    message: "Request body incomplete: firstName, lastName, dob and address are required.",
    status: 400,
}

export const __PROFILE_UPDATE_REQUEST_DOB_FUTURE_DATE = {
    message: "Invalid input: dob must be a date in the past.",
    status: 400,
}

export const __PROFILE_UPDATE_REQUEST_DOB_INVALID_DATE = {
    message: "Invalid input: dob must be a real date in format YYYY-MM-DD.",
    status: 400,
}


export const __VOLCANOES_MISSING_PARAM = {
    message: 'Country is a required query parameter',
    status: 400,
};

export const __VOLCANOES_POPULATED_WITHIN_INVALID = {
    status: 400,
    message:
        'Invalid value for populatedWithin: {{dyn}}. Only: 5km,10km,30km,100km are permitted',
};

export const __VOLCANOES_INVALID_QUERY_PARAM = {
    message:
        'Invalid query parameters. Only country and populatedWithin are permitted.',
    status: 400,
};

export const __VOLCANOES_POPULATED_WITHIN_PARAMS = [
    '5km',
    '10km',
    '30km',
    '100km',
];

export const __VOLCANOES_QUERY_COLUMNS = [
    'id',
    'name',
    'country',
    'region',
    'subregion',
];

export const __VOLCANO_RESTRICTED_COLUMNS = [
    'population_5km',
    'population_10km',
    'population_30km',
    'population_100km',
];
