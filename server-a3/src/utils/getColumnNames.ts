import knexConf from '$db/knexfile';
import knexPkg from 'knex';
export const knex = knexPkg(knexConf.production);

// given a table, extract its column schema from the DB
export const getColumnNames = async (table: string) => {

    const schema = await knex('information_schema.columns')
        .where('table_name', table)
        .select('column_name');

    return schema;
};
