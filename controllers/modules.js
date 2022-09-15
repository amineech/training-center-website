//models
const Module = require('../models/Module.js');

//get 'modules' page
const display_modules = async (req, res) => {
    try {
        //get data from database
        const modules = await Module.findAll({attributes:['codeModule', 'nomModule', 'annee']});
        //handle error in loading if exists
        if(!modules){
            throw new Error('erreur produit lors de chargement');
        }
        //convert to JSON format 
        const processedModules = await JSON.parse(JSON.stringify(modules));
        //set message 'mdoules' flash
        const messageModule = req.flash('messageModule');   
        //render 'modules' page
        res.render('module-template', {
            modulesData:processedModules,
            title:'Modules',
            messageModule
        });
    } catch (error) {
        console.log(error);
        res.end('erreur, veuillez reessayer');
    }
};

//ajouter module
const ajouterModule = async (req, res) => {
    try {
        //values declaration
        const codemodule = req.body.codemodule,
              nommodule = req.body.nommodule,
              annee = req.body.annee;
        //verify if 'module' exists
        const module_exist = await Module.findOne({where: {codeModule: codemodule.toUpperCase().trim()}});
        if(module_exist){
            req.flash('messageModule', 'Code module existe deja ! Essayer avec un autre');
            res.redirect('/modules');
        } else {
            await Module.create({
                codeModule:codemodule.toUpperCase().trim(),
                nomModule:nommodule.toUpperCase().trim(),
                annee: annee
            },{
                fields:['codeModule', 'nomModule', 'annee']
            });
            //set message and redirect to 'modules' page
            req.flash('messageModule', 'Module ajoute !');
            res.redirect('/modules');
        }
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/modules>retourne a la pages des modules</a>"');
    }
};

//modifier module
const modifierModule = async (req, res) => {
    try {
        //values declaration
        const codemodule = req.body.codemodule,
        nommodule = req.body.nommodule,
        annee = req.body.annee;
        //verify if 'module' exists
        const module_exist = await Module.findOne({ where: {codeModule: codemodule.toUpperCase().trim()}});
        if(!module_exist){
            req.flash('messageModule', 'Ce code Module n\'existe pas !');
            res.redirect('/modules');
        }
        else{
            //update record
            await Module.update({
                nomModule: nommodule.toUpperCase().trim(),
                annee: annee
            },{
                where: { codeModule:codemodule.toUpperCase().trim() }
            }, {
                fields:['nomModule', 'annee']
            });
            //set message and redirect to 'modules' page
            req.flash('messageModule', 'Module modifie !');
            res.redirect('/modules');
        }
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/modules>retourne a la pages des modules</a>"');
    }
};

//supprimer module
const supprimerModule = async (req, res) => {
    try {
        const codemodule = req.body.codemodule;
        //verify if 'module' exists
        const module_exist = await Module.findOne({where: {codeModule: codemodule.toUpperCase().trim()}});
        if(!module_exist){
            req.flash('messageModule', 'Ce code module n\'existe pas !');
            res.redirect('/modules');
        } else{
            //delete record
            await Module.destroy({where: {codeModule: codemodule.toUpperCase().trim()}});
            //set message and redirect to 'modules' page
            req.flash('messageModule', 'Module supprime !');
            res.redirect('/modules');
        }
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/modules">retourne a la page des modules</a>');
    }
};


module.exports = {
    display_modules,
    ajouterModule,
    modifierModule,
    supprimerModule
};