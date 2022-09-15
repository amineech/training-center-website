const flash = require('connect-flash/lib/flash');
const Sequelize = require('sequelize');
const sequelize = require('../config/basedonne.js');

const Enseignant = sequelize.define('enseignants', {
    codeEnseignant: {
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    nom: {
        type: Sequelize.STRING,
        allowNull:false
    },
    prenom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false
    },
    module: {
        type: Sequelize.STRING,
        allowNull: false
    },
    utilisateur: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }},{
        createdAt:false,
        updatedAt:false,
        freezeTableName:true
    });

    module.exports = Enseignant;