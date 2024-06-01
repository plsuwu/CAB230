import { NextFunction, Response } from 'express';
import { Volcano } from '$models/volcanoModel';
import { AuthenticatedRequest } from '$utils/generateJwt';
import { createServerError } from '$src/middleware/errorHandler';
import { __VOLCANO } from '$src/utils/constants';

export const getVolcanoById = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        // pull the token and requested volcano id from the request
        const token = req.token; // attached by middleware @ router
        const { id } = req.params;

        const isLoggedIn = token ? true : false; // describe user auth state

        // offload DB query to middleware with boolean describing the user's authentication state
        const volcano = await Volcano.getVolcanoDetails(Number(id), isLoggedIn);

        if (!volcano) {
            // the middleware did not return a result, return an error
            const e = createServerError(
                __VOLCANO.NOT_FOUND.message,
                __VOLCANO.NOT_FOUND.status
            );
            return res
                .status(e.status)
                .json({ error: true, message: e.message });
        }

        // return the volcano's details
        return res.status(200).json(volcano);
    } catch (err: any) {
        // log unhandled errors
        console.error('[!]: Issue during volcano fetch: ', err);
        next(err);
    }
};
