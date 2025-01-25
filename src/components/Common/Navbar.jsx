import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";  // Custom CSS for Navbar

const Navbar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data (local storage, cookies, or token)
    localStorage.removeItem("userToken"); // Example - clear token from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-text">Service Platform</span>
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to={`/${role}/dashboard`} className="navbar-item">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/services" className="navbar-item">
              Available Services
            </Link>
          </li>
          {role === "SERVICE_USER" && (
            <li>
              <Link to="/request-service" className="navbar-item">
                Request Service
              </Link>
            </li>
          )}
          {role === "SERVICE_PROVIDER" && (
            <li>
              <Link to="/manage-services" className="navbar-item">
                Manage Services
              </Link>
            </li>
          )}
          <li>
            <Link to="/profile" className="navbar-item">
              Profile
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="navbar-item logout-button">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
