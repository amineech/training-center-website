const express = require('express');



//create router bject
const router = express.Router();

//controller
const enseignantClient = require('../controllers/enseignant-client.js');

//get 'espace-enseignant' page
router.get('/espace-enseignant', enseignantClient.display_espaceEnseignant);

//ajouter document
router.post('/ajt-document', enseignantClient.ajouterDocument);

//get 'mes documents' page
router.get('/documents/:code', enseignantClient.display_mesdocuments);

//delete a 'document'
router.post('/supprimer-doc', enseignantClient.deleteDocument);

//download 'document' from 'mesdocuments' page
router.get('/download/:document', enseignantClient.downloadDocument);

//display 'enseignant' demande page
router.get('/enseignant-demande/:code', enseignantClient.display_Enseignant_DemandePage);

//send 'enseignant' demande
router.post('/envoie-demande-enseignant', enseignantClient.send_Enseignant_Demande);

//display 'enseignant' demandes
router.get('/enseignant-mesdemandes/:code', enseignantClient.display_Enseignant_Demandes);

module.exports = router;