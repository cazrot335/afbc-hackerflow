import React from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/styles/ServicePage.css"; // Adjust path based on the folder structure

const services = [
  { type: "Hairdresser", icon: "✂️" },
  { type: "Plumber", icon: "🔧" },
  { type: "Movers", icon: "🚚" },
  { type: "Electrician", icon: "⚡" },
  { type: "Cook", icon: "🍳" },
];

const ServicePage = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceType) => {
    navigate(`/services/${serviceType.toLowerCase()}`);
  };

  return (
    <div className="service-page">
      <h2>Choose a Service</h2>
      <div className="service-grid">
        {services.map((service) => (
          <div
            key={service.type}
            className="service-card"
            onClick={() => handleServiceClick(service.type)}
          >
            <span className="service-icon">{service.icon}</span>
            <p>{service.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
