const express = require("express");
const weightController = require("../../controllers/weight.controller");

const router = express.Router();

// Add an Animal's Weight of :id
router
  .route("/")
  .get(weightController.list)
  .post(weightController.create);

module.exports = router;
