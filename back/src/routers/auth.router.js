const express = require('express');
const { verifySignUp } = require("../middleware");
const controller = require("../controllers");
const { expression } = require("joi");
// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });
//   app.post(
//     "/api/auth/signup",
//     [
//       verifySignUp.checkDuplicateUsernameOrEmail,
//       verifySignUp.checkRolesExisted
//     ],
//     controller.signup
//   );
//   app.post("/api/auth/signin", controller.signin);
// };
const router = new express.Router();

router.route('/signup').post([ verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted ],controller.auth.signup);
router.route('/signin').post(controller.auth.signin);

module.exports = router;