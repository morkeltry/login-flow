const pgp = require('pg-promise')();  // parametrises queries, prevents SQL injection - no worries :)

const url = require('url');
require ('env2')('./.env');           //path is relative to run directory, not this file.

const DB_URL = process.env.DATABASE_URL;

console.log('DB_URL',DB_URL);

let options;

if (!DB_URL) throw new Error('Enviroment variable DATABASE_URL must be set');

const params = url.parse(DB_URL);
const [username, password] = params.auth.split(':');

options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: username,
  password,
  ssl: params.hostname !== 'localhost'
};

module.exports = pgp(options);
