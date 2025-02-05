/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
     // Orders Table
     return knex.schema
        // Create orders table with foreign key referencing merchants table
        // CASCADE deletes the corresponding merchant when an order is deleted from the orders table
     .createTable('orders', table => {
      table.uuid('id').primary().defaultTo(knex.fn.uuid());
      table.uuid('merchant_id').references('id').inTable('merchants').onDelete('CASCADE');
        table.decimal('total_amount', 10, 2).notNullable();
        table.enum('status', ['pending', 'completed', 'canceled']).defaultTo('pending');
        table.timestamp('created_at').defaultTo(knex.fn.now());
     })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
     return knex.schema
        .dropTableIfExists('orders');
  
};




