const express = require('express');


//create router object
const router = express.Router();

//controller
const home = require('../controllers/home.js');

//get' homepage
router.get('/', home.display_home);

module.exports = router;