
require ('env2')('./.env');           //path is relative to run directory, not this file.
const db = require ('../database/db_queries');


const addUser = async (req, res) => {

  console.log(req.query);
  if (!req.query.username || !req.query.password) {
   res.type('text/html');
   res.status(200);
   res.send('<p>Query format is: ?username=<i>username</i>&password=<i>password</i></p>');
   // res.send('<p>Query format is: ?username=<i>username</i>&password=<i>hash of (session ID.concat(password))</i></p>');
  }

  else {
    const exists = await db.userExists (req.query.username);
    console.log('USER EXISTS?',exists);
    if (exists) {
     res.type('text/html');
     res.status(200);
     res.send('<h1>Sorry - that username is taken!</h1>');
     return
   };
    const result = await db.newUser (req.query.username, req.query.password);
    console.log('NewUser result:',result);



  res.type('text/html');
  res.status(200);
  if (result)
    res.send(`<h3>Welcome to the site, ${req.query.username}.</h3>`);
  else
    res.send('<h4>Hmm... something went wrong.<h4>');
  }
}

module.exports = addUser;
