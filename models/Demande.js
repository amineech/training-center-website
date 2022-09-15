const flash = require('connect-flash/lib/flash');
const Sequelize = require('sequelize');
const sequelize = require('../config/basedonne.js');

const Demande = sequelize.define('demandes', {
    //attributes
    idDemande: {
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nom: {
        type:Sequelize.STRING,
        allowNull:false
    },
    prenom: {
        type: Sequelize.STRING,
        allowNull:false
    },
    code: {
        type: Sequelize.STRING,
        allowNull:false
    },
    objetDemande: {
        type:Sequelize.STRING,
        allowNull:false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    dateRecuperation: {
        type: Sequelize.DATE,
        allowNull: true
    },
    contentDemande: {
        type:Sequelize.STRING,
        allowNull:false
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false
    }},
    {//options
        createdAt:false,
        updatedAt:false,
        freezeTableName:true
    });

module.exports = Demande;