const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genres");

const movieSchemma = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    genre: {
        type: genreSchema,
        ref: "Genre",
    },
    description: {
        required: true,
        type: String,
        minlength: 10,
        maxlength: 500,
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
});

const Movie = mongoose.model("Movie", movieSchemma);

const validateMovie = (movie) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreName: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
        description: Joi.string().min(10).max(500).required(),
    });

    const result = schema.validate(movie);
    return result;
};

exports.Movie = Movie;
exports.validate = validateMovie;
