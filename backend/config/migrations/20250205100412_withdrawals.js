/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    // Withdrawals Table
.createTable('withdrawals', table => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('merchant_id').references('id').inTable('merchants').onDelete('CASCADE');
    table.decimal('amount', 10, 2).notNullable();
    table.enum('status', ['pending', 'completed', 'failed']).defaultTo('pending');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
});
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
       .dropTableIfExists('withdrawals');
  
};
