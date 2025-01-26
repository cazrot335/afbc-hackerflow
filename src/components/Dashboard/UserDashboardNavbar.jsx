import React, { useState } from "react";
import "../../pages/styles/UserDashboardNavbar.css";

const UserDashboardNavbar = ({ setActiveTab }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setActiveTab("services")}>
        ServiceFinder
      </div>
      <div className="nav-links">
        <button onClick={() => setActiveTab("services")}>Services</button>
        <button onClick={() => setActiveTab("bookings")}>Bookings</button>
        <button onClick={() => setActiveTab("notifications")}>Notifications</button>
        <button onClick={() => setActiveTab("favourites")}>Favourites</button>
        <button onClick={() => setActiveTab("support")}>Support/Help</button>
        <div
          className="profile-section"
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <img
            src="https://via.placeholder.com/40" // Placeholder profile picture
            alt="Profile"
            className="profile-picture"
          />
          {showProfileMenu && (
            <div className="profile-menu">
              <button onClick={() => setActiveTab("edit-profile")}>Edit Profile</button>
              <button onClick={() => setActiveTab("payment-history")}>Payment History</button>
              <button onClick={() => setActiveTab("logout")}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserDashboardNavbar;
