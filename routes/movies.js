const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const { Movie, validate } = require("../models/movies");
const { Genre } = require("../models/genres");

const router = express.Router();

router.get("/", async (req, res) => {
    const movies = await Movie.find().sort("title");
    res.send(movies);
});

router.post("/", [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = await Genre.findOne({ name: req.body.genreName });
    if (!genre) return res.status(400).send("Invalid genre.");

    const existingMovie = await Movie.findOne({ title: req.body.title });
    if (existingMovie) return res.status(400).send("Movie already exists.");

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name,
        },
        description: req.body.description,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });
    await movie.save();

    res.send(movie);
});

router.put("/:id", [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(send("Invalid genre."));

    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name,
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
        },
        { new: true }
    );
    if (!movie) return res.status(404).send("The movie with the given ID was not found");

    res.send(movie);
});

router.delete("/:title", [auth, admin], async (req, res) => {
    const movie = await Movie.findOneAndRemove({
        title: req.params.title,
    });
    if (!movie)
        return res.status(404).json({
            status: "fail",
            message: "The movie with the given title was not found",
        });

    res.status(200).json({ status: "success", data: movie });
});

router.get("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send("The movie with the given ID was not found");

    res.send(movie);
});

module.exports = router;
