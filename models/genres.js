const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
});

const Genre = mongoose.model("Genre", genreSchema);

const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
    });

    const result = schema.validate(genre);
    return result;
};

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
