import { Request, Response, NextFunction } from 'express';
import { User } from '$models/userModel';
import { AuthenticatedRequest } from '$src/utils/generateJwt';
import { createServerError } from '$src/middleware/errorHandler';
import {
    __AUTH,
    __USER,
    __FAVORITES,
} from '$src/utils/constants';
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

        if (!user) {

            // if the email is not associated with an account, return an error
            const err = createServerError(
                __USER.PROFILE.NOT_FOUND.message,
                __USER.PROFILE.NOT_FOUND.status
            );
            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        // load the user's favorites list in the model
        const favorites = await Favorites.load(email);

        if (country) {

            // if a request has a query, attempt to filter the array for elements containing
            // the query string - if no matches, return an empty array
            const filtered = favorites.filter((v) => v.country === country);
            return res.status(200).json(filtered);
        }

        // return the favorites list if there is no query param
        return res.status(200).json(favorites);

    } catch (err: any) {
        // log unhandled errors
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
        // pull the email and token from the request
        const token = req.token; // attached by middleware @ router
        const { email } = req.params;

        if (!token || token.email !== email) {
            // if there is no token or the token isnt for the requested account,
            // return an error (do not modify other user's accounts)
            const err = createServerError(
                __AUTH.HEADER.NO_BEARER.message,
                __AUTH.HEADER.NO_BEARER.status
            );
            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        // model handles DB query - should be validated by the auth middleware,
        // but we will double check that this account exists
        const user = await User.load(email);

        if (!user) {
            // if the email is not associated with an account, return an error
            const err = createServerError(
                __USER.PROFILE.NOT_FOUND.message,
                __USER.PROFILE.NOT_FOUND.status
            );
            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        // parse update intent
        const { action, id } = req.body;

        // offload to model
        if (action === 'add') {

            // add the volcano with the request ID to the user's favorites list
            const _result = await Favorites.add(email, id);

            return res
                .status(__FAVORITES.ADD.SUCCESS.status)
                .json({ message: __FAVORITES.ADD.SUCCESS.message, /* ...result */ });   // spread result into response?

        } else if (action === 'delete') {

            // remove the volcano with the request ID to the user's favorites list
            const _result = await Favorites.delete(email, id);
            return res
                .status(__FAVORITES.DELETE.SUCCESS.status)
                .json({ message: __FAVORITES.DELETE.SUCCESS.status, /* ...result */ });
        }
    } catch (err) {
        // log unhandled errors
        console.error('[!]: Issue during user detail update: ', err);
        next(err);
    }
};
