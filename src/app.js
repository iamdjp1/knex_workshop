const express = require('express');
const { fetchAutocomplete, fetchCardsByType, getCardsWithType } = require('../queries'); // adjust path as needed
const knex = require('knex')(require('../knexfile').development);

const app = express();
const PORT = 8080;

const localCards = [];
app.use(express.json());

// GET: External cards by card_type
app.get('/cards', async (req, res) => {
    const { external } = req.query;

    try {
        if (external === 'true') {
            const data = await fetchCardsByType(req.query.card_type);
            res.json(data);
        } else {
            const cards = await getCardsWithType();
            res.json(cards);
        }
    } catch (err) {
        res.status(500).send('Error fetching cards');
    }
});

// GET: External autocomplete
app.get('/autocomplete', async (req, res) => {
    const { name } = req.query;
    if (!name) return res.status(400).send('name is required');

    try {
        const data = await fetchAutocomplete(name);
        res.json(data);
    } catch (err) {
        res.status(500).send('Error fetching autocomplete');
    }
});

// CRUD: In-memory localCards
app.post('/cards', async (req, res) => {
      console.log("Received POST:", req.body);
    const { name, card_type_id } = req.body;
    try {
        const [newCard] = await knex('cards').insert({ name, card_type_id }).returning('*');
        res.status(201).json(newCard);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting card');
    }
});

app.put('/local-cards/:id', (req, res) => {
    const { id } = req.params;
    const index = localCards.findIndex(card => card.id == id);
    if (index === -1) return res.status(404).send('Card not found');
    localCards[index] = { ...localCards[index], ...req.body };
    res.json(localCards[index]);
});

app.delete('/cards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await knex('cards').where({ id }).del();
        if (deleted) {
            res.json({ message: `Card ${id} deleted.` });
        } else {
            res.status(404).json({ error: 'Card not found.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete card.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// let myKnexQuery = knex("states").select({state_bird:"American Robin"});
// console.log(myKnexQuery) 

// function getAllStatesWithBird(birdName){ // helper function, returns chain of knex logic
//   return knex.select()
//   .from("states")
//   .where( { state_bird:birdName } );
// }

// app.get('/states/:birdName', function(req, res) { // GET route
//   getAllStatesWithBird(req.params.birdName) // returns knex logic, i.e. a Promise
//     .then(data => res.status(200).json(data)) // can still use .then()
//     .catch(err => // can alsostill use .catch()
//       res.status(404).json({
//         message:
//           'The state bird data is not available'
//       })
//     );
// });

// knex.select('*').from('states').where({state_bird: "American Robin"});
// knex.select().from("states").where({state_bird:"American Robin"});
// knex.select().from('states').where('state_bird','American Robin');
// knex.select().from("states").where("state_bird","American Robin");
// knex("states").select({state_bird:"American Robin"});
// knex('states').select({state_bird:'American Robin'});
// knex("states").select("state_bird","American Robin");
// knex('states').select('state_bird','American Robin');
// knex('states').select().where({state_bird:"American Robin"});
// knex('states').select("*").where({state_bird:"American Robin"});
// knex("states").where({state_bird:"American Robin"});
// knex("states").where("state_bird","American Robin");
// knex('states').where({state_bird:'American Robin'});
// knex('states').where('state_bird','American Robin');