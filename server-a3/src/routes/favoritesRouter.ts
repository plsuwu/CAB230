import { Router } from 'express';
import { authenticateFull, authenticatePartial } from '$middleware/auth';
import { validateBody, validateParams, validateQuery } from '$middleware/validate';
import { updateUserSchema, getUserSchema, filterFavoritesSchema, updateFavoritesSchema } from '$utils/zodSchema';
import { getUserFavorites, updateUserFavorites } from '$src/controllers/favoritesController';

const router = Router();

router.get(
    '/:email',
    validateParams(getUserSchema),
    validateQuery(filterFavoritesSchema),
    getUserFavorites
);

router.post(
    '/:email',
    validateParams(getUserSchema),
    validateBody(updateFavoritesSchema),
    authenticateFull,
    updateUserFavorites
);

export default router;
