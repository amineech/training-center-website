const express = require('express');

const router = express.Router();

//controller
const enseignantRech = require('../controllers/enseignant-rech.js');

//get 'liste-enseignants' page
router.get('/liste-enseignants', enseignantRech.display_listeEnseignant);

//search enseignant
router.post('/search-enseignants', enseignantRech.rechercherEnseignant);

module.exports = router;