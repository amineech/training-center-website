const express = require('express');

//create router object
const router = express.Router();

//controller
const demandes = require('../controllers/demandes.js');

//get 'demandes' admin side
router.get('/demandes', demandes.display_demandes);

//delete a 'Demande' from 'demandes' page in admin side
router.post('/delete-demande', demandes.supprimeDemande);

//change status of 'demande'
router.post('/recuperation-date', demandes.changeStatus);

module.exports = router;