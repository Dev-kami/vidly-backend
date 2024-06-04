const validateObjectId = require("../middleware/validateObjectId");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const express = require("express");
const { Genre, validate } = require("../models/genres");
const router = express.Router();

// Get All genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Get a genre by id
router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  res.send(genre);
});

// Add a genre
router.post("/", auth, async (req, res) => {
  // Input validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  let genre = new Genre({ name: req.body.name });
  const existingGenre = await Genre.findOne({ name: req.body.name });
  if (existingGenre) return res.status(400).send("Genre already exists");

  genre = await genre.save();
  res.send(genre);
});

// Update a genre
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
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
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  res.send(genre);
});

module.exports = router;
