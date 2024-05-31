import { Request, Response, NextFunction } from 'express';
import { Me } from '$src/models/meModel';

export const getStudentDetails = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
   try {
       const { name, student_number } = await Me.details();
        return res.status(200).json({ name, student_number });
   } catch (err) {

       console.error('[!]: Issue during student details fetch: ', err);
       next(err);
   }
};
