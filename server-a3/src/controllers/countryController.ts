import { Request, Response, NextFunction } from 'express';
import { createServerError } from '$src/middleware/errorHandler';
import { Countries } from '$src/models/countryModel';

export const getCountries = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // call the countries model and return the query result
        const countries = await Countries.load();
        return res.status(200).json(countries);
    } catch (err) {
        // log unhandled errors
        console.error('[!]: Issue during countries fetch:', err);
        next(err);
    }
};
