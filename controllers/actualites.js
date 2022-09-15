//models
const Actualite = require('../models/Actualite.js');

//display actualite
const display_actualite = async (req, res) => {
    try {
        //get data from database
        const actualites = await Actualite.findAll({attributes:[
            'idActualite',
            'objetActualite',
            'contentActualite',
            'created_at'
        ]});
        //convert to JSON format
        const processedActualites = await JSON.parse(JSON.stringify(actualites));
        //reverse date format
        for(let actualite of processedActualites){
            for(let key in actualite){
                if(key === 'created_at'){
                    actualite[key] = actualite[key].split('-').reverse().join('-');
                }
            }
        }
        //set message and render /actualites page
        const messageActualite = req.flash('messageActualite');
        res.render('actualite-template', {
            actualitesData: processedActualites,
            title: 'Actualites',
            messageActualite
        });
    } catch (error) {
        console.log(error);
        res.end('erreur lors de chargement, veuillez reessayer...');
    }
};

//ajouter actualite
const ajouteActualite = async (req, res) => {
    try {
        //values declaration
        const { objet, contenu } = req.body;
        //create record
        await Actualite.create({
            objetActualite: objet.trim(),
            contentActualite: contenu.trim()
        },{
            fields: ['objetActualite', 'contentActualite']
        })
        //display message and redirect to 'actualites'
        req.flash('messageActualite', 'Actualite publiee !');
        res.redirect('/actualites');
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer</p><a href="/actualites">retourne a la page des actualites</a>');
    }
};

//modifier actualite
const modifierActualite = async (req, res) => {
    try {
        //values declaration
        const { idactualite, objet, contenu } = req.body;
        //check if exists
        const act_exist = await Actualite.findOne({ where: {
            idActualite: idactualite
        }});
        if(!act_exist){
            req.flash('messageActualite', 'Publication n\'existe pas !');
            res.redirect('/actualites');
        } else{
            //update record
            await Actualite.update({
                objetActualite: objet.trim(),
                contentActualite: contenu.trim()
            },{
                where: {
                    idActualite: idactualite
                }
            },{
                fields: ['objetActualite','contentActualite']
            });
            //display message and redirect to 'actualites' page
            req.flash('messageActualite', 'Publication modifiee !');
            res.redirect('/actualites');
        }
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer</p><a href="/actualites">retourne a la page des actualites</a>');
    }
};

//supprimer actulite
const supprimerActualite = async (req, res) => {
    try {
        //values declaration
        const { idactualite } = req.body;
        //create record
        await Actualite.destroy({
            where: {
                idActualite: idactualite
            }
        });
        //display message and redirect to 'actualites'
        req.flash('messageActualite', 'Actualite supprime !');
        res.redirect('/actualites');
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer</p><a href="/actualites">retourne a la page des actualites</a>');
    }
};

module.exports = {
    display_actualite,
    ajouteActualite,
    modifierActualite,
    supprimerActualite
};