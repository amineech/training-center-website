const Sequelize = require('sequelize');
const sequelize = require('../config/basedonne.js');

const Filiere_Module = sequelize.define('filieres_modules', {
    filiere: {
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey: true,
    },
    module: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    }},{
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
});

module.exports = Filiere_Module;