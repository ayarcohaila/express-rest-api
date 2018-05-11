import mongoose from "mongoose";
import Animal from "./animal";
const Schema = mongoose.Schema;

const weightSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "Animal" },
  weight_id: { type: "Number", required: true },
  weight: { type: "Number", required: true },
  weigh_date: { type: "Date", default: new Date() }
});

module.exports = mongoose.model("Weight", weightSchema);
