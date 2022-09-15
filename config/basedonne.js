const { Sequelize } = require('sequelize');
require('dotenv').config();

//environement variables
const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const sequelize = new Sequelize(database, user, password, {
    hostname: host,
    dialect:'mysql',
    logging:false
});

sequelize.authenticate()
        .then(() => {
           console.log('Connexion etablit');
        })
        .catch((err) => {
            console.log('Erreur de connexion');
        });

module.exports = sequelize;
