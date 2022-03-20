const config = require('../../config.json')

const db = require('./pool')
const {DataTypes} = require('sequelize')

exports.Activity = db.sequelize.define('activity', {
    name: {
        type: DataTypes.STRING(55),
        allowNull: false,
    },
    MJ: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(16000),
        allowNull: false,
    }
},
)