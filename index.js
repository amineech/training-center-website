//express module 
const express = require('express');
//dynamic html web pages
const handlebars = require('express-handlebars');
//to upload files on the server
const fileUpload = require('express-fileupload');
//for flash messages
const flash = require('connect-flash');

const session = require('express-session');

const cookieParser = require('cookie-parser');
//functions to verify token during authentification
const { verifyTokenAdmin, verifyTokenEtudiant, verifyTokenEnseignant } = require('./auth/verify.js');
//port number
const port = 5000;

//creating app object(express() return an app object)
const app = express();
//------------------------------------------------------

//set cookie parser, session
app.use(cookieParser('secretAppCookiePass'));
app.use(session({
    secret: 'appSession',
    cookie: { maxAge: 60000 },
    resave: true, //forces the session to be saved back to the session store even if not modified during the req
    saveUninitialized: true //save uninitialized sessions
}));

//initialize flash (to display flash messages)
app.use(flash());

//initialize file-upload
app.use(fileUpload());

//view engine setup
app.engine('hbs', handlebars.engine({
    defaultLayout:'main',
    extname:'.hbs',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', './views');
//------------------------------------------------------

//to serve static files: need it to import css and js files(client side)
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/images'));
//folder where docs will be saved on the server
app.use(express.static(__dirname + '/docs'));
app.use('/enseignant-demande/:code', express.static( __dirname + '/public')); //to access public static files from the resource in the 1st arg
//------------------------------------------------------

//------------------------------------------------------
//-recognize incoming requests as JSON format
app.use(express.json());
//-recognize incoming requests as String or Array
app.use(express.urlencoded({ extended:false }));
//------------------------------------------------------

//get home page and load 'filieres' from database in it
app.get('/', require('./routes/home.js'));

// get apropos page
app.get('/apropos', require('./routes/apropos.js'));

//contact routes start---------------------------------------------
    //get contact page
app.get('/contact', require('./routes/messages.js'));
    //post message form contact page
app.post('/contact-page', require('./routes/messages.js'));
    //send contact form data to database
app.post('/contact', require('./routes/messages.js'));
    //dislay messages in admin messages page
app.get('/messages', verifyTokenAdmin, require('./routes/messages.js'));
    //delete 'message' from 'messages' page(admin)
app.post('/delete-msg', verifyTokenAdmin, require('./routes/messages.js'));
//contact routes end-----------------------------------------------

//login start
//get login page
app.get('/login', require('./auth/login.js'));
//pst login
app.post('/login', require('./auth/login.js'));
//login end

//logout start
//admin
app.get('/logout-adm', require('./auth/logout.js'));
//etudiant
app.get('/logout-etd', require('./auth/logout.js'));
//enseignant
app.get('/logout-ens', require('./auth/logout.js'));
//logout end

//dashboard route start
app.get('/dashboard', verifyTokenAdmin, require('./routes/dashboard.js'));
// dashboard route end

//etudiant routes start-----------------------------------------
//get etudiants page
app.get('/etudiants', verifyTokenAdmin, require('./routes/etudiants.js'));
//post ajouter-etudiant
app.post('/etudiants-ajt', verifyTokenAdmin, require('./routes/etudiants.js'));
//post modifier-etudiant
app.post('/etudiants-mdf', verifyTokenAdmin, require('./routes/etudiants.js'));
//post supprimer-etudiant
app.post('/etudiants-sp', verifyTokenAdmin, require('./routes/etudiants.js'));
//etudiant routes end-------------------------------------------

// filieres routes start----------------------------------------
//get 'filieres' page
app.get('/filieres', verifyTokenAdmin, require('./routes/filieres.js'));
//post ajouter-filieres
app.post('/filieres-ajt', verifyTokenAdmin, require('./routes/filieres.js'));
//post modifier-filieres
app.post('/filieres-mdf', verifyTokenAdmin, require('./routes/filieres.js'));
//post supprimer-filiere
app.post('/filieres-sp', verifyTokenAdmin, require('./routes/filieres.js'));
// filieres routes end------------------------------------------

// modules routes start-----------------------------------------
//get 'modules' page
app.get('/modules', verifyTokenAdmin, require('./routes/modules.js'));
//post ajouter-modules
app.post('/modules-ajt', verifyTokenAdmin, require('./routes/modules.js'));
//post modifier-modules
app.post('/modules-mdf', verifyTokenAdmin, require('./routes/modules.js'));
//post supprimer-modules
app.post('/modules-sp', verifyTokenAdmin, require('./routes/modules.js'));
// modules routes end--------------------------------------------

// associations modules/filieres routes start
//get 'associations' page
app.get('/associations', verifyTokenAdmin, require('./routes/associations.js'));
// post ajouter association
app.post('/association-ajt', verifyTokenAdmin, require('./routes/associations.js'));
// post supprimer association
app.post('/association-sp', verifyTokenAdmin, require('./routes/associations.js'));
// associations modules/filieres routes end


// enseignants routes start---------------------------------------
//get 'enseignants' page
app.get('/enseignants', verifyTokenAdmin, require('./routes/enseignants.js'));
//post ajouter-enseignants
app.post('/enseignants-ajt', verifyTokenAdmin,require('./routes/enseignants.js'));
//post modifier-enseignants
app.post('/enseignants-mdf', verifyTokenAdmin,require('./routes/enseignants.js'));
//post supprimer-enseignants
app.post('/enseignants-sp', verifyTokenAdmin, require('./routes/enseignants.js'));
// enseignants routes end-----------------------------------------

// demandes routes start------------------------------------------
//get 'demandes' page
app.get('/demandes', verifyTokenAdmin, require('./routes/demandes.js'));
//delete demande frm 'demandes' page admin
app.post('/delete-demande', verifyTokenAdmin, require('./routes/demandes.js'));   
//set 'dateRecuperation' of 'demande'
app.post('/recuperation-date', verifyTokenAdmin, require('./routes/demandes.js'));
// demandes routes end--------------------------------------------

// actualites routes start----------------------------------------
//get 'actualites' page
app.get('/actualites', verifyTokenAdmin, require('./routes/actualites.js'));
//post ajouter-actualite
app.post('/actualite-ajt', verifyTokenAdmin, require('./routes/actualites.js'));
//post modifier-actualite
app.post('/actualite-mdf', verifyTokenAdmin, require('./routes/actualites.js'));
//post supprimer-actualite
app.post('/actualite-sp', verifyTokenAdmin, require('./routes/actualites.js'));
// actualites routes end------------------------------------------

// actualites page (client side) start
//get page
app.get('/liste-actualites', require('./routes/actualite-client.js'));
// actualites page (client side) end

// modules page (client side) start
//get infiltered list
app.get('/liste-modules', require('./routes/modules-client.js'));
//get filtered list(/search-module path)
app.post('/search-modules', require('./routes/modules-client.js'));
// modules page (client side) end

// liste enseignants page (client side) start
//get 'liste-enseignants' page
app.get('/liste-enseignants', require('./routes/enseignant-rech.js'));
//search 'enseignants' by 'module'
app.post('/search-enseignants', require('./routes/enseignant-rech.js')); 
// liste enseignants page (client side) end

// espace etudiant page(client side) start
//get espace-etudiant page
app.get('/espace-etudiant', verifyTokenEtudiant, require('./routes/etudiant-client.js'));
//post 'demande'
app.post('/envoie-demande', verifyTokenEtudiant, require('./routes/etudiant-client.js'));
//get 'mesdemandes' page
app.get('/mesdemandes/:code', verifyTokenEtudiant, require('./routes/etudiant-client.js'));
//get 'mescours' page
app.get('/mesdocuments/:filiere/:annee', verifyTokenEtudiant, require('./routes/etudiant-client.js'));
//get '/download-document' resource to download a doc(espace-etudiant)
app.get('/download-document/:document', verifyTokenEtudiant, require('./routes/etudiant-client.js'));
// espace etudiant page(client side) end

//espace enseignant page(client side) start
//get 'espace-enseignant' page
app.get('/espace-enseignant', verifyTokenEnseignant, require('./routes/enseignant-client.js'));
//ajouter document
app.post('/ajt-document', verifyTokenEnseignant, require('./routes/enseignant-client.js'));
//get 'mes documents' page
app.get('/documents/:code', verifyTokenEnseignant, require('./routes/enseignant-client.js'));
//delete 'document' in 'mesdocuments' page
app.post('/supprimer-doc', verifyTokenEnseignant, require('./routes/enseignant-client.js'));
//get '/download' resource to download a doc(espace-enseignant)
app.get('/download/:document', verifyTokenEnseignant, require('./routes/enseignant-client.js'));
//get 'enseignant' demande page 
app.get('/enseignant-demande/:code', verifyTokenEnseignant, require('./routes/enseignant-client.js'));
//send 'enseignant' demande
app.post('/envoie-demande-enseignant', verifyTokenEnseignant, require('./routes/enseignant-client.js'));
//demandes 'enseignant'
app.get('/enseignant-mesdemandes/:code', verifyTokenEnseignant, require('./routes/enseignant-client.js'));
//espace enseignant page(client side) end

//starting server and listening on port 5000
app.listen(port, () => {
    console.log(`server listening on ${port}`);
});
//------------------------------------------------------


