const Sequelize = require('sequelize');
const sequelize = require('../config/basedonne.js');

const Module = sequelize.define('modules',{
    //attributes
    codeModule: {
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    nomModule: {
        type:Sequelize.STRING,
        allowNull:false
    },
    annee:{
        type: Sequelize.INTEGER,
        allowNull:false
    }},
    {//options
        createdAt:false,
        updatedAt:false,
        freezeTableName:true
    });


module.exports = Module;