const path = require('path');
const { queryFile } = require('pg-promise');
const db = require('./db_connection');

const sql = file => queryFile(path.join(__dirname, file), { minify: true });

const build = sql('./db_build.sql');

const runDbBuild = () => {
  console.log('attempt build');
  db
    .query (build)
    .then (res => {
      console.log('success');
      return true;
    })
    .catch (e => console.error('error', e));
}

runDbBuild();
