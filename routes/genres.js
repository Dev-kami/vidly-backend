// http://vidly.com/api/genres
const Joi = require("joi");
const express = require("express");

const router = express.Router();

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
  });

  const result = schema.validate(genre);
  return result;
};

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
  { id: 4, name: "Comedy" },
  { id: 5, name: "Thriller" },
  { id: 6, name: "Drama" },
  { id: 7, name: "Adventure" },
  { id: 8, name: "Mystery" },
  { id: 9, name: "Crime" },
  { id: 10, name: "Fantasy" },
];

// Get All genres
router.get("/", (req, res) => {
  res.send(genres);
});

// Get a genre by id
router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  res.send(genre);
});

// Add a genre
router.post("/", (req, res) => {
  // Input validation
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  // If req.body.name === the name of any genre in the genres array, return 400
  const existingGenre = genres.find((g) => g.name === req.body.name);
  if (existingGenre) return res.status(400).send("Genre already exists");

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

// Update a genre
router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  // Update
  genre.name = req.body.name;
  res.send(genre);
});

// Delete a genre
router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  const index = genres.indexOf(genre);

  // Delete
  genres.splice(index, 1);
  res.send(genre);
});

module.exports = router;
