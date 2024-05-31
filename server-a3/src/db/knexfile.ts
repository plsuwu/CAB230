import { Knex } from 'knex'; // types
import dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
    production: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
    },
};

export default config;
