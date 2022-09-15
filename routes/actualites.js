const express = require('express');

//create router object 
const router = express.Router();

//controller
const actualites = require('../controllers/actualites.js');

//get actualites page (admin side)
router.get('/actualites', actualites.display_actualite);

//ajouter 'actualite' 
router.post('/actualite-ajt', actualites.ajouteActualite);

//modifier 'actualite'
router.post('/actualite-mdf', actualites.modifierActualite);

//supprimer 'actualite'
router.post('/actualite-sp', actualites.supprimerActualite);


module.exports = router;