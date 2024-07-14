import { Knex } from 'knex'; // types
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const config: { [key: string]: Knex.Config } = {
    production: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 33060,

            // do not autocast dates so that javascript does not adjust timezone
            typeCast: (field: any, next: any) => {
                if (field.type === 'DATE') {
                    return field.string();
                }

                return next();
            }
        },
        migrations: {
            directory: './migrations'
        }
    },
};

export default config;
