import { Request, Response, NextFunction } from 'express';
import { insertDynamic } from '$utils/insertDynamic';
import { ZodError } from 'zod';

// constructor class for the ServerError object
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
    // data is invalid
    if (err instanceof ZodError) {
        const message = err.errors[0].message; // parse the message attached by Zod

        // Zod should yield status 404 only if we are given a volcano id greater than
        // the number of volcanoes in the database (yield 400 from Zod in all other cases)
        const status = err.errors[0].code === 'too_big' ? 404 : 400;

        if (err.message.includes('{{dyn}}')) {

            // the error contains a message that should describe the problematic field
            const issue = err.errors[0].path[0]; // an array containing the invalid value

            let replaced;
            if (req.query[issue]) {

                // Zod return an error while validating a query param, so we insert that
                // into the message
                replaced = insertDynamic(message, req.query[issue] as string);
            } else {

                // Zod returned an error while validating a URL param;
                // cant access req.params from here, so we parse the problematic field
                // from the URL
                const params = req.url.split('/volcano/')[1];
                replaced = insertDynamic(message, params);
            }

            // return the parsed error with corrected status and message
            return res.status(status).json({ error: true, message: replaced });
        }

        // return the message directly from Zod with a res status 400
        return res.status(400).json({ error: true, message });
    }
    if (err instanceof ServerError) {

        // error thrown specifically from checked field, parse out the status and message into
        // a known response format
        return res.status(err.status).json({ error: true, message: err.message });
    }

    // not an intentional error, throw 500
    return res.status(500).json({ error: true, message: err.message }); // panic
};

// creation function for the custom error object
export const createServerError = (message: string, status: number) =>
    new ServerError(message, status);
