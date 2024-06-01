import { __AUTH, __GENERAL, __JWT } from '$utils/constants';
import { AuthenticatedRequest } from '$utils/generateJwt';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createServerError } from './errorHandler';


// for routes requiring authentication for any level of access
export const authenticateFull = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    // pull the Authorization header from the request
    const header = req.headers['authorization'];
    if (!header) {
        // no auth header in the request, return an error
        const err = createServerError(
            __AUTH.UNAUTHORIZED.message,
            __AUTH.UNAUTHORIZED.status
        );
        return res
            .status(err.status)
            .json({ error: true, message: err.message });
    }

    if (!header.startsWith('Bearer ')) {
        // incorrect header format (should be `Authorization: Bearer <JWT>`),
        // return an error
        const err = createServerError(
            __AUTH.HEADER.MALFORMED.BEARER.message,
            __AUTH.HEADER.MALFORMED.BEARER.status
        );
        return res
            .status(err.status)
            .json({ error: true, message: err.message });
    }

    // split the JWT from the token type
    const token = header.split(' ')[1];
    try {
        // unsign the token to verify its validity
        const decoded = jwt.verify(token, __JWT.SECRET);

        // bind to custom request field and call the next function
        req.token = decoded;
        next();
    } catch (err: any) {

        // call the error handler with the error contents
        next(err);
    }
};


// for routes that allow partial access/free content to unauthorized users
export const authenticatePartial = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {

    // pull the Authorization header from the request
    const header = req.headers['authorization'];

    // if there is a header, check its validity
    if (header) {
        if (!header.startsWith('Bearer ')) {
            // incorrect header format (should be `Authorization: Bearer <JWT>`),
            // return an error
            const err = createServerError(
                __AUTH.HEADER.MALFORMED.BEARER.message,
                __AUTH.HEADER.MALFORMED.BEARER.status
            );
            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        // split the JWT from the token type
        const token = header.split(' ')[1];
        try {
            const decoded = jwt.verify(token, __JWT.SECRET, (err, dec) => {
                if (err) {
                    // if we don't check for an error here, we throw a 500/generic server error as we aren't correctly
                    // handling it with our `errorHandler` middleware;
                    // so if there is a decode error, we push it to the `createServerError()` function with the required
                    // message so that we can call `next()` on the result and handle it as one of the expected error types
                    const e = createServerError(
                        __AUTH.HEADER.JWT.INVALID.message,
                        __AUTH.HEADER.JWT.INVALID.status
                    );

                    next(e);
                }

                return dec; // return the decoded result from the verify func to bind it to `decoded`.
            });

            req.token = decoded; // push the decoded/validated JWT to our token field
            // check that the JWT expires in the future
            const expiry = new Date(req.token * 1000);
            const now = new Date(Date.now());
            if (now > expiry) {
                // JWT is expired, return an error
                const err = createServerError(
                    __AUTH.HEADER.JWT.EXPIRED.message,
                    __AUTH.HEADER.JWT.EXPIRED.status
                );
                return res
                    .status(err.status)
                    .json({ error: true, message: err.message });
            }

            next();
        } catch (err: any) {

            // attempt to handle errors with the errorHandler
            next(err);
        }
    } else {

        // there is no Authorization header, call next without defining `req.token`
        next();
    }
};
