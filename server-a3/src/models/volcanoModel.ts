import knexConf from '$db/knexfile';
import { restrictContent } from '$src/utils/filterRestrictedContent';
import { __VOLCANOES } from '$utils/constants';
import knexPkg from 'knex';
export const knex = knexPkg(knexConf.production);

export const Volcano = {
    getVolcanoDetails: async (id: number, auth: boolean) => {
        let rows;

        if (!auth) {
            const free = await restrictContent(
                'data',
                __VOLCANOES.COLS.RESTRICTED
            );

            [rows] = await knex('data').where({ id }).columns(free);
        } else {
            [rows] = await knex('data').where({ id }).select('*');
        }

        return rows;
    },
};
