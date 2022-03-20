const config = require('../../config.json');
const db = require('./pool')
const {DataTypes} = require('sequelize')
const fs = require("fs");

exports.User = db.sequelize.define('users', {
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }
})
