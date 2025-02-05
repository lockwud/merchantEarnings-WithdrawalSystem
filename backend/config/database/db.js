const knex = require("knex")
const knexFile = require("../../config/knexfile");

const env = process.env.NODE_ENV || "development";
const config = knexFile[env];

const db = knex(config);

module.exports = db;