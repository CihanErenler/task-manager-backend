const joi = require("@hapi/joi");

const signupValidator = (body) => {
  const schema = joi.object({
    name: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().min(6).max(18).required(),
  });

  return schema.validate(body);
};

const signinValidator = (body) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required(),
  });

  return schema.validate(body);
};

module.exports = { signupValidator, signinValidator };
