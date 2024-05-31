import { Request, Response, NextFunction } from 'express';
import { insertDynamic } from '$utils/insertDynamic';
import { ZodError } from 'zod';

export class ServerError {
    status: number;
    message: string;

    constructor(message: string, status: number) {
        this.message = message;
        this.status = status;
    }
}

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof ZodError) {
        const message = err.errors[0].message;
        const status = err.errors[0].code === 'too_big' ? 404 : 400;

        // does the error use dynamic content based on a query or params?
        if (err.message.includes('{{dyn}}')) {
            const issue = err.errors[0].path[0]; // an array containing the invalid value
            let replaced;

            // did Zod return an error while validating a query or a param?
            if (req.query[issue]) {
                replaced = insertDynamic(message, req.query[issue] as string);
            } else {

                // cant access req.params from here, so we split the URL instead
                const params = req.url.split('/volcano/')[1];
                replaced = insertDynamic(message, params);
            }

            return res.status(status).json({ error: true, message: replaced });
        }

        return res.status(400).json({ error: true, message });
    }
    if (err instanceof ServerError) {
        return res.status(err.status).json({ error: true, message: err.message });
    }

    return res.status(500).json({ error: true, message: err.message }); // panic
};

export const createServerError = (message: string, status: number) =>
    new ServerError(message, status);
