import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
      <h1 className="text-5xl font-extrabold text-blue-400 sm:text-6xl md:text-7xl">Welcome to Event Manager</h1>
      <p className="mt-4 text-lg text-gray-300 sm:text-xl md:text-2xl">Manage and join events effortlessly!</p>
      <div className="mt-8 space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-200 ease-in-out shadow-md hover:shadow-lg"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 text-blue-400 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out shadow-md hover:shadow-lg"
        >
          Register
        </Link>
      </div>
      <footer className="mt-10 text-gray-400">
        <p>© {new Date().getFullYear()} Event Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
