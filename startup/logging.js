require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  // process.on("uncaughtException", (ex) => {
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });

  // winston.handleExceptionss(
  //   new winston.transports.File({ filename: "uncaughtExceptions.log" })
  // );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });

  // winston.add(winston.transports.MongoDB, {
  //   db: "mongodb://localhost/vidly",
  //   level: "error",
  // });
  // throw new Error("Something failed during startup.");
};
