import knexConf from '$db/knexfile';
import knexPkg from 'knex';
export const knex = knexPkg(knexConf.production);

export interface CountryRow {
    country: string;
}

export const Countries = {
    load: async () => {
        // db query
        const rows = await knex('data')
            .distinct('country')
            .orderBy('country', 'asc');

        // map the raw knex response (individual rows) to a single array
        const countries = rows
            .map((c: CountryRow) => c.country);

        return countries;
    },
};
