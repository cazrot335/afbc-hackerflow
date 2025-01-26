import React, { useState } from "react";
import UserDashboardNavbar from "../components/Dashboard/UserDashboardNavbar";
import ServicePage from "../components/Dashboard/ServicePage";
import ServiceHistory from "../components/Dashboard/ServiceHistory";
import "./styles/UserDashboard.css";

const ServiceUserDashboard = () => {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className="user-dashboard">
      {/* Navbar */}
      <UserDashboardNavbar />

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <header className="welcome-section">
          <h1>Welcome to Your Dashboard</h1>
          <p>Explore services, view your history, and leave reviews!</p>
        </header>

        <div className="dashboard-container">
          {/* Service History Sidebar */}
          <div className="service-history">
            <h2>Service History</h2>
            <button onClick={() => setActiveTab("history")}>
              View Service History
            </button>
          </div>

          {/* Main Content Section */}
          <div className="services-grid">
            {activeTab === "services" && <ServicePage />}
            {activeTab === "history" && <ServiceHistory />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceUserDashboard;
