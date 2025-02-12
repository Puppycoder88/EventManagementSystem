const RegistrationModal = require("../models/RegistrationModal"); // Ensure correct path
const Event = require('../models/EventCreation'); // Import event model

const getAllAttendees = async (req, res) => {
  try {
    // Fetch all attendees and populate the eventName from EventModel
    const attendees = await RegistrationModal.find().populate("eventId", "eventName");

    if (!attendees.length) {
      return res.status(404).json({ message: "No attendees found" });
    }

    // Map the response to include eventName in each attendee record
    const formattedAttendees = attendees.map(attendee => ({
      name: attendee.name,
      email: attendee.email,
      eventName: attendee.eventName,
    }));

    res.status(200).json(formattedAttendees);
  } catch (error) {
    console.error("Error fetching attendees:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllAttendees };
