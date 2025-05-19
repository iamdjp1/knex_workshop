/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cards').del();

  // Inserts seed entries (referencing card_type_id from card_type.js)
 await knex('cards').insert([
  { id: 1, name: 'Merlin, Kingslayer', card_type_id: 1 }, // Champion
  { id: 2, name: 'Quicksilver Grail', card_type_id: 2 },  // Regalia
  { id: 3, name: 'Heated Vengeance', card_type_id: 3 },   // Action
  { id: 4, name: 'Frostsworn Paladin', card_type_id: 4 }  // Ally
]);

};