import { Router } from "express";
import * as AnimalController from "../controllers/animal.controller";

const router = new Router();

// Add a new Animal
router.route("/animal").post(AnimalController.addAnimal);

// Add an Animal's Weight of :id
router.route("/animal/:id/weight").post(AnimalController.addWeight);
//
// // Get all Animals
// router.route("/animal").get(AnimalController.getAnimals);
//
// // Get an Estimated weight of :id Animals
// router.route("/animal/estimated_weight").get(AnimalController.estimatedWeight);

export default router;
