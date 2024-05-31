import { Request, Response, NextFunction } from 'express';
import { createServerError } from '$src/middleware/errorHandler';
import { Countries } from '$src/models/countryModel';

export const getCountries = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
   try {
        const countries = await Countries.getCountriesList();
        return res.status(200).json(countries);
   } catch (err) {

       console.error('[!]: Issue during register: ', err);
       next(err);
   }
};
