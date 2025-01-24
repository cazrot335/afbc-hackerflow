import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
import "./ServicePage.css"; // Importing the CSS file for styling

const ServicePage = () => {
  // State to store available services
  const [services, setServices] = useState([]);

  // Simulated data for available services
  const serviceData = [
    { id: 1, name: "Electrician", description: "Qualified electricians for home repairs.", icon: "🔌" },
    { id: 2, name: "Plumber", description: "Plumbers for plumbing installations and repairs.", icon: "🚰" },
    { id: 3, name: "Cook", description: "Hire professional cooks for parties and events.", icon: "🍳" },
    { id: 4, name: "Hairdresser", description: "Experienced hairdressers for all your styling needs.", icon: "💇‍♀️" },
    // Add more services as needed
  ];

  useEffect(() => {
    // Simulating fetching data from an API
    setServices(serviceData);
  }, []);

  return (
    <div className="service-page">
      <h1 className="service-page-title">Available Services</h1>
      <div className="service-list">
        {services.map(service => (
          <div className="service-card" key={service.id}>
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-name">{service.name}</h3>
            <p className="service-description">{service.description}</p>
            <Link to={`/service/${service.id}`} className="service-link">
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
