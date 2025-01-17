import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom'; // Import navigate for navigation

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use navigate for navigation
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log(response);
      if (response) {
        const userData = {
          data: {
            ...response.data,
            role: "user", // Make sure your API response includes the user role
          },
        };
        localStorage.setItem('user', JSON.stringify(userData));
      }
      window.location.href = "/dashboard"; // Navigate to the dashboard on successful login
    } catch (error) {
      console.error(error); // Handle error appropriately
      // You can add more error handling here, like showing an error message
    }
  };

  const handleGuestLogin = () => {
    // Simulate guest login by setting a predefined guest user object
    const guestUser = {
      data: {
        _id: 'guest_id',
        email: 'guest@example.com',
        role: 'guest', // You can assign a role to distinguish guests
      },
    };
    localStorage.setItem('user', JSON.stringify(guestUser)); // Save guest user data
   navigate("/dashboard")
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <button 
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-200 ease-in-out shadow-md"
        >
          Login
        </button>
        <button 
          type="button" 
          onClick={handleGuestLogin} 
          className="w-full px-4 py-2 mt-4 text-gray-300 border border-gray-600 rounded-md hover:bg-gray-600 transition duration-200 ease-in-out shadow-md"
        >
          Login as Guest
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
