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
        const { country, populatedWithin } = req.query;
        const volcanoes = await Volcanoes.getVolcanoesList(
            country as string,
            populatedWithin as string,
        );

        return res.status(200).json(volcanoes);
    } catch (err) {
        console.error('[!]: Issue during register: ', err);
        next(err);
    }
};
