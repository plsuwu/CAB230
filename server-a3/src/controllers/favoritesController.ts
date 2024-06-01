import { Request, Response, NextFunction } from 'express';
import { User } from '$models/userModel';
import { AuthenticatedRequest } from '$src/utils/generateJwt';
import { createServerError } from '$src/middleware/errorHandler';
import {
    __AUTH_FORBIDDEN,
    __AUTH_HEADER_BEARER_NOT_FOUND,
    __AUTH_UNAUTHORIZED,
    __USER_PROFILE_COLUMNS_PASSWORD,
    __USER_PROFILE_USER_NOT_FOUND,
    __FAVORITES_ADD_SUCCESS,
    __FAVORITES_DEL_SUCCESS,
} from '$src/utils/constants';
import { cleanDateOfBirth } from '$src/utils/dateOfBirthCleaner';
import { nullEmptyFields } from '$src/utils/nullEmptyFields';
import { Favorites } from '$src/models/favoritesModel';

export const getUserFavorites = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.params;
        const { country } = req.query;

        const user = await User.load(email);

        // requested user does not exist
        if (!user) {
            const err = createServerError(
                __USER_PROFILE_USER_NOT_FOUND.message,
                __USER_PROFILE_USER_NOT_FOUND.status
            );

            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        const favorites = await Favorites.load(email);

        if (country) {
            const filtered = favorites.filter((v) => v.country === country);
            return res.status(200).json(filtered);
        }

        return res.status(200).json(favorites);

        // success
    } catch (err: any) {
        // unhandled error
        console.error('[!]: Issue during volcano fetch: ', err);
        next(err);
    }
};

export const updateUserFavorites = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        // const validated = zod
        const token = req.token;
        const { email } = req.params;

        // // user does not have a token attached to the request
        // if (!token || token.email !== email) {
        //     const err = createServerError(
        //         __AUTH_HEADER_BEARER_NOT_FOUND.message,
        //         __AUTH_HEADER_BEARER_NOT_FOUND.status
        //     );
        //     return res
        //         .status(err.status)
        //         .json({ error: true, message: err.message });
        // }

        const user = await User.load(email);

        // user does not exist
        if (!user) {
            const err = createServerError(
                __USER_PROFILE_USER_NOT_FOUND.message,
                __USER_PROFILE_USER_NOT_FOUND.status
            );

            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        const { action, id }  = req.body;

        if (action === 'add') {
            const result = await Favorites.add(email, id);
            return res.status(__FAVORITES_ADD_SUCCESS.status).json({ message: __FAVORITES_ADD_SUCCESS.message, ...result  });
        } else if (action === 'delete') {
            const result = await Favorites.delete(email, id);
            return res.status(__FAVORITES_DEL_SUCCESS.status).json({ message: result });
        }

        // const updated = await User.update(nulled);
        //
        // // success - return null fields
        // return res.status(200).json({
        //     email,
        //     firstName: updated.firstName,
        //     lastName: updated.lastName,
        //     dob: updated.dateOfBirth,
        //     address: updated.address,
        // });
    } catch (err) {
        // unhandled error
        console.error('[!]: Issue during user detail update: ', err);
        next(err);
    }
};
