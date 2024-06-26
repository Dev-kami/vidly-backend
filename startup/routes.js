const express = require("express");
const genres = require("../routes/genres");
const home = require("../routes/home");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
    app.use(express.json());
    app.use("/", home);
    app.use("/api/genres", genres);
    app.use("/api/customers", customers);
    app.use("/api/movies", movies);
    app.use("/api/auth", auth);
    app.use("/api/rentals", rentals);
    app.use("/api/users", users);

    app.all("*", (req, res) => {
        res.status(404).json({
            status: "fail",
            message: `Can't find a route with this ${req.originalUrl} url`,
        });
    });
    app.use(error);
};
