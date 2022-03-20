const db = require("../models/pool");
const config = require("../../config");
const { user, role, userRoles } = require("../models/db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  user.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(u => {
      // if (req.body.roles) {
      //   role.findAll({
      //     where: {
      //       name: {
      //         [Op.or]: req.body.roles
      //       }
      //     }
      //   }).then(roles => {
      //     u.setRoles(roles).then(() => {
      //       res.send({ message: "User was registered successfully!" });
      //     });
      //   });
      // } else {
        // user role = 1
        // u.setRoles([1]).then(() => {
        userRoles.create({
          roleId : 1,
          userId : u.id,
        }).then(r => {
          res.send({ message: "User was registered successfully!" });
        });
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  user.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(u => {
      if (!u) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        u.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: u.id }, config.token_secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      // u.getRoles().then(roles => {
      //   for (let i = 0; i < roles.length; i++) {
      //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
      //   }
        res.status(200).send({
          id: u.id,
          username: u.username,
          email: u.email,
          roles: [1],
          accessToken: token
        // });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};