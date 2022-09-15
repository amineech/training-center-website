const express = require('express');

//create router object
const router = express.Router();

//controller
const modules = require('../controllers/modules.js');

//get modules to /modules page
router.get('/modules', modules.display_modules);

// ajouter 'module'
router.post('/modules-ajt', modules.ajouterModule);

//modifier 'module'
router.post('/modules-mdf', modules.modifierModule);

//supprimer 'module'
router.post('/modules-sp', modules.supprimerModule);


module.exports = router;
