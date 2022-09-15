//models
const Enseignant = require('../models/Enseignant.js');
const Module = require('../models/Module.js');
const User = require('../models/User.js');



//get 'enseignants' page
const display_enseignants = async (req, res) => {
    try {
        //get data from database
        const enseignants = await Enseignant.findAll({attributes:['codeEnseignant', 'nom','prenom', 'email', 'module', 'utilisateur', 'password']});
        const modules = await Module.findAll({attributes:['codeModule', 'nomModule', 'annee']});
        //handle error
        if(!enseignants || !modules)
            throw new Error('erreur, donnees indisponibles');
        //convert to JSON format
        const processedEnseignants = await JSON.parse(JSON.stringify(enseignants));
        const processedModules = await JSON.parse(JSON.stringify(modules));
        //set message enseignant
        const messageEnseignant = req.flash('messageEnseignant');
        //render same page enseignants
        res.render('enseignant-template', {
            enseignantsData: processedEnseignants,
            modulesData: processedModules,
            title: 'Enseignants',
            messageEnseignant
        });
    } catch (error) {
        console.log(error);
        res.write('<p>erreur lors de chargement !</p><a href="/enseignants">reessayer</a>');
    }
};

//add 'enseignant'
const ajouterEnseignant = async (req, res) => {
    try {
        //values declaration
        const nom = req.body.nom.toUpperCase().trim(),
              prenom = req.body.prenom.toUpperCase().trim(),
              email = req.body.email.trim(),
              module = req.body.module;
        //generate random 'codeEnseignant'
        const codeEns = await Math.floor((Date.now() / 100000) * (Math.random() * 10));
        const pass = await Math.random().toString(36).slice(-8);
        //create 'enseignant' record
        await Enseignant.create({
            codeEnseignant: `ENS${codeEns}`,
            nom:nom,
            prenom:prenom,
            email:email,
            module:module,
            utilisateur: `${nom}.${prenom}-ENS@ntic.com`,
            password: pass
        },{
            fields:['codeEnseignant', 'nom', 'prenom', 'email', 'module', 'utilisateur', 'password']
        });
        //create record of 'User'
        await User.create({
            email:`${nom}.${prenom}-ENS@ntic.com`,
            password:pass,
            code: `ENS${codeEns}`,
            role:'ENSEIGNANT'
            }, {
                fields:['email', 'password', 'code', 'role']
            });
        //sent messageEnseignant and redirect to 'enseignants' page
        req.flash('messageEnseignant', 'Enseignant ajoute !');
        res.redirect('/enseignants');

    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/enseignants">retourne a la pages des enseignants</a>"');
    }
};

//edit 'enseignant'
const modifierEnseignant = async (req, res) => {
    try {
        //value declaration 
        const codeenseignant = req.body.codeenseignant.toUpperCase().trim(),
              nom = req.body.nom.toUpperCase().trim(),
              prenom = req.body.prenom.toUpperCase().trim(),
              email = req.body.email.trim(),
              module = req.body.module;
        //verify if 'enseignant' exists
        const enseignant_exist = await Enseignant.findOne({where: {codeEnseignant: codeenseignant}});
        if(!enseignant_exist){
            req.flash('messageEnseignant', 'pas d\'enseignant portant ce code');
            res.redirect('/enseignants');
        }
        else {
            //update 'enseigant' record
            await Enseignant.update({
                nom:nom,
                prenom:prenom,
                email:email,
                module:module,
                utilisateur: `${nom}.${prenom}-ENS@ntic.com`,
            },{
                where: {
                    codeEnseignant: codeenseignant
                }
            },{
                fields:['nom', 'prenom', 'email', 'module', 'utilisateur']
            });
            //update record of 'User'
            const user = await User.update({
                email:`${nom}.${prenom}@ntic.com`,
                },
                {
                    where: {
                        code:codeenseignant
                    }
                }, 
                {
                    fields:['email']
                });
            //set messageEnseignant and rediect toward 'enseignants'
            req.flash('messageEnseignant', 'Enseignant modifie !');
            res.redirect('/enseignants');
        }
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/enseignants">retourne a la page des enseignants</a>');
    }
};

//delete 'enseignant'
const supprimerEnseignant = async(req, res)=> {
    try {
        //values declaration
        const code = req.body.codeenseignant.toUpperCase().trim();
        //verify if 'enseignant' exists
        const enseignant_exist = await Enseignant.findOne({where: {codeEnseignant: code}});
        //delete record if exists
        if(enseignant_exist){
            await Enseignant.destroy({where: {codeEnseignant: code}});
            //delete user record
            await User.destroy({where: { code: code }})
            req.flash('messageEnseignant', 'Enseignant supprime !');
            res.redirect('/enseignants');
        } else {
            req.flash('messageEnseignant', 'Pas d\'enseignant portant ce code');
            res.redirect('/enseignants');
        }
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !<p/><a href="/enseignants">retourner a la page des enseignants</a>');
    }
};


module.exports = {
    display_enseignants,
    ajouterEnseignant,
    modifierEnseignant,
    supprimerEnseignant
};