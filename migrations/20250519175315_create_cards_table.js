/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('cards', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('card_type_id')
         .unsigned()
         .references('id')
         .inTable('card_type')
         .onDelete('CASCADE'); // optional: deletes associated cards if type is deleted
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cards');
};
