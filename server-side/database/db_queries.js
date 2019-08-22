const { query } = require('pg-promise');
const bcrypt = require('bcrypt');
const db = require('./db_connection');

const newUser = async (username, password) => {
  try {
    username = username.toLowerCase();
    const salt = await bcrypt.genSalt();
    const hashedPw = await bcrypt.hash (password, salt);
    console.log(salt,hashedPw);
    const insert = {
      text: "INSERT INTO users VALUES ($1, $2, $3, $4)",
      values: [ username, salt, hashedPw, Date.now() ]
    };
    const result = await db.query (insert);
    console.log('dbresult:',result);
    if (Array.isArray(result))
      return true;
  }
  catch (err) {
    console.log('500:',err);
  };
};

const userExists = async (username) => {
  try {
    username = username.toLowerCase();
    const lookupUser = {
      text: "SELECT username FROM users WHERE username = $1",
      values: [ username ]
    };
    const result = await db.query (lookupUser);
    return result.length ? result[0].username : null;
  }
  catch (err) {
    console.log('500:',err);
  };
}

const attemptLogin = async (username, password) => {
  try {
    username = username.toLowerCase();
    const lookupSalt = {
      text: "SELECT salt FROM users WHERE username = $1",
      values: [ username ]
    };
    const saltResult = await db.query (lookupSalt);
    console.log('Checking with salt:',saltResult);
    if (!saltResult.length)
      throw new Error('User not found');
    const hashedPw = await bcrypt.hash (password, saltResult[0].salt);
    console.log('hashes:',saltResult,hashedPw);
    const checkUserPw = {
      text: "SELECT salt FROM users WHERE username = $1 AND hashedPw = $2",
      values: [ username, hashedPw ]
    };
    const result = await db.query (checkUserPw);
    console.log('MATCH!');
    if (!result.length)
      throw new Error('User/password do not match');

    const updateLogin = {
      text: "UPDATE users SET lastLogin = $1 WHERE username = $2",
      values: [ Date.now(), username ]
    };
    if (result.length) {
      await db.query (updateLogin);
      return username;
    } else
    return null;
  }
  catch (err) {
    console.log('500:',err);
  };
};

module.exports = { newUser, attemptLogin, userExists };
