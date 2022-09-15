const express = require('express');

//create router object
const router = express.Router();


//controller
const associations = require('../controllers/associations.js');

//get /modules/associations page
router.get('/associations', associations.display_associations);

//ajouter association
router.post('/association-ajt', associations.ajouterAssociation);

//supprimer association
router.post('/association-sp', associations.supprimerAssociation);

module.exports = router;