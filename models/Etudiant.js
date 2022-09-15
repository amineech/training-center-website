const Sequelize = require('sequelize');
const sequelize = require('../config/basedonne.js');

const Etudiant = sequelize.define('etudiants', {
    //attributes
    codeEtudiant:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    nom:{
        type:Sequelize.STRING,
        allowNull:false
    },
    prenom:{
        type:Sequelize.STRING,
        allowNull:false
    },
    dateNaissance:{
        type:Sequelize.DATE,
        allowNull:false
    },
    filiere:{
        type:Sequelize.STRING,
        allowNull:false
    },
    annee:{
        type:Sequelize.STRING,
        allowNull:false
    },
    telephone:{
        type:Sequelize.STRING,
        allowNull:false
    },
    adresse:{
        type:Sequelize.STRING,
        allowNull:false
    },
    utilisateur:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }},
    {//options
        updatedAt:false,
        createdAt:false,
        freezeTableName:true//table name same as model name
    });

module.exports = Etudiant;