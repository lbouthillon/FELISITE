const config = require("../../config.json");
const {Sequelize} = require("sequelize");

exports.sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    
    config.db.password, {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    },
    config.db.ROLES,
);
