const Sequelize = require('sequelize');
const sequelize = require('../config/basedonne');

const Message = sequelize.define('messages', {
    //attributes
    idMessage: {
        type: Sequelize.INTEGER,
        allowNulll:false,
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
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    msgContent:{
        type:Sequelize.STRING,
        allowNull:false
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false
    }},
    {//options
        updatedAt:false,
        createdAt:false,
        freezeTableName:true//table name same as model name
    });

module.exports = Message;