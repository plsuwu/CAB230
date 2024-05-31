import knexConf from '$db/knexfile';
import { restrictContent } from '$src/utils/filterRestrictedContent';
import { __VOLCANO_RESTRICTED_COLUMNS } from '$utils/constants';
import { getColumnNames } from '$utils/getColumnNames';
import knexPkg from 'knex';
export const knex = knexPkg(knexConf.production);

export const Volcano = {
    getVolcanoDetails: async (id: number, auth: boolean) => {
        let rows;

        if (!auth) {
            const free = await restrictContent(
                'data',
                __VOLCANO_RESTRICTED_COLUMNS
            );

            [rows] = await knex('data').where({ id }).columns(free);
        } else {
            [rows] = await knex('data').where({ id }).select('*');
        }

        return rows;
    },
};
