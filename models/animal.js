import mongoose from "mongoose";
import Weight from "./weight";
const Schema = mongoose.Schema;

const animalSchema = new Schema({
  id: { type: "Number", required: true },
  weights: [
    {
      type: Schema.Types.ObjectId,
      ref: "Weight"
    }
  ]
});

module.exports = mongoose.model("Animal", animalSchema);
