import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const EventForm = ({ initialData = {} }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [date, setDate] = useState(initialData.date || '');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await api.post('/events', { name, description, date });
      console.log(response);
      navigate("/dashboard"); // Navigate to the dashboard on successful event creation
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to create the event. Please try again.'); // Set error message
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Navigate back to the dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-900">
      <form onSubmit={handleSubmit} className="p-6 bg-gray-800 text-white shadow-md rounded-md w-11/12 sm:w-1/2 max-w-md">
        <h2 className="text-xl font-bold text-blue-400 mb-4">
          {initialData._id ? 'Edit Event' : 'Create Event'}
        </h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} {/* Error message display */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Event Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-600 bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-600 bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Date</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-600 bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 mb-4"
        >
          {initialData._id ? 'Update Event' : 'Create Event'}
        </button>
        <button
          type="button"
          onClick={handleBackToDashboard}
          className="w-full py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
};

export default EventForm;
