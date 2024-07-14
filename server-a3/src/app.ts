import 'module-alias/register'; // reference important directories with `$directory` specifier
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import _ from 'lodash';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerConfig from '$src/swagger.json';
import customSwaggerConfig from '$src/custom-endpoints.json';
import authRouter from '$routes/authRouter';
import userRouter from '$routes/userRouter';
import meRouter from '$routes/meRouter';
import volcanoesRouter from '$routes/volcanoesRouter';
import volcanoRouter from '$routes/volcanoRouter';
import favoritesRouter from '$routes/favoritesRouter';

import countryRouter from '$routes/countryRouter';
import { errorHandler } from '$middleware/errorHandler';
import { __SERVER } from '$utils/constants';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// merge defs for custom endpoint config with example config
const swaggerConfigMerged = _.merge({}, swaggerConfig, customSwaggerConfig);

const swaggerOpts = {
    swaggerDefinition: swaggerConfigMerged,
    servers: [{ url: __SERVER.URL }],
    apis: ['./src/routes/**/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOpts);

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocs));
app.use('/user', authRouter);
app.use('/user', userRouter);
app.use('/favorites', favoritesRouter);
app.use('/me', meRouter);
app.use('/volcano', volcanoRouter);
app.use('/volcanoes', volcanoesRouter);
app.use('/countries', countryRouter);

app.use(errorHandler);

export default app
