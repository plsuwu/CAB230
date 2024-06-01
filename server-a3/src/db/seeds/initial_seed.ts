import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

    // seed some example users -> users seeding only works on a clean db
    await knex('users').del();      // delete existing entries
    await knex('users').insert([    // insert seeded users
        {
            id: 1,
            email: 'pls@plsuwu.com',
            password:
                '$2b$10$1TWhyv/pKSD/GsAuQm7sNeeW7o59T7i.fa2DAnHAgjkiTZ1QFEyR6',
            firstName: 'pls',
            lastName: 'uwu',
            dateOfBirth: '1900-01-01',
            address: '2 George St, Brisbane City',
        },
        {
            id: 2,
            email: 'mike@gmail.com',
            password:
                '$2y$10$2bSjD79EPHpqQkcVivqHfONPIWsk3eh8LH7mQt5rXItWLwYGKSnTC',
            firstName: 'Michael',
            lastName: 'Jordan',
            dateOfBirth: '1963-02-17',
            address: '123 Fake Street, Springfield',
        },
    ]);

    // seed some stuff for favorites
    await knex('favorites').del();
    await knex('favorites').insert([
        {
            id: 1,
            email: 'pls@plsuwu.com',
            volcano: 1,
        },
        {
            id: 2,
            email: 'pls@plsuwu.com',
            volcano: 423,
        },
    ]);
}
