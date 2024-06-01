import knexConf from '$db/knexfile';
import { createServerError } from '$src/middleware/errorHandler';
import { insertDynamic } from '$src/utils/insertDynamic';
import {
    __AUTH, __FAVORITES
} from '$utils/constants';
import knexPkg from 'knex';
export const knex = knexPkg(knexConf.production);

export const Favorites = {
    load: async (email: string, _query?: string) => { // this works without indicating the query to knex and i dont remember why

        // do a join from the 'data' table based on favorites.volcano - references foreign key `data.id`
        const favorites = await knex('favorites').join('data', 'favorites.volcano', '=', 'data.id')
            .where('favorites.email', email)
            .select('data.id', 'data.name', 'data.country');

        return favorites;
    },

    add: async (email: string, volcano: number) => {

        const [check] = await knex('favorites').where({ email, volcano });

        if (check) {
            // if the volcano exists in the user's favorites, return an error
            const msg = insertDynamic(__FAVORITES.ADD.EXISTS.message, volcano.toString());
            const err = createServerError(
                msg,
                __FAVORITES.ADD.EXISTS.status,
            );

            return err;
        }

        // return the added volcano name (ignore mysql does not support `.returning()`; just return some value).
        const added = await knex('favorites').insert({ email, volcano }).returning('name');
        return added;
    },

    delete: async (email: string, volcano: number) => {
        const [check] = await knex('favorites').where({ email, volcano });

        if (!check) {

            // if the volcano does not exist in the user's favorites, return an error
            const message = insertDynamic(__FAVORITES.DELETE.NOT_EXISTS.message, volcano.toString());
            const err = createServerError(
                message,
                __FAVORITES.DELETE.NOT_EXISTS.status,
            );

            return err;
        }

        // return all cols updated in favorites (ignore mysql does not support `.returning()`; just return some value).
        const deleted = await knex('favorites').where({ email, volcano }).del().returning('*');
        return deleted;
    },
};
