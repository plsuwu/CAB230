import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('users', function(table) {

        // user favorite volcanoes - should be a volcano in the db
        table.integer('favorites');
        table.foreign('favorites').references('id').inTable('data');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('users', function(table){
        table.dropForeign('favorites');
        table.dropColumn('favorites');
    });
}

