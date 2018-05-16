const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const positiveNumber = num => num > 0;

const animalSchema = new Schema({
  id: {
    type: "Number",
    required: true,
    unique: true,
    validate: [positiveNumber, "ID should be bigger than 1"]
  },
  weights: [
    {
      type: Schema.Types.ObjectId,
      ref: "Weight"
    }
  ]
});

module.exports = mongoose.model("Animal", animalSchema);
