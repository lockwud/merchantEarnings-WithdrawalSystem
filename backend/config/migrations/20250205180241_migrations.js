/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        // Merchants Table
        .createTable('merchants', table => {
            table.uuid('id').primary().defaultTo(knex.fn.uuid());
            table.string('name').notNullable();
            table.decimal('earnings', 10, 2).notNullable().defaultTo(0.00);
            table.timestamp('deleted_at').nullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('merchants');
};
