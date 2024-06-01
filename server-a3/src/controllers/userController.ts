import { Response, NextFunction } from 'express';
import { User } from '$models/userModel';
import { AuthenticatedRequest } from '$src/utils/generateJwt';
import { createServerError } from '$src/middleware/errorHandler';
import {
    __AUTH, __USER
} from '$src/utils/constants';
import { nullEmptyFields } from '$src/utils/nullEmptyFields';

export const getUserProfile = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {

        // pull the token and email from the request
        const token = req.token; // attached by middleware @ router
        const { email } = req.params;

        // load the account from the model
        const user = await User.load(email);

        if (!user) {

            // if the email is not associated with an account, return an error
            const err = createServerError(
                __USER.PROFILE.NOT_FOUND.message,
                __USER.PROFILE.NOT_FOUND.status,
            );
            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        // if there is no token or the token isnt for the requested account,
        // return unauthenticated profile information (do not display sensitive info)
        if (!token || token.email !== email) {

            const { firstName, lastName } = user;
            return res.status(200).json({ email, firstName, lastName });
        }

        // return all fields for the authenticated user
        const { firstName, lastName, dateOfBirth, address } = user;

        return res.status(200).json({
            email,
            firstName,
            lastName,
            dob: dateOfBirth,
            address,
        });
    } catch (err: any) {
        // log unhandled error
        console.error('[!]: Issue during user detail fetch: ', err);
        next(err);
    }
};

export const updateUserProfile = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {

        // pull the token and email from the request
        const token = req.token; // attached by middleware @ router
        const { email } = req.params;

        if (!token) {
            // user does not have a token attached to the request, so we return an
            // error
            const err = createServerError(
                __AUTH.HEADER.NO_BEARER.message,
                __AUTH.HEADER.NO_BEARER.status,
            );
            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        if (token.email !== email) {
            // user's details do not match the params in url of the request, so we
            // return an error
            const err = createServerError(
                __AUTH.FORBIDDEN.message,
                __AUTH.FORBIDDEN.status,
            );
            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        // load the user's account
        const user = await User.load(email);

        if (!user) {
            // user does not exist, return an error
            const err = createServerError(
                __USER.PROFILE.NOT_FOUND.message,
                __USER.PROFILE.NOT_FOUND.status,
            );
            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        // parse the request data body for required information
        const { firstName, lastName, dob, address } = req.body;
        const dateOfBirth = dob; // post data uses 'dob', database uses 'dateOfBirth'

        // make sure empty fields are not just empty strings/undefined, but contain
        // a true null type
        const nulled = nullEmptyFields({
            email,
            firstName,
            lastName,
            dateOfBirth,
            address,
        });

        // offload data to the model to update user information in the DB
        const updated = await User.update(nulled);

        // success - return the nulled fields as confirmation
        return res.status(200).json({
            email,
            firstName: updated.firstName,
            lastName: updated.lastName,
            dob: updated.dateOfBirth,
            address: updated.address,
        });
    } catch (err) {
        // log unhandled errors
        console.error('[!]: Issue during user detail update: ', err);
        next(err);
    }
};
