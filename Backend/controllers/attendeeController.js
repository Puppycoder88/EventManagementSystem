const RegistrationModal = require("../models/RegistrationModal"); // Ensure correct path
// const Event = require('../models/EventCreation'); // Import event model

// Get all attendees
const getAllAttendees = async (req, res) => {
  try {
    // Fetch all attendees and populate the eventName from Event model
    const attendees = await RegistrationModal.find().populate("eventId", "eventName");

    if (!attendees.length) {
      return res.status(404).json({ message: "No attendees found" });
    }

    // Map response to include eventName in each attendee record
    const formattedAttendees = attendees.map(attendee => ({
      _id: attendee._id, // Include ID for deletion
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

// Delete a single attendee
const deleteAttendee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAttendee = await RegistrationModal.findByIdAndDelete(id);
    if (!deletedAttendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    res.status(200).json({ message: "Attendee deleted successfully" });
  } catch (error) {
    console.error("Error deleting attendee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete multiple attendees
const deleteMultipleAttendees = async (req, res) => {
  const { attendeeIds } = req.body; // Expect an array of attendee IDs

  if (!attendeeIds || !Array.isArray(attendeeIds) || attendeeIds.length === 0) {
    return res.status(400).json({ message: "Invalid attendee IDs provided" });
  }

  try {
    const result = await RegistrationModal.deleteMany({ _id: { $in: attendeeIds } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No attendees found for deletion" });
    }

    res.status(200).json({ message: `${result.deletedCount} attendees deleted successfully` });
  } catch (error) {
    console.error("Error deleting attendees:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllAttendees, deleteAttendee, deleteMultipleAttendees };
