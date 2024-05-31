import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

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
