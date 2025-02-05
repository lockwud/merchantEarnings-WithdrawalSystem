/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
// Earnings Table
.createTable('earnings', table => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('merchant_id').references('id').inTable('merchants').onDelete('CASCADE');
    table.uuid('order_id').references('id').inTable('orders').onDelete('CASCADE');
    table.decimal('amount', 10, 2).notNullable();
    table.boolean('is_withdrawn').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    // Ensuring unique earnings per merchant and order
    table.unique(['merchant_id', 'order_id']);
})


  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
       .dropTableIfExists('earnings');
  
};

