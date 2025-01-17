import React, {useEffect,useState } from 'react';
import EventCard from './EventCard';
import api from '../../utils/api'
import { toast } from 'react-toastify'; // Import toast components

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState('');
  const [ws, setWs] = useState(null); // Define WebSocket state here

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events'); // Replace with your actual API URL
      console.log(response.data);
      console.log(response.data);
      setEvents(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      console.log(events);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch events on component mount
    fetchEvents();

    // Create WebSocket connection
    const webSocket = new WebSocket('ws://localhost:5001'); // Replace with your actual WebSocket server URL

    webSocket.onopen = () => {
      console.log('WebSocket connection established');
    };

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'attendeeUpdate') {
        // Update the event attendees count in the state
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === data.eventId
              ? { ...event, attendees: data.count } // Assuming your event has an 'attendees' property
              : event
          )
        );
      }
    };

    webSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(webSocket); // Store the WebSocket instance in state

    return () => {
      webSocket.close(); // Clean up on component unmount
    };
  }, []);

const handleJoin = async (eventId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.data?._id; // Extract user ID (adjust this based on your actual user object structure)
  const role = user?.data?.role;

  if (role === 'guest') {
         toast.error("Can't access in guest mode, Kindly Login!!");
   
    return;
  }
  if (!userId) {
    console.error('User not found in localStorage');
    return;
  }
  try {
    const response = await api.put(`/events/${eventId}/join`, {
      userId, // Pass userId directly in the request body
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    
    if(response.data.status == 400) {
      toast.error(response.data.message);
      return;
    }

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'joinEvent', eventId }));
      toast.success('You have successfully joined the event');
    }


    window.location.reload();
   

  } catch (err) {
    console.error(err.message);
  }
};


  return (
    <div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event,index) => (
          <EventCard key={index} event={event} onJoin={handleJoin} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
