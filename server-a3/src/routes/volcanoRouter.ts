import { Router } from 'express';
import { getVolcanoById } from '$controllers/volcanoController';
import { authenticatePartial } from '$middleware/auth';
import { validateParams } from '$src/middleware/validate';
import { volcanoIdSchema } from '$src/utils/zodSchema';

const router = Router();

router.get('/:id', authenticatePartial, validateParams(volcanoIdSchema), getVolcanoById);

export default router;
