import React from 'react';


const EventCard = ({ event, onJoin }) => {

  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.data?.role; // Extract user ID (adjust this based on your actual user object structure)
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-bold text-blue-600">{event.name}</h3>
      <p className="mt-2 text-gray-700">{event.description}</p>
      <p className="mt-2 text-sm text-gray-500">
        Date: {new Date(event.date).toLocaleString()}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Attendees: {event.attendees?.length || 0}
      </p>
      {onJoin && (
        <button
          className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={() => onJoin(event._id)}
        >
          Join Event
        </button>
      )}
    </div>
  );
};

export default EventCard;
