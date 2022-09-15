//database
const sequelize = require('../config/basedonne.js'); //to make a raw request
const Sequelize = require('sequelize'); //to make a raw request

//models
const Module = require('../models/Module.js');
const Filiere = require('../models/Filiere.js');
const Filiere_Module = require('../models/Filiere_Module.js');

//get associations page
const display_associations = async (req, res) => {
    try {
        //get 'modules' and 'filiers' data
        const modules = await Module.findAll({attributes: ['codeModule', 'nomModule', 'annee']});
        const filieres = await Filiere.findAll({attributes: ['codeFiliere', 'nomFiliere', 'abrvFiliere']});
        //get joined tables 'mofules' 'filieres' and 'filieres_modules' with raw query
        const f_m_tables = await sequelize.query(`SELECT * FROM modules m join filieres_modules fm
                                                on m.codeModule = fm.module join filieres f
                                                on fm.filiere = f.codeFiliere`, 
                                                { 
                                                    type: Sequelize.QueryTypes.SELECT 
                                                });
        //verify if data loaded properly
        if(!modules || !filieres || !f_m_tables){
            throw new Error('erreur produit lors de chargement');
        }
        //convert to JSON format
        const processedModules = await JSON.parse(JSON.stringify(modules));
        const processedFilieres = await JSON.parse(JSON.stringify(filieres));
        const processed_f_m_tables = JSON.parse(JSON.stringify(f_m_tables));
        //set flash message
        const messageAssociation = req.flash('messageAssociation');
        //render '/modules/associations' page
        res.render('associations-template', {
            modulesData: processedModules,
            filieresData: processedFilieres,
            filiereModulesData: processed_f_m_tables,
            title: 'Associations',
            messageAssociation
        });
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p>');
    }
}; 

//ajouter association
const ajouterAssociation = async (req, res) => {
    try {
        const codemodule = req.body.module,
              codefiliere = req.body.filiere;
        //verify if combination exists
        const combination_exist =await Filiere_Module.findOne({
            where: {
                filiere: codefiliere,
                module: codemodule
        }});
        if(combination_exist){
            //return to page with message
            req.flash('messageAssociation', 'Association existe deja ! veuillez essayer avec d\'autre valeurs');
            res.redirect('/associations');
        } else {
            //create record
            await Filiere_Module.create({
                filiere: codefiliere,
                module: codemodule
            },{
                fields: ['filiere', 'module']
            });
            //set message and redirect toward /associations page
            req.flash('messageAssociation', 'Association Ajoutee !');
            res.redirect('/associations');
        }
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/associations">retourne a la page des associations</a>');
    }
};

//supprimer association
const supprimerAssociation = async (req, res) => {
    try {
        const codemodule = req.body.module,
              codefiliere = req.body.filiere;
        //verify if combination exists
        const combination_exist = await Filiere_Module.findOne({
            where: {
                filiere: codefiliere,
                module: codemodule
        }});
        if(!combination_exist){
            //return to page with message
            req.flash('messageAssociation', 'Association n\'existe pas !');
            res.redirect('/associations');
        } else {
            //delete record
            await Filiere_Module.destroy({
                where:{
                    filiere: codefiliere,
                    module: codemodule
                }
            },{
                fields: ['filiere', 'module']
            });
            //set message and redirect toward /associations page
            req.flash('messageAssociation', 'Association Supprimee !');
            res.redirect('/associations');
        }
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/associations">retourne a la page des associations</a>');
    }
}


module.exports = {
    display_associations,
    ajouterAssociation,
    supprimerAssociation
};  