const express = require('express');

//create router object 
const router = express.Router();

//controller
const actualite = require('../controllers/actualite-client.js');

router.get('/liste-actualites', actualite.display_actualite);

module.exports = router;