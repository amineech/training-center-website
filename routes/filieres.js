const express = require('express');

// create router object
let router = express.Router();

//controller
const filieres = require('../controllers/filieres.js');

//get 'filieres' page
router.get('/filieres', filieres.display_filieres);

//ajouter 'filiere'
router.post('/filieres-ajt', filieres.ajouterFiliere);

//modifier'filiere'
router.post('/filieres-mdf', filieres.modifierFiliere);

//supprimer 'filiere' 
router.post('/filieres-sp', filieres.supprimerFiliere);


module.exports = router;