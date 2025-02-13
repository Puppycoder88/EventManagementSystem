const express = require("express");
const { getAllAttendees, deleteAttendee, deleteMultipleAttendees } = require("../controllers/attendeeController");

const router = express.Router();

// Get all attendees
router.get("/", getAllAttendees);

// Delete a single attendee
// router.delete("/:id", deleteAttendee);

// Delete multiple attendees
router.post("/delete", deleteMultipleAttendees);

module.exports = router;
