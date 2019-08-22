const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const router = require('./controllers/index');

const app = express();

app.set('port', process.env.PORT || 5000);

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(router);

module.exports = app;
