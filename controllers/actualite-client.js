//models
const Actualite = require('../models/Actualite.js');

const display_actualite = async(req, res) => {
    try {
        //get 'actualites' data from database
        const actualites = await Actualite.findAll({attributes:[
            'objetActualite',
            'contentActualite',
            'created_at'
        ]});
        //convert to JSON format
        const processedActualites = await JSON.parse(JSON.stringify(actualites)).reverse();
        //reverse date format
        for(let actualite of processedActualites){
            for(let key in actualite){
                if(key === 'created_at'){
                    actualite[key] = actualite[key].split('-').reverse().join('-');
                }
            }
        }
        //render '/liste-actualite' page
        res.render('actualite-client', {
            actualitesList: processedActualites,
            title: 'Fil d\'actualites'
        });
    } catch (error) {
        console.log(error);
        res.end('erreur, veuillez reessayer !');
    }
};

module.exports = {
    display_actualite
};