import { getStudentDetails } from '$src/controllers/meController';
import { Router } from 'express';
// import { getCountries } from '$controllers/countryController';
// import { countriesSchema } from '$src/utils/zodSchema';
// import { validateQuery } from '$src/middleware/validate';

const router = Router();

router.get('/', getStudentDetails);

export default router;

