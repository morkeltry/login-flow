const express = require('express');
const path = require('path');
const router = express.Router();

const isLoggedIn = require('./checklogin');
const addUser = require('./adduser');
const home = require('./home');

router.get('/checklogin', isLoggedIn);
router.get('/signup', addUser);
// /checklogin is intended to be refactored out to be an aPI route returning JSON
// I would then add a welcome user page whcih consults that route in both frontend and backend
// so that no meaningful content is served to no-logged in users, and the HTMl of the welcome user
// page redirects to /

module.exports = router;
