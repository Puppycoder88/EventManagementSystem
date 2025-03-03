const Event = require("../models/EventCreation");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort by ascending date
    console.log(events)
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Error fetching events" });
  }
};

exports.addEvent = async (req, res) => {
  try {
    const { eventName, category, date, description } = req.body;
    
    if (!eventName || !date) {
      return res.status(400).json({ error: "Event name and date are required" });
    }

    const newEvent = new Event({ eventName, category, date, description });
    await newEvent.save();
    
    res.status(201).json({ message: "Event added successfully" });
  } catch (err) {
    console.error("Error adding event:", err);
    res.status(500).json({ error: "Error adding event" });
  }
};
