const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 50,
  },
});

const Register = mongoose.model("Register", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().required(),
    password: Joi.number().min(8).max(50).required(),
  });

  const result = schema.validate();
  return result;
}

exports.Register = Register;
module.exports = validateUser;
