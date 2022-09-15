const express = require('express');

//crete router object
const router = express.Router();

//controller
const etudiantClient = require('../controllers/etudiant-client.js');

//get demande page(espace etudiant)
router.get('/espace-etudiant', etudiantClient.display_espaceEtudiant);

//send 'demande' to admnistration
router.post('/envoie-demande', etudiantClient.sendDemande);

//get 'mes demandes' page
router.get('/mesdemandes/:code', etudiantClient.display_mesdemandes);

//get 'mes cours' page
router.get('/mesdocuments/:filiere/:annee', etudiantClient.display_mescours);

//download 'document' from 'mescours' page
router.get('/download-document/:document', etudiantClient.downloadDocument);

module.exports = router;