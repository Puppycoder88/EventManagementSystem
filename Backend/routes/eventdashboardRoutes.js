const express = require("express");
const { getAllEvents, addEvent } = require("../controllers/eventdashboardController");

const router = express.Router();

// Get all events (no filtering since frontend handles it)
router.get("/", getAllEvents);

// Add a new event
router.post("/", addEvent);

module.exports = router;
