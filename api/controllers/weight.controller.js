const mongoose = require("mongoose");
const Weight = require("../models/weight.model");
const Animal = require("../models/animal.model");

// Add weight
export function create(req, res, next) {
  const weight = new Weight(req.body);
  weight.animal = req.animal._id;

  req.animal.weights.push(weight._id);
  const animalObj = new Animal(req.animal);
  animalObj.save();

  weight
    .save()
    .then(newWeight => {
      res.json(newWeight);
    })
    .catch(next);
}

export function read(req, res) {
  res.json(req.weight);
}

export function list(req, res, next) {
  console.log("animal id: ", req.animal);
  Weight.find()
    .then(weights => {
      res.json(weights);
    })
    .catch(next);
}

export function getEstimatedWeight(req, res, next) {
  const givenDate = new Date(req.query.date);
  Weight.aggregate([
    {
      $group: {
        _id: "$animal",

        entry: {
          $push: {
            weigh_date: "$weigh_date",
            weight: "$weight"
          }
        }
      }
    }
  ]).exec((err, result) => {
    if (err) {
      res.status(422).send({
        message: err.message
      });
    }

    let totalWeight = 0;
    const num_animals = result.length;
    for (let i = 0; i < result.length; i++) {
      const objGt = result[i].entry.find(element => {
        return element.weigh_date > givenDate;
      });

      const objLt = result[i].entry.find((element, next) => {
        return element.weigh_date < givenDate;
      });
      const ltDate = new Date(objLt.weigh_date).getDate();
      const gtDate = new Date(objGt.weigh_date).getDate();
      const ltWeight = objLt.weight;
      const gtWeight = objGt.weight;

      const weightPerDay = (gtWeight - ltWeight) / (gtDate - ltDate);
      const weightPerAnimal =
        ltWeight + weightPerDay * (givenDate.getDate() - ltDate);
      totalWeight += weightPerAnimal;
    }
    res.json({ num_animals, estimated_total_weight: totalWeight });
  });
}

export function getWeightById(req, res, next, id) {
  Weight.findOne()
    .then(weight => {
      if (!weight) {
        res.status(404).json({ message: "Weight not found" });
        return;
      }

      req.weight = weight;
      next();
    })
    .catch(next);
}
