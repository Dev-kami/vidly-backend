// const Joi = require("joi");

// module.exports = function () {
//   Joi.objectId = require("joi-objectid")(Joi);
// };

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = Joi;
