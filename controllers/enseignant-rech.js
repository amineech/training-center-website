//models
const Module = require('../models/Module.js');
const Enseignant = require('../models/Enseignant.js');

//database
const sequelize = require('../config/basedonne.js');
const Sequelize = require('sequelize'); 


//get 'liste-enseignants' page
const display_listeEnseignant = async(req, res) => {
    try {
        const modules = await Module.findAll({attributes:['codeModule', 'nomModule']});
        //convert to JSON format
        const processedModules = await JSON.parse(JSON.stringify(modules));
        //render page 
        res.render('liste-enseignants', {
            title: 'Liste des enseignants',
            modulesData: processedModules
        });
    } catch (error) {
        console.log(error);
        res.end('erreur, veuillez reessayer !');
    }
};

//search 'enseignant'
const rechercherEnseignant = async(req, res) => {
    try {
        const { module } = req.body;
        //get data from database
        const modules = await Module.findAll({attributes:['codeModule', 'nomModule']});
        const enseignants_par_module = await sequelize.query(`SELECT * from modules join enseignants on modules.codeModule
                                                        = enseignants.module WHERE modules.codeModule = ?`,
                                                        {
                                                            replacements: [module],
                                                            type: Sequelize.QueryTypes.SELECT
                                                        });
        //convert to json format
        const processedModules = await JSON.parse(JSON.stringify(modules));
        const processedObject = await JSON.parse(JSON.stringify(enseignants_par_module));
        //render same page
        res.render('liste-enseignants', {
            title: 'Listes des enseignants',
            modulesData: processedModules,
            enseignantsData: processedObject
        });
    } catch (error) {
        console.log(error);
        res.end('erreur, veuillez reessayer !');
    }
};


module.exports = {
    display_listeEnseignant,
    rechercherEnseignant
};
