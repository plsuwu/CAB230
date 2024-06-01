import { Request, Response, NextFunction } from 'express';
import { createServerError } from '$src/middleware/errorHandler';
import { Volcanoes } from '$src/models/volcanoesModel';
import type { AuthenticatedRequest } from '$utils/generateJwt';

export const getVolcanoes = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {

        // pull the country and query params (if they exist)
        const { country, populatedWithin } = req.query;

        // offload db fetch to model
        const volcanoes = await Volcanoes.getVolcanoesList(
            country as string,
            populatedWithin as string,
        );

        // return the list of volcanoes
        return res.status(200).json(volcanoes);
    } catch (err) {
        console.error('[!]: Issue during volcanoes fetch: ', err);
        next(err);
    }
};
