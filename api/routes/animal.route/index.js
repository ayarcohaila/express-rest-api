const express = require("express");
const animalController = require("../../controllers/animal.controller");
const weightController = require("../../controllers/weight.controller");

const weightRoutes = require("./weight.route");
const router = express.Router();

// Add a new Animal
router
  .route("/")
  .get(animalController.list)
  .post(animalController.create);

router.route("/estimated_weight").get(weightController.getEstimatedWeight);

router.use("/:animalId/weight", weightRoutes);

//
// // Get all Animals
// router.route("/animal").get(AnimalController.getAnimals);
//
// // Get an Estimated weight of :id Animals
// router.route("/animal/estimated_weight").get(AnimalController.estimatedWeight);

router.param("animalId", animalController.getAnimalById);

module.exports = router;
