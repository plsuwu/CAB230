import { Request, Response, NextFunction } from 'express';
import { Me } from '$src/models/meModel';

export const getStudentDetails = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // loaded from dotenv
        const { name, student_number } = await Me.load();
        return res.status(200).json({ name, student_number });
    } catch (err) {
        // log unhandled errors
        console.error('[!]: Issue during student details fetch: ', err);
        next(err);
    }
};
