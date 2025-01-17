const Event = require('../models/Event');
const { v4: uuidv4 } = require('uuid');


const createEvent = async (req, res) => {
  const { name, description, date } = req.body;
  const uniqueId = uuidv4();

  try {
    const event = await Event.create({id: uniqueId , name, description, date});

    if(event) {
      res.status(201).json({
        _id: uniqueId,
        name: event.name,
        description: event.description,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const joinEvent = async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body; // Assuming userId is passed in the request body

  try {
    // Find the event by its ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ status:300 ,message: 'Event not found' });
    }

    // Check if the user is already an attendee
    if (event.attendees.includes(userId)) {
      return res.status(200).json({ status: 400 ,message: 'User already joined this event' });
    }

    // Add the userId to the attendees array
    event.attendees.push(userId);
    await event.save(); // Save the updated event

    res.status(200).json(event); // Return the updated event
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createEvent, getEvents,joinEvent };
