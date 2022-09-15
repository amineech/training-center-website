//models
const Etudiant = require('../models/Etudiant.js');
const Document = require('../models/Document.js');
const User = require('../models/User.js');
const Demande = require('../models/Demande.js');

//get demande page(espace etudiant)
const display_espaceEtudiant = async(req, res) => {
    try {
        const codeE = res.locals.user.code;
        //get etudiant infos with codeE
        const etudiant = await Etudiant.findOne({where: {
            codeEtudiant: codeE
        }});
        //convert to JSON format
        const etudiant_json = await JSON.parse(JSON.stringify(etudiant));
        //set message 
        const msgEnvoieDemande = req.flash('msgEnvoieDemande');
        //render 'espace-personnel' for 'etudiant'
        res.render('etudiant-client', {
            title: 'Espace Etudiant',
            etudiantInfos: etudiant_json,
            msgEnvoieDemande
        })
    } catch (error) {
        console.log(error);
        res.end('erreur, veuillez reessayer !');
    }
};

//send 'demande' to admnistration
const sendDemande = async(req, res) => {
    try {
        //values declaration
        const nomE = req.body.nom.toUpperCase().trim(),
              prenomE = req.body.prenom.toUpperCase().trim(),
              codeE = req.body.codeetudiant.trim(),
              objet = req.body.objet.trim(),
              contenu = req.body.contenu.trim();
        //check if 'etudiant' infos exist
        const etudiant = await Etudiant.findOne({
            where: {
                codeEtudiant: codeE,
                nom: nomE,
                prenom: prenomE
            }
        });
        if(etudiant){
            await Demande.create({
                nom: nomE,
                prenom: prenomE,
                code: codeE,
                objetDemande: objet,
                contentDemande: contenu
            }, {
                fields: ['nom', 'prenom', 'code', 'objetDemande', 'contentDemande']
            });
            //display success message and redirect to espace personnel page
            req.flash('msgEnvoieDemande', 'Votre demande est envoyee ! Merci de patienter et de revenir regulierement pour verifier l\'avancement de votre demande.');
            res.redirect('/espace-etudiant');
        } else {
            //display success message and redirect to espace personnel page
            req.flash('msgEnvoieDemande', 'Informations incorrectes, veuillez verifier les informations saisit !');
            res.redirect('/espace-etudiant');
        }      
    } catch (error) {
        console.log(error);
        res.end('<p>erreur</p>, <a href="/espace-etudiant">retourner a votre espace personnel</a>');
    }
};

//get 'mes demandes' page
const display_mesdemandes = async(req, res) => {
    try {
        const codeE = req.params.code;
        //get 'demandes' by 'codeEtudiant'
        const mesdemandes = await Demande.findAll({
            where: {
                code: codeE
            }
        });
        //convert to JSON format
        var processedDemandes = await JSON.parse(JSON.stringify(mesdemandes));
        //reverse date format
        for(let demande of processedDemandes){
            for(let key in demande){
                if(key === 'created_at'){
                    demande[key] = demande[key].split('-').reverse().join('-');
                }
                if(key === 'dateRecuperation'){
                    //date could be null(check if it is or not)
                    if(demande[key] !== null){
                        demande[key] = demande[key].split('-').reverse().join('-');
                    }
                }
            }
        }
        //reverse 'damandes' array (new to old instead of old to new)
        processedDemandes = processedDemandes.reverse();
        //render 'mesdemandes' page
        res.render('mesdemandes', {
            title: 'Mes demandes',
            processedDemandes
        });
    } catch (error) {
        console.log(error);
        res.end('<p>erreur, veuillez reesayer!</p>');
    }
};

//get 'mes cours' page
const display_mescours = async(req, res) => {
    try {
        //get filieres value
        const filiere = req.params.filiere;
        const annee = req.params.annee;
        //get docs from database by 'filiere'
        const docs = await Document.findAll({
            where: {
                filiere: filiere,
                annee: annee
            }
        });
        //convert to JSON format
        const json_docs = await JSON.parse(JSON.stringify(docs));
        //reverse date format
        for(let document of json_docs){
            for(let key in document){
                if(key === 'created_at'){
                    document[key] = document[key].split('-').reverse().join('-');
                }
            }
        }
        //render 'mescours' page
        res.render('mescours', {
            title: 'Mes cours',
            docsData: json_docs,
        });
    } catch (error) {
        console.log(error);
        res.end('<p>erreur, veuillez reesayer!</p>');
    }
};

//download 'document' from 'mescours' page
const downloadDocument = async(req, res) => {
    try {
        //get file name
        let fileID = req.params.document;
        //get document from database
        const document = await Document.findOne({
            where: {
                idDoc: fileID
            }
        });
        //convert to json format
        const json_doc = await JSON.parse(JSON.stringify(document));
        //get document name
        const filename = json_doc.document;
        //path on server
        let path = '/gestionCentreFormation/docs/' + filename;
        //download the file, handle error if there is any
        res.download(path, (err) => {
            if(err) {
                req.flash('msgEnvoieDemande', 'Erreur lors du telechargement !');
                return res.redirect('/espace-etudiant');
            }
        });
    } catch (error) {
        console.log(error);
        res.end('<p>erreur, veuillez reessayer !</p><a href="/espace-enseignant">retourner a votre espace personnel</a>');
    }
};

module.exports = {
    display_espaceEtudiant,
    sendDemande,
    display_mesdemandes,
    display_mescours,
    downloadDocument,
};