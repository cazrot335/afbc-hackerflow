import React, { useState } from "react";
import UserDashboardNavbar from "../components/Dashboard/UserDashboardNavbar";
import ServicePage from "../components/Dashboard/ServicePage";
import ServiceHistory from "../components/Dashboard/ServiceHistory";
import "./styles/UserDashboard.css"; // External CSS

const ServiceUserDashboard = () => {
  const [activeTab, setActiveTab] = useState("services"); // State for switching tabs

  return (
    <div className="user-dashboard">
      {/* Navbar */}
      <UserDashboardNavbar />

      {/* Dashboard Container */}
      <div className="dashboard-container">
        {/* Service History Sidebar */}
        <div className="service-history">
          <h2>Service History</h2>
          <button onClick={() => setActiveTab("history")}>
            View Service History
          </button>
        </div>

        {/* Main Content Area */}
        <div className="services-grid">
          {activeTab === "services" && <ServicePage />}
          {activeTab === "history" && <ServiceHistory />}
        </div>
      </div>
    </div>
  );
};

export default ServiceUserDashboard;
