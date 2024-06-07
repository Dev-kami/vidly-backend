const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("This is the home page of Vidly backend");
});

module.exports = router;
