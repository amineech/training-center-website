//models
const Filiere = require('../models/Filiere.js');
const Etudiant  = require('../models/Etudiant.js');
const User = require('../models/User.js');

//get 'etudiants' page
const display_etudiants = async (req, res) => {
    try {
        //get data from database
        const filieres = await Filiere.findAll({attributes:['codeFiliere', 'nomFiliere', 'abrvFiliere']});
        const etudiants = await Etudiant.findAll({attributes:[`codeEtudiant`, `nom`, `prenom`, `dateNaissance`, `filiere`, `annee`, `telephone`, `adresse`, `utilisateur`, `password`]});
        //convert to json format
        const processedFilieres = JSON.parse(JSON.stringify(filieres));
        const processedEtudiants = JSON.parse(JSON.stringify(etudiants));
        //set message flash
        const messageEtudiant = req.flash('messageEtudiant');
        //render 'etudiants' page
        res.render('etudiant-template', {
            filieresData: processedFilieres,
            etudiantsData: processedEtudiants,
            title: 'Etudiants',
            messageEtudiant
        });
    } catch (error) {
        console.log(error);
    }
};

//ajouter etudiant
const ajouterEtudiant = async (req, res) => {
    try {
        //declaration of the form values
        const nom = req.body.nom.toUpperCase().trim(),
              prenom = req.body.prenom.toUpperCase().trim(),
              datenaissance = req.body.datenaissance,
              filiere = req.body.filiere.toUpperCase(),
              annee = req.body.annee,
              telephone = req.body.tel,
              adresse = req.body.adresse.toUpperCase().trim();
        //generate random password and 'etudiant' code
        var pass = await Math.random().toString(36).slice(-8);
        var codeEtd = await Math.ceil((Date.now()/100000) * (Math.random() * 10));
        //create record of 'Etudiant'
        await Etudiant.create({
            codeEtudiant: codeEtd, //generate codeEtudiant from nom and datenaissance
            nom:nom, 
            prenom:prenom, 
            dateNaissance:datenaissance,
            filiere:filiere, 
            annee:annee, 
            telephone:telephone, 
            adresse:adresse, 
            utilisateur:`${nom}.${prenom}@ntic.com`, 
            password: pass
        },
            {
                fields:['codeEtudiant', 'nom', 'prenom', 'dateNaissance', 'filiere', 'annee', 'telephone', 'adresse', 'utilisateur', 'password']
            });
        //create record of 'User'
        await User.create({
            email:`${nom}.${prenom}@ntic.com`,
            password:pass,
            code: codeEtd,
            role:'ETUDIANT'
            }, {
                fields:['email', 'password', 'code', 'role']
            });
        // set message and redirect to 'etudiants' page
        req.flash('messageEtudiant', 'Etudiant ajoute !');
        res.redirect('/etudiants');
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/etudiants">retourne a la page des etudiants</a>');
    }
};

//modifier etudiant
const modifierEtudiant = async (req, res) => {
    try {
        //declaration of the form values
        const code = req.body.codeetudiant.trim(),
              nom = req.body.nom.toUpperCase().trim(),
              prenom = req.body.prenom.toUpperCase().trim(),
              datenaissance = req.body.datenaissance,
              filiere = req.body.filiere.toUpperCase(),
              annee = req.body.annee,
              telephone = req.body.tel,
              adresse = req.body.adresse.toUpperCase().trim();
        //verify if etudiant exists
        const etudiant_exist = await Etudiant.findOne({where: {codeEtudiant: code}});
        if(!etudiant_exist){
            req.flash('messageEtudiant', 'Etudiant n\'existe pas');
            res.redirect('/etudiants');
        }
        else{
            //update record of 'Etudiant'
            await Etudiant.update({
                nom:nom, 
                prenom:prenom, 
                dateNaissance:datenaissance,
                filiere:filiere, 
                annee:annee, 
                telephone:telephone, 
                adresse:adresse, 
                utilisateur:`${nom}.${prenom}@ntic.com`, 
            }, {
                where: {
                    codeEtudiant:code
                }
            },
            {
                fields:[
                    'nom',
                    'prenom',
                    'dateNaissance',
                    'filiere',
                    'annee',
                    'telephone',
                    'adresse',
                    'utilisateur'
                ]
            });
            //update record of 'User'
            const user = await User.update({
                email:`${nom}.${prenom}@ntic.com`,
                },
                {
                    where: {
                        code:code
                    }
                }, 
                {
                    fields:['email']
                });
            //set message and redirect to 'etudiants' page
            req.flash('messageEtudiant', 'Etudiant modifie !');
            res.redirect('/etudiants');
        }
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/etudiants">retourne a la page des etudiants</a>');
    }
};

//supprimer etudiant
const supprimerEtudiant = async (req, res) => {
    try {
        //value declaration
        var codeEtd = req.body.codeetudiant.trim();
        //delete record 'etudiant'
        const etudiant = await Etudiant.destroy({
            where: {
                codeEtudiant:codeEtd
            }
        });
        if(!etudiant){
            req.flash('messageEtudiant', 'Pas d\'etudiant portant ce code');
            res.redirect('/etudiants');
        } else{
            await User.destroy({
                where: {
                    code:codeEtd
                }
            });
            req.flash('messageEtudiant', 'Etudiant Supprime !');
            res.redirect('/etudiants');
        }
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/etudiants">retourne a la page des etudiants</a>');
    }
};


module.exports = {
    display_etudiants,
    ajouterEtudiant,
    modifierEtudiant,
    supprimerEtudiant
};