const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

// const genreSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//       minlength: 5,
//       maxlength: 50,
//     },
//   });

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
  });

  const result = schema.validate(genre);
  return result;
};

// Get All genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Get a genre by id
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  res.send(genre);
});

// Add a genre
router.post("/", async (req, res) => {
  // Input validation
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  // If req.body.name === the name of any genre in the genres array, return 400
  const existingGenre = genres.find((g) => g.name === req.body.name);
  if (existingGenre) return res.status(400).send("Genre already exists");

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

// Update a genre
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  res.send(genre);
});

// Delete a genre
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  res.send(genre);
});

module.exports = router;
