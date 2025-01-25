import React from "react";
import { Link } from "react-router-dom";
import './styles/LandingPageNavbar.css';

const LandingPageNavbar = () => {
  return (
    <nav className="landing-navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="/" className="navbar-logo">
          Service Platform
        </Link>

        {/* Navbar Links */}
        <ul className="navbar-menu">
          <li>
            <Link to="/about-us" className="navbar-item">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact-us" className="navbar-item">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Social Media Links */}
        <div className="social-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="mailto:contact@serviceplatform.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fas fa-envelope"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
