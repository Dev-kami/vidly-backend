const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const admin = require("../middleware/admin");

router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

router.get("/", auth, async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json({ status: "success", data: users });
});

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send("The user with the given ID was not found");
    res.send(user);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User(
        _.pick(req.body, ["firstName", "lastName", "email", "password", "role", "date"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    res.header("x-auth-token", token).json({
        status: 200,
        user: _.pick(user, ["_id", "firstName", "lastName", "email", "role", "_id"]),
    });
});

router.delete("/:id", [auth, admin], async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) res.send(400).json({ status: 400, message: "The user with this ID was not found" });

    await user.save();

    res.json({
        status: 200,
        user: _.pick(user, ["_id", "firstName", "lastName", "email"]),
    });
});

module.exports = router;
