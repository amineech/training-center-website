//models
const Module = require('../models/Module.js');
const Filiere = require('../models/Filiere.js');

//datbase
const sequelize = require('../config/basedonne.js');
const Sequelize = require('sequelize'); 

//get liste-modules' page
const display_listeModules = async(req, res) => {
    try {
        const filieres = await Filiere.findAll({attributes:['codeFiliere', 'nomFiliere']});
        //convert to JSON format
        const processedFilieres = await JSON.parse(JSON.stringify(filieres));
        //render page 
        res.render('module-client', {
            title: 'Liste des modules',
            filieresData: processedFilieres
        });
        
    } catch (error) {
        console.log(error);
        res.end('erreur, veuillez reessayer !');
    }
};

//rechercher modules
const rechercherModules = async(req, res) => {
    try {
        //grab values from request body
        let { codefiliere, annee } = req.body;
        //make request to database
        const filieres = await Filiere.findAll({attributes:['codeFiliere', 'nomFiliere']});
        const modules_par_filiere = await sequelize.query(`SELECT * from modules join filieres_modules on
                                                           modules.codeModule = filieres_modules.module join filieres on
                                                           filieres_modules.filiere = filieres.codeFiliere
                                                           WHERE filieres.codeFiliere = ? and modules.annee = ?`,
                                                            {
                                                                replacements: [ codefiliere, annee ],
                                                                type: Sequelize.QueryTypes.SELECT
                                                            });
        //convert to JSON format
        const processedFilieres = await JSON.parse(JSON.stringify(filieres));
        const processedObject = await JSON.parse(JSON.stringify(modules_par_filiere));
        //show filiere and annee
        res.locals.annee = annee;
        res.render('module-client', {
            title: 'Liste des modules',
            filieresData: processedFilieres,
            modulesData: processedObject
        });
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/liste-modules">retourne a la liste des modules</a>');
    }
};

module.exports = {
    display_listeModules,
    rechercherModules
};