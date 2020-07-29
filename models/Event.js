const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, default: URL("../public/images/eyes.png") },
  address: {
    type: { type: String, enum: ["Point"] },
    coordinates: { type: [Number] },
    formattedAddress: String,
    required: true,
  },
  description: String,
  sport: {
    type: Schema.Types.ObjectId,
    ref: "Sport",
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Club",
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;