import knexConf from '$db/knexfile';
import { __VOLCANOES_QUERY_COLUMNS } from '$utils/constants';
import { getColumnNames } from '$utils/getColumnNames';
import knexPkg from 'knex';
export const knex = knexPkg(knexConf.production);

export const Volcanoes = {
    getVolcanoesList: async (country: string, params?: string | undefined) => {
        let rows;

        if (params) {

            const populationColumn = 'population_' + params;
            rows = await knex('data')
                .where({ country })
                .where(populationColumn, '>', '0')
                .columns(__VOLCANOES_QUERY_COLUMNS);
        } else {

            rows = await knex('data')
                .where({ country })
                .columns(__VOLCANOES_QUERY_COLUMNS);
        }

        return rows;
    },
};
