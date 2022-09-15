const express = require('express');

//create route object
const router = express.Router();

//etudiant
router.get('/logout-etd', (req, res) => {
    res.cookie('access_token_etd', '', { maxAge:1 }); //set token to empty value and maxAge to 1 ms(cookie expires in a blink)
    res.redirect('/login');
});

//enseignant
router.get('/logout-ens', (req, res) => {
    res.cookie('access_token_ens', '', { maxAge:1 }); //set token to empty value and maxAge to 1 ms(cookie expires in a blink)
    res.redirect('/login');
});

//admin
router.get('/logout-adm', (req, res) => {
    res.cookie('access_token_adm', '', { maxAge:1 }); //set token to empty value and maxAge to 1 ms(cookie expires in a blink)
    res.redirect('/login');
});


module.exports = router;