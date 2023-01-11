import knex from "knex";
const conectionknex = require("../../knexfile")

export const connection = knex(conectionknex);
