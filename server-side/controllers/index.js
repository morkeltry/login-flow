const express = require('express');
const path = require('path');
const router = express.Router();

const isLoggedIn = require('./checklogin');
const home = require('./home');

router.get('/checklogin', isLoggedIn);
router.get('/', home);
router.get('/welcome', home);

module.exports = router;
