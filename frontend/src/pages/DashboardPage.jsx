// Dashboard.jsx
import React from 'react';
import EventList from '../components/Events/EventList';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { toast, ToastContainer } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.data?.role; // Extract user role
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleCreateEventClick = (event) => {
    if (role === "guest") {
      event.preventDefault(); // Prevent navigation
      toast.error("Can't access in guest mode, Kindly Login!!"); // Show toast notification
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear local storage
    navigate('/login'); // Redirect to login page
  };

  const handleLoginClick = () => {
    localStorage.removeItem('user'); // Clear local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
          <div className="flex space-x-2">
            {role === "guest" ? (
              <button 
                onClick={handleLoginClick} 
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            ) : (
              <button 
              onClick={handleLogout} 
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
            )}
              <Link to="/events/create" onClick={handleCreateEventClick}>
                <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                  Create Event
                </button>
              </Link>
           
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-white mt-6 mb-4">Events</h2>
        <EventList />
      </div>

      <ToastContainer /> {/* Add ToastContainer to your component */}
    </div>
  );
};

export default Dashboard;
