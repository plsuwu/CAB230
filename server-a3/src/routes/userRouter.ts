import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '$controllers/userController';
import { authenticateFull, authenticatePartial } from '$middleware/auth';
import { validateBody, validateParams } from '$middleware/validate';
import { updateUserSchema, getUserSchema } from '$utils/zodSchema';

const router = Router();

router.get(
    '/:email/profile',
    authenticatePartial,
    validateParams(getUserSchema),
    getUserProfile
);
router.put(
    '/:email/profile',
    authenticateFull,
    validateBody(updateUserSchema),
    updateUserProfile
);

export default router;
