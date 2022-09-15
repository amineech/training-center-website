const express = require('express');

//create route object
const router = express.Router();

//protect routes test
const jwt = require('jsonwebtoken');

const User = require('../models/User.js');


//get login page
router.get('/login', (req, res) => {
    const messageLogin = req.flash('messageLogin');
    const messageIdentifier = req.flash('messageIdentifier');
    res.render('login', {title: 'Login', messageIdentifier,messageLogin});
});

//post login
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        //check if exists
        const user = await User.findOne({
            where:{
                email: username,
                password: password
            }
        });
        const user_JSON = JSON.parse(JSON.stringify(user));
        if(user_JSON){
            //use JSON.parse(JSN.stringify(user)); to check if user etudiant or admin or enseignant to redirect toward apropriate resources
            if(user_JSON.role === 'ADMIN'){   //admin login
                //create  token
                const token = jwt.sign({ user: user }, 'secretkey');
                //set token in cookies and redirect to admin page
                res
                .cookie('access_token_adm', token, {
                    maxAge:6000000 //max time before ask the user to re-login(milliseconds) (3600000ms = 60min)
                })
                .redirect('/dashboard');
            } else if(user_JSON.role === 'ETUDIANT') {  //etudiant login
                //create  token
                const token = jwt.sign({ user: user }, 'secretkey');
                //set token in cookies and redirect to espace-etudiant page
                res
                .cookie('access_token_etd', token, {
                    maxAge:6000000 //max time before ask the user to re-login(milliseconds) (3600000ms = 60min)
                })
                .redirect('/espace-etudiant');
            } else {    //enseignant login
                //create  token
                const token = jwt.sign({ user: user }, 'secretkey');
                //set token in cookies and redirect to espace-enseignant page
                res
                .cookie('access_token_ens', token, {
                    maxAge:6000000 //max time before ask the user to re-login(milliseconds) (3600000ms = 60min)
                })
                .redirect('/espace-enseignant');
            }
        } else {
            //set message & redirect to login page
            req.flash('messageLogin', 'Email ou mot de passe incorrecte !')
            res.redirect('/login');
        }
    } catch (error) {
        console.log('catch: ' + error);
    }
});

module.exports = router;