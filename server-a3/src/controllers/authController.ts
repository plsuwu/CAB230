import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateJwt } from '$utils/generateJwt';
import { User } from '$models/userModel';
import { createServerError } from '$src/middleware/errorHandler';
import {
    __AUTH
} from '$utils/constants';

// Controller function for the `/user/register` endpoint
export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // pull the user's email and password from the request and check if a user is
        // registered with the email in the request
        const { email, password } = req.body;
        const exists = await User.find(email);

        if (exists) {
            // if the user exists, create and format error (shouldn't create an account
            // with the email of an existing user)
            const err = createServerError(
                __AUTH.REGISTER.EXISTS.message,
                __AUTH.REGISTER.EXISTS.status,
            );

            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        // hash the password and offload the email and hashed password to
        // the respective model so that the user's account can be created
        const hash = await bcrypt.hash(password, __AUTH.PASSWORD.HASHROT);
        await User.create({
            email,
            password: hash,
        });

        return res
            .status(__AUTH.REGISTER.SUCCESS.status)
            .json({ message: __AUTH.REGISTER.SUCCESS.message });

    } catch (err) {
        // log unhandled errors
        console.error('[!]: Issue during register: ', err);
        next(err);
    }
};

// Controller function for the `/user/login` endpoint
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        // pull the user's email and password from the request,
        // check for an existing account
        const { email, password } = req.body;
        const user = await User.find(email);

        if (!user) {
            // if the email is not associated with an account, throw an
            // error (cannot login to non-existent account)
            const err = createServerError(
                __AUTH.LOGIN.INCORRECT.message,
                __AUTH.LOGIN.INCORRECT.status
            );

            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        // hash the password in the request with the password in the database
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            // if the password hashes do not match, return an error (cannot login to account
            // with incorrect details)
            const err = createServerError(
                __AUTH.LOGIN.INCORRECT.message,
                __AUTH.LOGIN.INCORRECT.status
            );
            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        // generate a signed JWT and attach it to the response
        const token = generateJwt(user.email);
        return res.status(__AUTH.LOGIN.SUCCESS.status).json({
            token,
            token_type: __AUTH.LOGIN.SUCCESS.token_type,
            expires_in: __AUTH.LOGIN.SUCCESS.expires_in,
        });
    } catch (err) {
        // log unhandled errors
        console.error('[!]: Issue during login: ', err);
        next(err);
    }
};
