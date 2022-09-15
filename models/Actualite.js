const Sequelize = require('sequelize');
const sequelize = require('../config/basedonne.js');

const Actualite = sequelize.define('actualites', {
    idActualite: {
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    objetActualite: {
        type:Sequelize.STRING,
        allowNull:false
    },
    contentActualite: {
        type:Sequelize.STRING,
        allowNull:false
    }},
    {
        createdAt:false,
        updatedAt:false,
        freezeTableName:true
    }
);

module.exports = Actualite;