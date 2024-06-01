import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

// Zod validator for input from a request's body
export const validateBody =
    (schema: ZodSchema) =>
        (req: Request, _res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (err) {
                next(err);
            }
        };

// Zod validator for input from a request's query params
export const validateQuery =
    (schema: ZodSchema) =>
        (req: Request, _res: Response, next: NextFunction) => {
            try {
                schema.parse(req.query);
                next();
            } catch (err: any) {
                next(err);
            }
        };

// Zod validator for input from a request's url params
export const validateParams =
    (schema: ZodSchema) =>
        (req: Request, _res: Response, next: NextFunction) => {
            try {
                schema.parse(req.params);
                next();
            } catch (err: any) {
                next(err);
            }
        };
