const Sequelize = require('sequelize');
const sequelize = require('../config/basedonne');

const User = sequelize.define('users', {
    //attributes
    idUser:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role:{
        type:Sequelize.STRING,
        allowNull:false
    }},{   //options
        updatedAt:false,
        createdAt:false,
        freezeTableName:true//table name as model name
    });

module.exports = User;