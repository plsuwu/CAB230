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
} from '$src/utils/constants';
import { cleanDateOfBirth } from '$src/utils/dateOfBirthCleaner';
import { nullEmptyFields } from '$src/utils/nullEmptyFields';

export const getUserProfile = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.token;
        const { email } = req.params;
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

        // no token attached to the request or details do not match params in url of the request
        if (!token || token.email !== email) {
            const { firstName, lastName } = user;
            return res.status(200).json({ email, firstName, lastName });
        }
        const { firstName, lastName, dateOfBirth, address } = user;

        // success
        return res.status(200).json({
            email,
            firstName,
            lastName,
            dob: dateOfBirth,
            address,
        });
    } catch (err: any) {
        // unhandled error
        console.error('[!]: Issue during volcano fetch: ', err);
        next(err);
    }
};

export const updateUserProfile = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        // const validated = zod
        const token = req.token;
        const { email } = req.params;

        // user does not have a token attached to the request
        if (!token) {
            const err = createServerError(
                __AUTH_HEADER_BEARER_NOT_FOUND.message,
                __AUTH_HEADER_BEARER_NOT_FOUND.status
            );

            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        // user's details do not match the params in url of the request
        if (token.email !== email) {
            const err = createServerError(
                __AUTH_FORBIDDEN.message,
                __AUTH_FORBIDDEN.status,
            );

            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

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

        const { firstName, lastName, dob, address } = req.body;
        const dateOfBirth = dob; // post data uses 'dob', database uses 'dateOfBirth'

        const nulled = nullEmptyFields({
            email,
            firstName,
            lastName,
            dateOfBirth,
            address,
        });

        const updated = await User.update(nulled);

        // success - return null fields
        return res.status(200).json({
            email,
            firstName: updated.firstName,
            lastName: updated.lastName,
            dob: updated.dateOfBirth,
            address: updated.address,
        });
    } catch (err) {
        // unhandled error
        console.error('[!]: Issue during user detail update: ', err);
        next(err);
    }
};
