const Joi = require("joi");

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
  });

  const result = schema.validate(genre);
  return result;
};

module.exports = { validateGenre, validateCustomers };
