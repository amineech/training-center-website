const express = require('express');

//controller
const enseignants = require('../controllers/enseignants.js');

//create router object
const router = express.Router();


//get 'enseignants' to enseignants page
router.get('/enseignants', enseignants.display_enseignants);

//ajouter 'enseignant'
router.post('/enseignants-ajt', enseignants.ajouterEnseignant);

//modifier 'enseignant'
router.post('/enseignants-mdf', enseignants.modifierEnseignant);

//supprimer 'enseignant'
router.post('/enseignants-sp', enseignants.supprimerEnseignant);

module.exports = router;