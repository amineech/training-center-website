const Sequelize = require('sequelize');
const sequelize = require('../config/basedonne.js');

const Document = sequelize.define('documents', {
    idDoc: {
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    document: {
        type:Sequelize.STRING,
        allowNull:false
    },
    filiere: {
        type:Sequelize.STRING,
        allowNull:false
    },
    annee: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    enseignant: {
        type: Sequelize.STRING,
        allowNull: false
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false
    }},
    {
        createdAt:false,
        updatedAt:false,
        freezeTableName:true
    }
);

module.exports = Document;