//models
const Message = require('../models/Message.js');


//get contact page (client side)
const display_contact = async (req, res) => {
    try {
        const messageContact = req.flash('messageContact');
        res.render('contact', {title: 'Contact', messageContact});
    } catch (error) {
        console.log(errr);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/contact">en cliquant ici</a>');
    }
};

//post 'message' (contact form in contact page)
const sendMessage = async (req, res) => {
    try {
        const Nom = req.body.nom;
        const Prenom = req.body.prenom;
        const Email = req.body.email;
        const Content = req.body.message;
        await Message.create({
            nom: Nom.toUpperCase().trim(),
            prenom: Prenom.toUpperCase().trim(),
            email: Email,
            msgContent: Content
        }, {
                fields:['nom', 'prenom', 'email', 'msgContent'], //columns to be filled (others are auto in database)
                logging:false //stop squelize from logging sql in the console
            }); 
        //set message and redirect to home page
        req.flash('messageContact', 'Votre message est envoye ! Merci');
        res.redirect('/contact');
    } catch (error) {
        console.log(error);
    }
};

//get 'messages' (admin side)
const display_messages = async(req, res) => {
    try {
        //get messages from database
        const messages = await Message.findAll({attribute:[
            //attributes to select from table
            'idMessage',
            'nom',
            'prenom',
            'email',
            'msgContent',
            'created_at'
        ]});
        //convert to json format
        const processedMessages = await JSON.parse(JSON.stringify(messages));
        //reverse date format
        for(let msg of processedMessages){
            for(let key in msg){
                if(key === 'created_at'){
                    msg[key] = msg[key].split('-').reverse().join('-');
                }
            }
        }
        //set messageSupprime
        const messageSupprime = req.flash('messageSupprime');
        //render 'messages' page for admin
        res.render('message-template', {
            messagesData: processedMessages,
            title: 'Messages',
            messageSupprime
        });
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !');
    }
};

//delete a 'Message' from 'messages' page in admin side
const deleteMessage = async (req, res) => {
    try {
        //get id value of 'message'
        const idMsg = req.body.idMessage;
        //delete ,sg from database
        await Message.destroy({where: {idMessage: idMsg}});
        //redirect toward 'messages' page
        req.flash('messageSupprime', 'Message supprime !');
        res.redirect('/messages');

    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/messages">retourner a la page des messages</a>');
    }
};

module.exports = {
    display_contact,
    sendMessage,
    display_messages,
    deleteMessage
};