const mongoose = require("mongoose");
const sequenceGenerator = require("mongoose-sequence-plugin");
const Schema = mongoose.Schema;

const positiveNumber = num => num > 0;

const weightSchema = new Schema({
  animal: { type: Schema.Types.ObjectId, ref: "Animal" },
  weight_id: Number,
  weight: {
    type: "Number",
    default: 0,
    validate: [positiveNumber, "Weight should be bigger than 0"]
  },
  weigh_date: { type: "Date", default: Date.now }
});

weightSchema.plugin(sequenceGenerator, {
  field: "weight_id",
  startAt: 200
});

module.exports = mongoose.model("Weight", weightSchema);
