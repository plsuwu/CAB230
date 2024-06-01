import { getStudentDetails } from '$src/controllers/meController';
import { Router } from 'express';

const router = Router();

router.get('/', getStudentDetails);

export default router;

