const express = require('express');

//create router object
const router = express.Router();

//controller
const messages = require('../controllers/messages.js');

//get contact page (client side)
router.get('/contact', messages.display_contact);

//post 'message' (contact form in contact page)
router.post('/contact-page', messages.sendMessage);

//get 'messages' (admin side)
router.get('/messages', messages.display_messages);

//delete a 'Message' from 'messages' page in admin side
router.post('/delete-msg', messages.deleteMessage);


module.exports = router;
