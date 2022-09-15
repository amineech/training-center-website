//models
const Demande = require('../models/Demande.js');
const Etudiant = require('../models/Etudiant.js');

//database
const database = require('../config/basedonne.js');


//dashboard page controller
const display_dashboard = async(req, res) => {
    try {
        const etudiants_par_filiere = await database.query(`
            select nomFiliere, annee, count(nomFiliere) as nombre from etudiants join filieres on etudiants.filiere = filieres.codeFiliere
            group by nomFiliere, annee;
        `);
        const demandes_non_traites = await Demande.findAll({
            where: {
                status: 0
            }
        });

        //json format
        const json_etudiants = await JSON.parse(JSON.stringify(etudiants_par_filiere));
        const json_demandes = await JSON.parse(JSON.stringify(demandes_non_traites));
        //add some statistics !!!!!!
        res.render('dashboard', {
            title: 'Dashboard',
            etudiants: json_etudiants[0],
            demandes: json_demandes
        });
    } catch (error) {
        res.end('error');
    }
};

module.exports = {
    display_dashboard
};