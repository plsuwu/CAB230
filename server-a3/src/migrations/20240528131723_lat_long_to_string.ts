import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {

    await knex.schema.table('data', function(table) {
        table.string('latitude_temp');
        table.string('longitude_temp');
    });

    await knex.raw(`
        update data
        set latitude_temp = format(latitude, 4),
            longitude_temp = format(longitude, 4)
    `);

    await knex.schema.table('data', function(table) {
        table.dropColumn('latitude');
        table.dropColumn('longitude');
    });

    await knex.schema.table('data', function(table) {
        table.renameColumn('latitude_temp', 'latitude');
        table.renameColumn('longitude_temp', 'longitude');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('data', function(table) {
        table.float('latitude_temp');
        table.float('longitude_temp');
    });

    await knex.raw(`
        update data
        set latitude_temp = cast(latitude as decimal(10,4)),
            longitude_temp = cast(longitude as decimal(10,4))
    `);

    await knex.schema.table('data', function(table) {
        table.dropColumn('latitude');
        table.dropColumn('longitude');
    });

    await knex.schema.table('data', function(table) {
        table.renameColumn('latitude_temp', 'latitude');
        table.renameColumn('longitude_temp', 'longitude');
    });

}
