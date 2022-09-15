const Sequelize = require('sequelize');
const sequelize = require('../config/basedonne');

const Filiere = sequelize.define('filieres', {
    //attributes
    codeFiliere:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    nomFiliere:{
        type:Sequelize.STRING,
        allowNull:false
    },
    abrvFiliere:{
        type:Sequelize.STRING,
        allowNull:false
    }
    },
    {//options
        updatedAt:false,
        createdAt:false,
        freezeTableName:true//table name same as model name
    });

module.exports = Filiere;