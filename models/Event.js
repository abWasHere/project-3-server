const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String },
  date: { type: Date },
  time: { type: String },
  image: { type: String, default: "/images/eyes.png" },
  address: { type: String },
  location: {
    type: { type: String, enum: ["Point"] },
    coordinates: { type: [Number] },
    formattedAddress: String,
  },
  description: String,
  sport: {
    type: Schema.Types.ObjectId,
    ref: "Sport",
    required: true,
  },
  club: {
    type: Schema.Types.ObjectId,
    ref: "Club",
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
