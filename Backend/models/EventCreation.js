const mongoose = require("mongoose");

// Define Event Schema
const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  category: { type: String }, // Add category
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
});

// Create Event Model
const Event = mongoose.model("EventCreation", eventSchema);

module.exports = Event;
