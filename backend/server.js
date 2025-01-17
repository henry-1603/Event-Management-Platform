const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors');
const WebSocket = require('ws');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Create an HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

const attendees = {}; // Store attendee counts per event

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'joinEvent') {
      const { eventId } = data;
      attendees[eventId] = (attendees[eventId] || 0) + 1;

      // Notify all clients about the new attendee count
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'attendeeUpdate',
            eventId,
            count: attendees[eventId],
          }));
        }
      });
    }

    if (data.type === 'leaveEvent') {
      const { eventId } = data;
      attendees[eventId] = Math.max((attendees[eventId] || 0) - 1, 0);

      // Notify all clients about the updated attendee count
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'attendeeUpdate',
            eventId,
            count: attendees[eventId],
          }));
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = 5001; // Use the PORT from the environment or default to 5001
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
