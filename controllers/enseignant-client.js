//models
const Enseignant = require('../models/Enseignant.js');
const Filiere = require('../models/Filiere.js');
const Document = require('../models/Document.js');
const Demande = require('../models/Demande.js');

// file system: module used to remove a file from server
const fs = require('fs');

//get 'espace-enseignant' page
const display_espaceEnseignant = async(req, res) => {
    try {
        const codeEns = res.locals.user.code;
        //get etudiant infos with codeE
        const enseignant = await Enseignant.findOne({where: {
            codeEnseignant: codeEns
        }});
        const filieres = await Filiere.findAll({ attributes: ['codeFiliere', 'nomFiliere']});
        //convert to JSON format
        const enseignant_json = await JSON.parse(JSON.stringify(enseignant));
        const processedFilieres = await JSON.parse(JSON.stringify(filieres));
        //set message 
        const msgEnseignant = req.flash('msgEnseignant');
        //render 'espace-personnel' for 'etudiant'
        res.render('enseignant-client', {
            title: 'Espace Enseignant',
            enseignantInfos: enseignant_json,
            filieresData: processedFilieres,
            msgEnseignant
        })
    } catch (error) {
        console.log(error);
        res.end('erreur, veuillez reessayer !');
    }
};

//ajouter document
const ajouterDocument = async(req, res) => {
    try {
        //check if no file is uploaded
        if (!req.files || Object.keys(req.files).length === 0) {
            req.flash('msgEnseignant', 'pas de fichier');
            return res.redirect('/espace-enseignant');
        }
        //if there is a file recupere it and values of the form(filiere, enseignant)
        let file = req.files.doc;
        let filiere = req.body.filiere;
        let annee = req.body.annee;
        let enseignant = req.body.enseignant;
        //process file name
        let fileExtension = file.name.substr(file.name.lastIndexOf('.') + 1); //get extension of the file
        let filename = file.name.slice(0, file.name.lastIndexOf('.')); //get pure file name without extension
        let new_filename = filename + '-' + filiere + '-' + annee + '.' + fileExtension; //concatenate pure filename along with filiere and file extension
        //path to store on the server
        let path = '/gestionCentreFormation/docs/' + new_filename; 
        //store it using mv() method
        await file.mv(path, (err) => {
            if(err) throw err;
        });
        //store file name in database along with other values
        await Document.create({
            document: new_filename,
            filiere: filiere,
            annee: annee,
            enseignant: enseignant
        },{
            fields: ['document', 'filiere', 'annee', 'enseignant']
        });
        //set success msg and redirect toward same page 
        req.flash('msgEnseignant', 'fichier charge !');
        res.redirect('/espace-enseignant');
    } catch (error) {
        console.log(error);
        res.end('erreur, veuillez reessayer !');
    }
};

//get 'mesdocuments' page
const display_mesdocuments = async(req, res) => {
    try {
        //catch 'enseignant' code
        let codeEns = req.params.code;
        //get documents from database with same codeEns
        const docs = await Document.findAll({
            where: {
                enseignant: codeEns
            }
        });
        //convert to json format
        let json_docs = await JSON.parse(JSON.stringify(docs));
        //reverse array
        json_docs = json_docs.reverse();
        //reverse 'date publication' (created_at)
        for(let document of json_docs){
            for(let key in document){
                if(key === 'created_at'){
                    document[key] = document[key].split('-').reverse().join('-');
                }
            }
        }
        //set msg and render 'mesdocuments' page
        const msgDocument = req.flash("msgDocument");
        res.render('mesdocuments', {
            title: 'Mes documents',
            docsData: json_docs,
            msgDocument,
        })
    } catch (error) {
        console.log(error);
        res.end("erreur, veuillez reessayer !");
    }
};

//delete document
const deleteDocument = async(req, res) => {
    try {
        //get values
        const iddoc = req.body.docId;
        const doc = req.body.doc;
        //delete file from server(/docs folder)
        let path = '/gestionCentreFormation/docs/' + doc;
        await fs.unlinkSync(path);
        //delete file from database
        await Document.destroy({
            where: {
                idDoc: iddoc
            }
        });
        //set msg in 'espace-enseignant' page
        req.flash('msgEnseignant', 'Fichier supprime !');
        //problem: need to redirect to same page 'mes documents' !!!!!!!!!!!!!!!!!!! 
        res.redirect('/espace-enseignant');
    } catch (error) {
        console.log(error);
        res.end("<p>erreur, veuillez reessayer !</p><a href='/espace-enseignant'>retourner a votre espace personnel</a>")
    }
};

//download document
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
                req.flash('msgEnseignant', 'Erreur lors du telechargement !');
                return res.redirect('/espace-enseignant');
            }
        });
    } catch (error) {
        console.log(error);
        res.end('<p>erreur, veuillez reessayer !</p><a href="/espace-enseignant">retourner a votre espace personnel</a>');
    }
};

//display 'demande' page for 'enseignant'
const display_Enseignant_DemandePage = async(req, res) => {
    try {
        const codeEns = req.params.code;
        //get 'enseignant' infos
        const enseignant = await Enseignant.findAll({
            where: {
                codeEnseignant: codeEns
            }
        });
        //json format
        const json_enseignant = await JSON.parse(JSON.stringify(enseignant));
        //msg demande
        const msgEnvoieDemandeEns = req.flash('msgEnvoieDemandeEns');
        res.render('enseignant-demande', {
            title: 'Enseignant - Demande',
            enseignantInfos: json_enseignant[0],
            msgEnvoieDemandeEns
        });
    } catch (error) {
        console.log(error);
        res.end('<p>erreur, veuillez reessayer !</p><a href="/espace-enseignant">retourner a votre espace personnel</a>');
    }
};

//send 'demande' of 'enseignant'
const send_Enseignant_Demande = async(req, res) => {
    try {
        //values declaration
        const nomE = req.body.nom.toUpperCase().trim(),
              prenomE = req.body.prenom.toUpperCase().trim(),
              codeE = req.body.codeenseignant.trim(),
              objet = req.body.objet.trim(),
              contenu = req.body.contenu.trim();
        //check if 'etudiant' infos exist
        const enseignant = await Enseignant.findOne({
            where: {
                codeEnseignant: codeE,
                nom: nomE,
                prenom: prenomE
            }
        });
        if(enseignant){
            await Demande.create({
                nom: nomE,
                prenom: prenomE,
                code: codeE,
                objetDemande: objet,
                contentDemande: contenu
            }, {
                fields: ['nom', 'prenom', 'code', 'objetDemande', 'contentDemande'] 
                //the field etudiant is also the 'enseignant' code
            });
            //display success message and redirect to espace personnel page
            req.flash('msgEnvoieDemandeEns', 'Votre demande est envoyee ! Merci de patienter et de revenir regulierement pour verifier l\'avancement de votre demande.');
            res.redirect(`/enseignant-demande/${codeE}`);
        } else {
            //display success message and redirect to espace personnel page
            req.flash('msgEnvoieDemandeEns', 'Informations incorrectes, veuillez verifier les informations saisit !');
            res.redirect(`/enseignant-demande/${codeE}`);
        }
    } catch (error) {
        console.log(error);
        res.end('<p>erreur, veuillez reessayer !</p><a href="/espace-enseignant">retourner a votre espace personnel</a>');
    }
};

//display 'enseignant' demandes
const display_Enseignant_Demandes = async(req, res) => {
    try {
        const codeE = req.params.code;
        //get 'demandes' by 'codeEtudiant'
        const mesdemandes = await Demande.findAll({
            where: {
                code: codeE //the field 'etudiant' represent also 'enseignant' code
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
        res.render('mesdemandes-enseignant', {
            title: 'Enseignant - Mes demandes',
            processedDemandes
        });
    } catch (error) {
        console.log(error);
        res.end('<p>erreur, veuillez reessayer !</p><a href="/espace-enseignant">retourner a votre espace personnel</a>');
    }
};

module.exports = {
    display_espaceEnseignant,
    ajouterDocument,
    display_mesdocuments,
    deleteDocument,
    downloadDocument,
    display_Enseignant_DemandePage,
    send_Enseignant_Demande,
    display_Enseignant_Demandes
};
