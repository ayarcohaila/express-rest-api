import Animal from "../models/animal";
import Weight from "../models/weight";

// Add animal
export function addAnimal(req, res) {
  if (!req.body.id) {
    res.status(403).end();
  }

  let animalObj = {};

  animalObj = {
    id: req.body.id
  };

  let newAnimal = new Animal(animalObj);

  newAnimal.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ animal: saved });
  });
}

export function addWeight(req, res) {
  let weightObj = {};

  weightObj = {
    weight_id: req.body.id,
    weight: req.body.weight,
    weigh_date: req.body.weigh_date
  };

  let newWeight = new Weight(weightObj);
}
