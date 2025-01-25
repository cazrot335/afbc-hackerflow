import React from "react";
import { Route, Routes } from "react-router-dom";
import ServicePage from "./ServicePage";
import ServiceHistory from "./ServiceHistory";
import "../../pages/styles/UserDashboard.css";  // Ensure proper styling for the dashboard

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      {/* Dashboard Content */}
      <div className="dashboard-content">
        <header className="welcome-section">
          <h1>Welcome to Your Dashboard</h1>
          <p>Explore services, view your history, and leave reviews!</p>
        </header>

        {/* Routing for service catalog and service history */}
        <Routes>
          {/* Service Page (Service Catalog) */}
          <Route path="/dashboard" element={<ServicePage />} />
          <Route path="/dashboard/history" element={<ServiceHistory />} />
        </Routes>
      </div>
    </div> 
  );
};

export default UserDashboard;
