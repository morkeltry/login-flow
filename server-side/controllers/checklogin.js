const jwt = require ('jsonwebtoken');
const cookieParser = require ('cookie-parser');
require ('env2')('./.env');
const db = require ('../database/db_queries');

const JWT_SECRET = process.env.JWT_SECRET;

let session = {};
let jwtCookie;

// Unfortunately, I have run out of time to complete this test.
// The plan here was to reafctor this page to be an API route which simply returns
// session = {  loggedIn, session } and jwt = jwt( {session, exp} )
// Other auth route pages can then consult this route from the frontend to decide whether to redirect
// and the Express erver can consult it from the backend to decide whether to serve content.


const isLoggedIn = async (req, res) => {
  const cookies = {};
  (req.headers.cookie)
    .split('; ')
    .map (str =>  str.split(/=(.+)/))
    .forEach (pair => { cookies[pair[0]] = pair[1] });

  console.log('COOKIE!:',cookies)
  if (cookies.jwt) {
    try {
      const claims = await jwt.verify(cookies.jwt, JWT_SECRET)
        .then ( (claims)=> {
          jwtCookie = cookies.jwt;
          console.log('GWT from ',jwtCookie,':', claims);
          session = {
            loggedIn: claims.loggedIn,
            session: claims.session
          };
        });
    }
    catch (err) {
      console.log('NUP :P');
    }
  }

  console.log(req.query);
  if (!session.loggedIn && (!req.query.username || !req.query.password)) {
      res.type('text/html');
      res.status(200);
      res.send('<p>Query format is: ?username=<i>username</i>&password=<i>password</i></p>');
      // re .send('<p>Query format is: ?username=<i>username</i>&password=<i>hash of (session ID.concat(password))</i></p>');
    }

    else {
      if (!session.loggedIn)  {
        console.log('Attempting login');
        const dbResponse = await db.attemptLogin (req.query.username, req.query.password);
        session = {
            loggedIn: dbResponse.username,
            session: dbResponse.loginTime
          };
        console.log(session);
        jwtCookie = await jwt.sign(session, JWT_SECRET, { expiresIn: 3600 } );
      }

       res.type('text/html')
         .status(200)
         .cookie('jwt', jwtCookie)
         .send(`<h1>Logged in as ${session.loggedIn} </h1><h2>Enjoy the site</h2>`)
         .send(`<p>Enjoyed it? May as well log out then!</p>`)
         .end();
      }
}

module.exports = isLoggedIn;
