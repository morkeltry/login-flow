const home = (req, res) => {
 res.type('text/html');
 res.status(200);
 res.send('<p>Express default / route - not using static files for this route.</p>');
  // res.render('home', { params : {} });
}

module.exports = home;
