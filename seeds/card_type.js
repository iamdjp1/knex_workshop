/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('card_type').del();
  
  await knex('card_type').insert([
    {id: 1, type_name: 'Champion'},
    {id: 2, type_name: 'Regalia'},
    {id: 3, type_name: 'Action'},
    {id: 4, type_name: 'Ally'}
  ]);
};
