// http://vidly.com/api/genres

const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("This is the home page of Vidly backend");
});

// Get All genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// Get a genre by id
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  res.send(genre);
});

// Add a genre
app.post("/api/genres", (req, res) => {
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
app.put("/api/genres/:id", (req, res) => {
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
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  const index = genres.indexOf(genre);

  // Delete
  genres.splice(index, 1);
  res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening in port ${port}...`));
