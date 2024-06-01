import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('favorites', function(table) {
        table.increments('id').primary().unique();
        table.string('email').notNullable();
        table.integer('volcano').notNullable();

        table.foreign('email').references('users.email');
        table.foreign('volcano').references('data.id');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('favorites');
}

