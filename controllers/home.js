//models
const Filiere = require('../models/Filiere.js');
const Enseignant = require('../models/Enseignant.js');

//get homepage
const display_home = async (req, res) => {
    try {
        //get data needed in home page
        const filieres = await Filiere.findAll({attributes:['codeFiliere', 'nomFiliere', 'abrvFiliere']});
        const enseignants = await Enseignant.findAll({attributes: ['codeEnseignant']});
        //convert to json
        const processedFilieres = await JSON.parse(JSON.stringify(filieres));
        const processedEnseignants = await JSON.parse(JSON.stringify(enseignants));
        //set message and render home page
        const messageContact = req.flash('messageContact');
        res.render('home', {
            title:'Accueil - Centre NTIC',
            titre:'Filières disponible',
            filieresData: processedFilieres,
            enseignantsData: processedEnseignants,
            messageContact
        });
    } catch (error) {
        console.log(error);
        res.end('erreur lors de chargement, veuillez reessayer...');
    }
};

module.exports = {
    display_home
};