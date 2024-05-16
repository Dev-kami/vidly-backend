const Joi = require("joi");

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
  });

  const result = schema.validate(genre);
  return result;
};

const validateCustomers = (customer) => {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
  });

  const result = schema.validate(customer);
  return result;
};

module.exports = { validateGenre, validateCustomers };
