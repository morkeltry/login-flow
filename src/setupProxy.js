const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/checklogin', { target: 'http://localhost:5000/' }));
  app.use(proxy('/signup', { target: 'http://localhost:5000/' }));
};
