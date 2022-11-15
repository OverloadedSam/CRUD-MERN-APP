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

exports.validateUserData = (data) => {
  return ({ value, error } = Joi.object(userSchema).validate(data));
};
