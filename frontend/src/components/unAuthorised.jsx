import React from 'react';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-6">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-lg text-gray-300">
          You do not have permission to view this page.
        </p>
        <a href="/dashboard" className="mt-6 inline-block px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
