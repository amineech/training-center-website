const express = require('express');

//create router object
const router = express.Router();

//controller
const modulesClient = require('../controllers/modules-client.js');

//get 'liste-modules' page
router.get('/liste-modules', modulesClient.display_listeModules);

//rechercher modules
router.post('/search-modules', modulesClient.rechercherModules); 

module.exports = router;