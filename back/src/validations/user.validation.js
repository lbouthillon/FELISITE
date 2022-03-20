const Joi = require('joi');

const post = Joi.object().keys({
  pseudo: Joi.string()
    .min(1)
    .max(30)
    .required(),
  phone: Joi.string().min(7).max(15).required(),
});

const put = Joi.object().keys({
  username: Joi.string()
    .min(1)
    .max(30),
  firstName: Joi.string()
    .min(1)
    .max(30),
  lastName: Joi.string()
    .min(1)
    .max(30),
  pseudo: Joi.string()
    .min(1)
    .max(30),
  phone: Joi.string().min(7).max(15),
});

module.exports = { post, put };
