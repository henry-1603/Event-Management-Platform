const express = require('express');
const { createEvent, getEvents,joinEvent} = require('../controllers/eventController');

const router = express.Router();

router.route('/').post( createEvent).get( getEvents);
router.route('/:eventId/join').put(joinEvent);

module.exports = router; // Ensure this is `module.exports`
