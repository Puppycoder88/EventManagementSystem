const Event = require("../models/EventCreation");

// Create a new event
exports.createEvent = async (req, res) => {
  const { eventName, category, date, time, description } = req.body;

  // Validate required fields
  if (!eventName || !date || !time || !description) {
    return res.status(400).json({ message: "Event name, date, time, and description are required" });
  }

  try {
    const newEvent = new Event({
      eventName,
      category: category || "Uncategorized", // Default category if not provided
      date,
      time,
      description,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};
