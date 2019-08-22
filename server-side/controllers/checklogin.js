const queries = require ('../database/db_queries');

const isLoggedIn = (req, res) => {
  // if has good jwt on request:
  // Yup
  //if has submitted username / pw and they check out,
  // yup
 res.type('text/html');
 res.status(200);
 res.send('<p>Express default / route - not using static files for this route.</p>');
  // res.render('home', { params : {} });
}

console.log(queries);

module.exports = isLoggedIn;
