const Joi = require('joi');
const userVal = require('./validations/user.validation');
const rightVal = require('./validations/right.validation');

const validate = (schema) => (req, res, next) => {
  try{
  schema.validate(req.body)
  return next()}
  catch (e) {
    return res.status(400).send(err)
  }
};

module.exports = {
  validate,
  userVal,
  rightVal,
};
