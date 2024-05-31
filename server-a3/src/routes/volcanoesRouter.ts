import { Router } from 'express';
import { getVolcanoes } from '$src/controllers/volcanoesController';
import { authenticatePartial } from '$middleware/auth';
import { validateQuery } from '$src/middleware/validate';
import { volcanoesSchema } from '$src/utils/zodSchema';

const router = Router();

router.get('/', authenticatePartial, validateQuery(volcanoesSchema), getVolcanoes);

export default router;
