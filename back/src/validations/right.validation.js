const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const { user } = require('../models/db');

// Validate tokens sent by front
const auth = (req, res, next) => {
  if (config.env === 'prod') {
    // if (!req.headers.token) {
    //   return res.status(401).end('Token required');
    // }

    // jwt.verify(
    //   req.headers.token,
    //   config.token_secret,
    //   (err, decoded) => {
    //     if (err) {
    //       return res.status(401).end('Token is invalid');
    //     }
    //     req.user = decoded;
    //   },
    // );
    if(req.user === undefined){
      return res.status(401).end("Unauthorized");
    } 
    if(req.user.login === undefined){
      return res.status(401).end("Unauthorized");
    }
    user.findOne({ where: { username: req.user.login } }).catch((err) => {
      res.status(401).end('Error - user not found');
      console.error(err);
    }).then((data) => {
      if (data === null) {
        return res.status(401).end('Unauthorized');
      }
      req.right = data.dataValues.admin;
      req.teamId = data.dataValues.teamId;
      next();
    });
  } else {
  req.user = { login: '2020bouthilll', fullName: 'Louis Bouthillon', iat: 1560165032 };
  req.right = 'SUPERADMIN';
  next();
  }
};

// const authAdmin = (req, res, next) => {
//   if (!req.headers.token) {
//     return res.status(401).end('Token required');
//   }

//   jwt.verify(
//     req.headers.token,
//     config.token_secret,
//     (err, decoded) => {
//       if (err) {
//         return res.status(401).end('Token is invalid');
//       }
//       req.user = decoded;
//     },
//   );
//   user.findOne({ where: { username: req.user.login } }).catch((err) => {
//     res.status(401).end('Error - user not found');
//     console.error(err);
//   }).then((data) => {
//     if (data === null) {
//       return res.status(401).end('Unauthorized');
//     }

//     req.right = data.dataValues.admin;
//     req.teamId = data.dataValues.teamId;
//     if (req.right === 'ADMIN' || req.right === 'SUPERADMIN') {
//       next();
//     } else {
//       return res.status(401).end('Unauthorized');
//     }
//   });
// };

// const authSuperAdmin = (req, res, next) => {
//   if (!req.headers.token) {
//     return res.status(401).end('Token required');
//   }

//   jwt.verify(
//     req.headers.token,
//     config.token_secret,
//     (err, decoded) => {
//       if (err) {
//         return res.status(401).end('Token is invalid');
//       }
//       req.user = decoded;
//     },
//   );
//   user.findOne({ where: { username: req.user.login } }).catch((err) => {
//     console.err(err);
//     res.status(401).end('Error - user not found');
//   }).then((data) => {
//     if (data === null) {
//       return res.status(401).end('Unauthorized');
//     }

//     req.right = data.dataValues.admin;
//     req.teamId = data.dataValues.teamId;
//     if (req.right === 'SUPERADMIN') {
//       next();
//     } else {
//       return res.status(401).end('Unauthorized');
//     }
//   });
// };

module.exports = {
  auth,
  // authAdmin,
  // authSuperAdmin,
};
