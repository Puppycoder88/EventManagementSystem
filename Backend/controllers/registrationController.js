const Registration = require("../models/RegistrationModal");

const registerUser = async (req, res) => {
  try {
    const { eventId, name, email, eventName } = req.body;

    const existingRegistration = await Registration.findOne({ eventId, email });
    if (existingRegistration) {
      return res.status(400).json({ message: "User already registered for this event" });
    }

    const newRegistration = new Registration({ eventId, name, email, eventName });
    await newRegistration.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

module.exports = { registerUser };
