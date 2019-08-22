const path = require('path');
const { QueryFile } = require('pg-promise');
const db = require('./db_connection');

console.log(QueryFile);

const sql = file => new QueryFile(path.join(__dirname, file), { minify: true });

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
