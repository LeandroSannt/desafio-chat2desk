import type { Knex } from "knex";
import path from 'path'
// Update with your config settings.

module.exports = {
  client: "pg",
  connection: {
    database: "desafio",
    user: "postgres",
    password: "postgres",
    port:5442
  },
  migrations: {
    extension:'ts',
      tableName: "knex_migrations",
      directory:"./migrations"
  },
} as Knex.Config;
