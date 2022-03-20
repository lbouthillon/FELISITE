const db = require("../models/pool");
const config = require("../../config.json")
const { user } = require("../models/db");
function checkDuplicateUsernameOrEmail(req, res, next) {
    user.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }

        user.finOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is arleady in use!"
                });
                return;
            }
            next();
        });
    });
};
function checkRolesExisted(req, res, next) {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!config.db.ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;

