import knexConf from '$db/knexfile';
import {
    __VOLCANOES
} from '$utils/constants';
import knexPkg from 'knex';
export const knex = knexPkg(knexConf.production);

export const Volcanoes = {
    getVolcanoesList: async (country: string, params?: string | undefined) => {
        let rows;

        if (params) {
            // if there is a query param passed in the function call, load volcanoes and
            // their necessary cols matching that param specification
            const populationColumn = 'population_' + params;
            rows = await knex('data')
                .where({ country })
                .where(populationColumn, '>', '0')
                .columns(__VOLCANOES.COLS.MULTIVIEW);
        } else {

            // no query params, load all required volcanoes and the necessary cols
            rows = await knex('data')
                .where({ country })
                .columns(__VOLCANOES.COLS.MULTIVIEW);
        }

        return rows;
    },
};
