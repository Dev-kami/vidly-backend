const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const home = require("./routes/home");
const app = express();

app.use(express.json());
app.use("/", home);
app.use("/api/genres", genres);

// mongoose
//   .connect("mongodb://localhost/vidly")
//   .then("Successfully connected to MongoDB...")
//   .catch("Could not connect to MongoDB...");

// Connect mongo client
mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening in port ${port}...`));
