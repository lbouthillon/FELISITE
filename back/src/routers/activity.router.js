const express = require('express');

const router = new express.Router();
const { activity } = require('../controllers');
const { validate, rightVal } = require('../validations');

router.route('/').get(rightVal.auth, activity.getActivities);
// router.route('/').post(rightVal.auth, validate(teamVal.post), team.postTeam);
// router.route('/:id').get(rightVal.auth, team.getTeam);
// router.route('/:id').put(rightVal.auth, validate(teamVal.put), team.putTeam);
// router.route('/:id').delete(rightVal.auth, team.delTeam);
// router.route('/:id/users').get(rightVal.auth, team.getUsers);
// router.route('/:id/user').post(rightVal.auth, validate(teamVal.userTeam), team.addUser);
// router.route('/:id/user').delete(rightVal.auth, validate(teamVal.userTeam), team.delUser);

module.exports = router;