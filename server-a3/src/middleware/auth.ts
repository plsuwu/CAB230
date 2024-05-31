import {
    __AUTH_JWT_MALFORMED,
    __AUTH_MALFORMED_BEARER,
    __AUTH_UNAUTHORIZED,
    __COMMON_JWT_EXPIRED,
    __JWT_SECRET,
} from '$utils/constants';
import { AuthenticatedRequest } from '$utils/generateJwt';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createServerError } from './errorHandler';

export const authenticateFull = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers['authorization'];
    if (!header) {
        const err = createServerError(
            __AUTH_UNAUTHORIZED.message,
            __AUTH_UNAUTHORIZED.status
        );

        return res
            .status(err.status)
            .json({ error: true, message: err.message });
    }

    if (!header.startsWith('Bearer ')) {
        const err = createServerError(
            __AUTH_MALFORMED_BEARER.message,
            __AUTH_MALFORMED_BEARER.status
        );

        return res
            .status(err.status)
            .json({ error: true, message: err.message });
    }

    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token, __JWT_SECRET);
        req.token = decoded;
        next();
    } catch (err: any) {
        next(err);
    }
};

export const authenticatePartial = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers['authorization'];

    if (header) {
        if (!header.startsWith('Bearer ')) {
            const err = createServerError(
                __AUTH_MALFORMED_BEARER.message,
                __AUTH_MALFORMED_BEARER.status
            );

            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }
        const token = header.split(' ')[1];
        try {
            const decoded = jwt.verify(token, __JWT_SECRET, (err, dec) => {
                if (err) {
                    const e = createServerError(
                        __AUTH_JWT_MALFORMED.message,
                        __AUTH_JWT_MALFORMED.status
                    );

                    next(e);
                }

                return dec;
            });

            req.token = decoded;
            const expiry = new Date(req.token * 1000);
            const now = new Date(Date.now());
            if (now > expiry) {
                const err = createServerError(
                    __COMMON_JWT_EXPIRED.message,
                    __COMMON_JWT_EXPIRED.status
                );
                return res
                    .status(err.status)
                    .json({ error: true, message: err.message });
            }

            next();
        } catch (err: any) {
            next(err);
        }
    } else {
        next();
    }
};
