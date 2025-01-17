import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CreateEventPage from "./pages/CreateEventPage.jsx";

import Unauthorized from "./components/unAuthorised.jsx";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.data?.role;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={ <DashboardPage />}
      />
      <Route path="/events/create" element={role === "user" ? <CreateEventPage />: <Unauthorized />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default App;
