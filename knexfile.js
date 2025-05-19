
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'docker',
      database: 'card_store',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations' // make sure your migrations go here
    },
    seeds: {
      directory: './seeds'
    }
  }
};