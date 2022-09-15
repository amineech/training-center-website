//jsonwebtoken module
const jwt = require('jsonwebtoken');


function verifyTokenAdmin(req, res, next){
    const token = req.cookies.access_token_adm;
    if(token){
        jwt.verify(token, 'secretkey', (err, decodedToken) => {
            if(err) {
                req.flash('messageLogin', 'Erreur produit, veuillez reessayer !');
                res.redirect('/login');
            } else {
                res.locals.user = decodedToken.user; //send user data to next page in response local data
                next();
            }
        });
    } else{
        req.flash('messageIdentifier', 'vous devez s\'identifier');
        res.redirect('/login');
    }
}

function verifyTokenEtudiant(req, res, next){
    const token = req.cookies.access_token_etd;
    if(token){
        jwt.verify(token, 'secretkey', (err, decodedToken) => {
            if(err) {
                req.flash('messageLogin', 'Erreur produit, veuillez reessayer !');
                res.redirect('/login');
            } else {
                res.locals.user = decodedToken.user; //send user data to next page in response local data
                next();
            }
        });
    } else{
        req.flash('messageIdentifier', 'vous devez s\'identifier');
        res.redirect('/login');
    }
}

function verifyTokenEnseignant(req, res, next){
    const token = req.cookies.access_token_ens;
    if(token){
        jwt.verify(token, 'secretkey', (err, decodedToken) => {
            if(err) {
                req.flash('messageLogin', 'Erreur produit, veuillez reessayer !');
                res.redirect('/login');
            } else {
                res.locals.user = decodedToken.user; //send user data to next page in response local data
                next();
            }
        });
    } else{
        req.flash('messageIdentifier', 'vous devez s\'identifier');
        res.redirect('/login');
    }
}

module.exports = { 
                    verifyTokenAdmin, 
                    verifyTokenEtudiant, 
                    verifyTokenEnseignant 
                };