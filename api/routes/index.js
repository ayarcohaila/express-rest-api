const express = require("express");
const config = require("../../config");
const animalRoute = require("./animal.route");

const router = express.Router();

router.use("/animal", animalRoute);

module.exports = router;
