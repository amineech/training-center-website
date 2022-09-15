//models
const Filiere = require('../models/Filiere.js');

//get 'filieres' page
const display_filieres = async (req, res) => {
    try {
        const result = await Filiere.findAll({attributes:['codeFiliere', 'nomFiliere', 'abrvFiliere']});
        const processedResult = await JSON.parse(JSON.stringify(result));
        //set messsage filiere
        const messageFiliere = req.flash('messageFiliere');
        res.render('filiere-template', {filieresData: processedResult, title:'Filieres', messageFiliere});
    } catch (error) {
        console.log(error);
        res.end('erreur lors de chargement, veuillez reessayer...');
    }
};

//ajouter filiere
const ajouterFiliere = async (req, res) => {
    try {
        //values declaration 
        const codefiliere = req.body.codefiliere.toUpperCase().trim(),
              nomfiliere = req.body.nomfiliere.toUpperCase().trim(),
              abreviation = req.body.abreviation.toUpperCase().trim();
        //verify if codefiliere already exists  
        const filiere_exist = await Filiere.findOne({where: {codeFiliere: codefiliere}});
        if(filiere_exist){
            req.flash('messageFiliere', 'code filiere existe deja ! Essayer avec un autre')
            res.redirect('/filieres');
        } else {
            //create record of 'filiere'
            await Filiere.create({
                codeFiliere:codefiliere,
                nomFiliere:nomfiliere,
                abrvFiliere:abreviation
            },{
                fields:['codeFiliere', 'nomFiliere', 'abrvFiliere']
            });
            //display message and redirect toward 'filieres' page
            req.flash('messageFiliere', 'Filiere ajoutee!');
            res.redirect('/filieres');
        }
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer</p><a href="/filieres">retourne a la page de filieres</a>');
    }
};

//modifier filiere
const modifierFiliere = async (req, res) => {
    try {
        const codeFlr = req.body.codefiliere,
              nomfiliere = req.body.nomfiliere,
              abreviation = req.body.abreviation;
        //verify if 'filiere' exists
        const filiere_exist = await Filiere.findOne({where: {codeFiliere: codeFlr.toUpperCase().trim()}});
        if(!filiere_exist){
            req.flash('messageFiliere', 'code filiere n\existe pas');
            res.redirect('/filieres');
        } else {
            //update record
            await Filiere.update({
                nomFiliere: nomfiliere.toUpperCase().trim(),
                abrvFiliere: abreviation.toUpperCase().trim()
            },{
                where:{
                    codeFiliere: codeFlr
                }
            },{
                fields:['nomFiliere', 'abrvFiliere']
            });
            //display message and redirect toward 'filieres' page
            req.flash('messageFiliere', 'Filiere modifie !');
            res.redirect('/filieres');
        }
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, reessayer</p><a href="/filieres">retourne a la page de filieres</a>');
    }
};

//supprimer filiere
const supprimerFiliere = async (req, res) => {
    try {
        const codeFlr = req.body.codefiliere;
        const filiere = await Filiere.destroy({
            where:{
                codeFiliere: codeFlr.toUpperCase().trim()
            },
            //NB: All 'etudiants', enseignants', 'modules' that have same 'codeFiliere' will be deleted cause we set(on delete & on update to cascade)
        });
        if (!filiere) {
            req.flash('messageFiliere', 'Pas de filiere portant ce code');
            res.redirect('/filieres');
            return;
            
        } else {
            req.flash('messageFiliere', 'Filiere supprime !');
            res.redirect('/filieres');
        }
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, reessayer</p><a href="/filieres">retourne a la page de filieres</a>');
    }
};


module.exports = {
    display_filieres,
    ajouterFiliere,
    modifierFiliere,
    supprimerFiliere
};