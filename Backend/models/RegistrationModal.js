const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  eventId: { type: String, required: true },
  eventName: { type: String, required: true },
});

RegistrationSchema.index({ email: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model("RegistrationModal", RegistrationSchema);
