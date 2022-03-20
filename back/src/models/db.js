const config = require('../../config.json');
const seeds = require('./seeds/index');

const db = require('./pool')


db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log(err);
        console.error('Unable to connect to the database:', err);
    })

const user = require('./user').User
const role = require('./role').Role
const activity = require('./activity').Activity


const userActivities = require('./userActivities').UserActivities;
const userRoles = require('./userRoles').UserRoles;
// const { UserActivities } = require('./userActivities');

role.hasMany(userRoles, {foreignKey: "roleId", otherKey: "userId"});
user.hasMany(userRoles, {foreignKey: "roleId", otherKey: "userId"});

userRoles.belongsTo(user);
userRoles.belongsTo(role);



activity.hasMany(userActivities, {foreignKey: {name: 'activityId', allowNull: false}});
user.hasMany(userActivities, {foreignKey: {name: 'userId', allowNull: false}});

userActivities.belongsTo(activity);
userActivities.belongsTo(user);

db.sequelize.sync().then(() => {
    role.findOne({}).then((data) => {
        if (data === null) {
            role.bulkCreate(seeds.roles, {validate: true}).then(() => console.log("roles succsefully inserted")).catch((e) => console.log(e));
        }
    });
});





module.exports = {
    user, activity, role, userActivities, userRoles,
};
