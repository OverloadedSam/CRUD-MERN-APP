const Joi = require('joi');

const userSchema = {
  firstName: Joi.string().min(2).max(128).trim().required().label('First name'),
  lastName: Joi.string().max(128).trim().allow('').label('Last name'),
  email: Joi.string().email().min(4).trim().required().label('E-mail'),
  phone: Joi.string().min(10).max(10).required().trim().label('Phone number'),
  address: Joi.string().min(5).max(1024).trim().required().label('Address'),
  dateOfBirth: Joi.date().required().label('Date of birth'),
  password: Joi.string().required().label('Password'),
};

const validateUserData = (data) => {
  return ({ value, error } = Joi.object(userSchema).validate(data));
};

const validateUpdatedUserData = (data) => {
  const keys = Object.keys(data);
  const userUpdateSchema = {};

  keys.forEach((key) => {
    userUpdateSchema[key] = userSchema[key];
  });

  return ({ value, error } = Joi.object(userUpdateSchema).validate(data));
};

module.exports = {
  validateUserData,
  validateUpdatedUserData,
};
