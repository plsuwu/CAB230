import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { __JWT } from '$utils/constants';

// `AuthenticatedRequest` type as a child of express's `Request` type;
// used in routes that want to check for authorization handled in middleware
export interface AuthenticatedRequest extends Request {
    token?: any; // type doesn't really matter, moreso just the prescense of this field
}

// signs a JWT for a user's session
export const generateJwt = (email: string) => {
    const token = jwt.sign({ email }, __JWT.SECRET, {
        expiresIn: '24h',
    });

    return token;
};
