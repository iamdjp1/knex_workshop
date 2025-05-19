const fetch = require('node-fetch');
const knex = require('knex')(require('./knexfile').development);

// Fetch from GATCG Autocomplete
async function fetchAutocomplete(name) {
  const response = await fetch(`https://api.gatcg.com/cards/autocomplete?name=${encodeURIComponent(name)}`, {
    headers: { Accept: '*/*' },
  });
  return await response.json();
}

// Fetch by card type
async function fetchCardsByType(cardType) {
  const response = await fetch(`https://api.gatcg.com/cards?card_type=${encodeURIComponent(cardType)}`, {
    headers: { Accept: '*/*' },
  });
  return await response.json();
}

async function getCardsWithType() {
  return await knex('cards')
    .join('card_type', 'cards.card_type_id', 'card_type.id')
    .select(
      'cards.id',
      'cards.name',
      'card_type.type_name as type'
    );
}


module.exports = {
  fetchAutocomplete,
  fetchCardsByType,
  getCardsWithType
};
