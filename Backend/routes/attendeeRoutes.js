const express = require("express");
const { getAllAttendees } = require("../controllers/attendeeController");

const router = express.Router();

// Get attendees for a specific event
router.get("/", getAllAttendees);

module.exports = router;
