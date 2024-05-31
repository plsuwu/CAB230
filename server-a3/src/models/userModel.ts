import knexConf from '$db/knexfile';
import { User as TypedUser, FullUser } from '$src/types';
import {
    __USER_PROFILE_COLUMNS_PASSWORD,
    __USER_PROFILE_COLUMNS_UNAUTHORIZED,
} from '$utils/constants';
import { restrictContent } from '$utils/filterRestrictedContent';
import knexPkg from 'knex';
export const knex = knexPkg(knexConf.production);

export const User = {
    findByEmail: async (email: string) => {
        return knex('users').where({ email }).first();
    },

    create: async (user: { email: string; password: string }) => {
        const [newUser] = await knex('users').insert(user).returning('*');
        return newUser;
    },

    load: async (email: string) => {
        const restrict = await restrictContent(
            'users',
            __USER_PROFILE_COLUMNS_PASSWORD
        );
        const user = await knex('users')
            .where({ email })
            .first()
            .select(
                ...restrict,
                knex.raw('cast(dateOfBirth as char) as dateOfBirth')
            );

        // console.log(user);
        return user;
    },

    update: async (details: TypedUser) => {
        const { email, firstName, lastName, dateOfBirth, address } = details;
        await knex('users')
            .where({ email })
            .update({ firstName, lastName, dateOfBirth, address })
            .returning('*');

        return details;
    },
};
