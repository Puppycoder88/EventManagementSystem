const express = require('express');
const {createEvent} = require('../controllers/eventcreationController');

const router = express.Router();

router.post("/", createEvent);

module.exports = router;
