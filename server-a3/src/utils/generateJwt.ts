import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { __JWT_SECRET } from './constants';

export interface AuthenticatedRequest extends Request {
    token?: any;
}

export const generateJwt = (email: string) => {
    const token = jwt.sign({ email }, __JWT_SECRET, {
        expiresIn: '24h',
    });

    return token;
};
