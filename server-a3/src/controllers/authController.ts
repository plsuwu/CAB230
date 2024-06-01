import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateJwt } from '$utils/generateJwt';
import { User } from '$models/userModel';
import { createServerError } from '$src/middleware/errorHandler';
import {
    __AUTH_LOGIN_INCORRECT_FIELD,
    __AUTH_LOGIN_SUCCESS,
    __AUTH_PASSWORD_HASH_ROTS,
    __AUTH_REGISTER_USER_CREATED,
    __AUTH_REGISTER_USER_EXISTS,
} from '$utils/constants';

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const exists = await User.find(email);

        if (exists) {
            const err = createServerError(
                __AUTH_REGISTER_USER_EXISTS.message,
                __AUTH_REGISTER_USER_EXISTS.status
            );

            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        const hash = await bcrypt.hash(password, __AUTH_PASSWORD_HASH_ROTS);
        await User.create({
            email,
            password: hash,
        });

        return res
            .status(__AUTH_REGISTER_USER_CREATED.status)
            .json({ message: __AUTH_REGISTER_USER_CREATED.message });

    } catch (err) {
        console.error('[!]: Issue during register: ', err);
        next(err);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const user = await User.find(email);
        if (!user) {
            const err = createServerError(
                __AUTH_LOGIN_INCORRECT_FIELD.message,
                __AUTH_LOGIN_INCORRECT_FIELD.status
            );

            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            const err = createServerError(
                __AUTH_LOGIN_INCORRECT_FIELD.message,
                __AUTH_LOGIN_INCORRECT_FIELD.status
            );
            return res
                .status(err.status)
                .json({ error: true, message: err.message });
        }

        const token = generateJwt(user.email);
        return res.status(__AUTH_LOGIN_SUCCESS.status).json({
            token,
            token_type: __AUTH_LOGIN_SUCCESS.token_type,
            expires_in: __AUTH_LOGIN_SUCCESS.expires_in,
        });
    } catch (err) {
        console.error('[!]: Issue during login: ', err);
        next(err);
    }
};
