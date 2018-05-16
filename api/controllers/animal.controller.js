const Animal = require("../models/animal.model");
const Weight = require("../models/weight.model");
const mongoose = require("mongoose");

// Add animal
export function create(req, res, next) {
  const animal = new Animal({
    id: req.body.id
  });

  animal
    .save()
    .then(newAnimal => {
      res.json(newAnimal);
    })
    .catch(next);
}

export function read(req, res) {
  res.json(req.animalModel);
}

export function list(req, res, next) {
  const weightObj = new Weight();
  Animal.find()
    .populate("weights", "-_id -__v -animal")
    .select("-_id -__v")
    .then(animals => {
      res.json(animals);
    })
    .catch(next);
}

export function getAnimalById(req, res, next, id) {
  Animal.findOne({ id: id })
    .then(animal => {
      if (!animal) {
        res.status(404).json({ message: "Animal not found" });
        return;
      }

      req.animal = animal;
      next();
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
}
