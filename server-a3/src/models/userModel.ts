import knexConf from '$db/knexfile';
import { User as TypedUser } from '$src/types';
import { __USER } from '$utils/constants';
import { restrictContent } from '$utils/filterRestrictedContent';
import knexPkg from 'knex';
export const knex = knexPkg(knexConf.production);

export const User = {
    find: async (email: string) => {
        // find first user with matching email
        return knex('users').where({ email }).first();
    },

    create: async (user: { email: string; password: string }) => {
        // insert the user's email and password into the db
        const [newUser] = await knex('users').insert(user);
        return newUser;
    },

    load: async (email: string) => {
        // load the user's information, restricting the returned
        // fields from containing the user's password hash
        const restrict = await restrictContent(
            'users',
            __USER.PROFILE.COLS.PASSWD
        );

        const user = await knex('users')
            .where({ email })
            .first()
            .select(...restrict);

        return user;
    },

    update: async (details: TypedUser) => {
        // update user's row with specified details
        const { email, firstName, lastName, dateOfBirth, address } = details;
        await knex('users')
            .where({ email })
            .update({ firstName, lastName, dateOfBirth, address });

        return details;
    },
};
