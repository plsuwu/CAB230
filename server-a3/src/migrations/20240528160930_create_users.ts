import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary().unique();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('firstName');
        table.string('lastName');
        table.date('dateOfBirth');
        table.string('address');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
