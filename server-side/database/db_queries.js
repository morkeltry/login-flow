const { query } = require('pg-promise');
const bcrypt = require('bcrypt');
const db = require('./db_connection');

const newUser = async (username, password) => {
  try {
    username = username.toLowerCase();
    const salt = await bcrypt.genSalt();
    const hashedPw = await bcrypt.hash (password, salt);
    const insert = {
      text: "INSERT INTO users VALUES ($1, $2, $3, $4, $5)",
      values: [ username, salt, hashedPw, Date.now() ]
    };
    return db.query (insert);
  }
  catch (err) {
    console.log('500:',err);
  };
};

const attemptLogin = async (username, password) => {
  try {
    username = username.toLowerCase();
    const lookupSalt = {
      text: "SELECT salt FROM users WHERE username EQUALS $1",
      values: [ username ]
    };
    const saltResult = await db.query (lookupSalt);
    if (!saltResult.rows.length)
      throw new Error('User not found');
    const hashedPw = await bcrypt.hash (password, saltResult.rows[0].salt);
    const checkUserPw = {
      text: "SELECT salt FROM users WHERE username EQUALS $1 AND hashedPw EQUALS $2 ",
      values: [ username, hashedPw ]
    };
    const result = await db.query (checkUserPw);
    if (!result.rows.length)
      throw new Error('User/password do not match');

    const updateLogin = {
      text: "INSERT INTO users (lastLogin) VALUES ($1)",
      values: [ Date.now() ]
    };
    if (!result.rows.length) {
      db.query (updateLogin);
      return result.rows[0].username;
    }
    return null;
  }
  catch (err) {
    console.log('500:',err);
  };
};

module.exports = { newUser, attemptLogin };
