// Update with your config settings.
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 8080,
    user: 'postgres',
    password: 'docker',
    database: 'knexgen',
  },
});