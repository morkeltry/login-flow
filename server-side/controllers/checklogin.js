const jwt = require ('jsonwebtoken');
const cookieParser = require ('cookie-parser');
require ('env2')('./.env');
const db = require ('../database/db_queries');

const JWT_SECRET = process.env.JWT_SECRET;

const isLoggedIn = async (req, res) => {
  const cookies = {};
  (req.headers.cookie)
    .split('; ')
    .map (str =>  str.split(/=(.+)/))
    .forEach (pair => { cookies[pair[0]] = pair[1] });

  console.log('COOKIE!:',cookies)
  if (cookies.jwt) {
    try {
      const deets = await jwt.verify(cookies.jwt, JWT_SECRET)
        // .then ( (deets)=> {
          console.log('GWT from JWT:', deets);
      return deets

        // });
    }
    catch (err) {
      console.log('NUP :P');
    }
  }

  console.log(req.query);
  if (!req.query.username || !req.query.password) {
   res.type('text/html');
   res.status(200);
   res.send('<p>Query format is: ?username=<i>username</i>&password=<i>password</i></p>');
   // res.send('<p>Query format is: ?username=<i>username</i>&password=<i>hash of (session ID.concat(password))</i></p>');
  }

  else {
    console.log('Attempting login');
    const loggedInUser = await db.attemptLogin (req.query.username, req.query.password);
    console.log(loggedInUser);



   res.type('text/html');
   res.status(200);
   res.send('<h1>Login route.</h1>');
    // res.render('home', { params : {} });
  }
}

module.exports = isLoggedIn;
