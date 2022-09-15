const express = require('express');

//create router object 
const router = express.Router();

//controller
const etudiants = require('../controllers/etudiants.js');

//get 'etudiants' page
router.get('/etudiants', etudiants.display_etudiants);

// ajouter etudiant
router.post('/etudiants-ajt', etudiants.ajouterEtudiant);

//modifier etudiant
router.post('/etudiants-mdf', etudiants.modifierEtudiant);

//supprimer etudiant 
router.post('/etudiants-sp', etudiants.supprimerEtudiant);

module.exports = router;