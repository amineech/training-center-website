const express = require('express');

//create router object
const router  = express.Router();

//controller
const apropos = require('../controllers/apropos.js');

//get apropos page
router.get('/apropos', apropos.display_apropos);

module.exports = router;
