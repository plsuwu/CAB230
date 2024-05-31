import { NextFunction, Response } from 'express';
import { Volcano } from '$models/volcanoModel';
import { AuthenticatedRequest } from '$utils/generateJwt';
import { ServerError, createServerError } from '$src/middleware/errorHandler';
import { __VOLCANOID_VOLCANO_NOT_FOUND } from '$src/utils/constants';

export const getVolcanoById = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const auth = req.token;
        const { id } = req.params;
        const isLoggedIn = auth ? true : false;

        const volcano = await Volcano.getVolcanoDetails(
            Number(id),
            isLoggedIn
        );

        if (!volcano) {
            const e = createServerError(
                __VOLCANOID_VOLCANO_NOT_FOUND.message,
                __VOLCANOID_VOLCANO_NOT_FOUND.status
            );

            return res.status(e.status).json({ error: true, message: e.message });
        }

        return res.status(200).json(volcano);
    } catch (err: any) {
        console.error('[!]: Issue during volcano fetch: ', err);
        next(err);
    }
};
