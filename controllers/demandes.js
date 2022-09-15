//models
const Demande = require('../models/Demande.js');

//display 'demandes'
const display_demandes = async (req, res) => {
    try {
        //get data from database
        const demandes = await Demande.findAll({attribute:[
            //attributes to select from table
            'idDemande',
            'nom',
            'prenom',
            'code',
            'objetDemande',
            'status',
            'dateRecuperation',
            'contentDemande',
            'created_at'
        ]});
        //convert to JSON format
        const processedDemandes = await JSON.parse(JSON.stringify(demandes));
        //reverse date
        for(let demande of processedDemandes){
            for(let key in demande){
                if(key === 'created_at'){
                    demande[key] = demande[key].split('-').reverse().join('-');
                }
                if(key === 'dateRecuperation'){
                    //date could be null(check if it is or not)
                    if(demande[key] !== null){
                        demande[key] = demande[key].split('-').reverse().join('-');
                    }
                }
            }
        }
        //set demandeSupprime message
        const demandeMsg = req.flash('demandeMsg');
        //render 'demandes' page for admin
        res.render('demande-template', {
            title: 'Demandes',
            demandesData: processedDemandes,
            demandeMsg
        });
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !');
    }
};

//supprimer demande
const supprimeDemande = async (req, res) => {
    try {
        //get id value f 'demande'
        const idDmd = req.body.idDemande;
        //delete 'demande' from database
        await Demande.destroy({ 
            where: { 
                idDemande: idDmd 
            } 
        });
        //redirect toward 'demandes' page
        req.flash('demandeMsg', 'Demande supprime !');
        res.redirect('/demandes');

    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/demandes">retourner a la page des demandes</a>');
    }
};

//change statut demande
const changeStatus = async(req, res) => {
    try {
        //get value
        var dateRec = req.body.daterecuperation;
        const idDmd = req.body.iddmd;
        //check if date valide (greater than today's date)
        var dateR = new Date(dateRec);
        var today = new Date();
        if(dateR.getTime() <= today.getTime()){
            req.flash('demandeMsg', 'date de confirmation non valide !');
            res.redirect('/demandes');
        } else {
            //update record
            await Demande.update({
                status: 1,
                dateRecuperation: dateRec
            },{
                where: {
                    idDemande: idDmd
                }
            },{
                fields: ['status', 'dateRecuperation']
            });
            //set message and redirect toward same page 'demandes'
            req.flash('demandeMsg', 'Demande traite !');
            res.redirect('/demandes');
        }
    } catch (error) {
        console.log(error);
        res.end('<p>erreur, veuillez reessayer !<a href="/demandes">retourner a la pages des demandes</a>');
    }
};

module.exports = {
    display_demandes,
    supprimeDemande,
    changeStatus
};