const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");

router.get("/", async (req, res) => {
  const users = await User.find();

  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (!error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
