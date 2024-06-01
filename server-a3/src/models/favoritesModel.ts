import knexConf from '$db/knexfile';
import { createServerError } from '$src/middleware/errorHandler';
import { User as TypedUser, FullUser } from '$src/types';
import { insertDynamic } from '$src/utils/insertDynamic';
import {
    __USER_PROFILE_COLUMNS_PASSWORD,
    __USER_PROFILE_COLUMNS_UNAUTHORIZED,
    __FAVORITES_DEL_NOT_EXISTS,
    __FAVORITES_ADD_EXISTS,
} from '$utils/constants';
import { restrictContent } from '$utils/filterRestrictedContent';
import knexPkg from 'knex';
export const knex = knexPkg(knexConf.production);

export const Favorites = {
    load: async (email: string, query?: string) => {

        const favorites = await knex('favorites').join('data', 'favorites.volcano', '=', 'data.id')
            .where('favorites.email', email)
            .select('data.id', 'data.name', 'data.country');

        return favorites;
    },

    add: async (email: string, volcano: number) => {
        const [check] = await knex('favorites').where({ email, volcano });

        if (check) {
            console.log(check);
            const msg = insertDynamic(__FAVORITES_ADD_EXISTS.message, volcano.toString());
            const err = createServerError(
                msg,
                __FAVORITES_ADD_EXISTS.status,
            );

            return err;
        }

        const _added = await knex('favorites').insert({ email, volcano }).returning('name');
        return await Favorites.load(email);
    },

    delete: async (email: string, volcano: number) => {
        const [check] = await knex('favorites').where({ email, volcano });

        if (!check) {
            console.log(check);
            const message = insertDynamic(__FAVORITES_DEL_NOT_EXISTS.message, volcano.toString());
            const err = createServerError(
                message,
                __FAVORITES_DEL_NOT_EXISTS.status,
            );

            return err;
        }

        const deleted = await knex('favorites').where({ email, volcano }).del().returning('*');
        return deleted;
    },
};
