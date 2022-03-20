const config = require('../../config.json');
const db = require('./pool')
const {DataTypes} = require('sequelize')
const fs = require("fs");

exports.Role = db.sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
});