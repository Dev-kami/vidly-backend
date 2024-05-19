const mongoose = require("mongoose");
const winston = require("winston");
module.exports = function () {
  // Connect mongo client
  mongoose
    .connect("mongodb://localhost/vidly", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info("Connected to MongoDB..."));
};
