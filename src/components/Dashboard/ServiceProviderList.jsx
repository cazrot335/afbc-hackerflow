import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../pages/styles/ServiceProviderList.css";

const sampleProviders = [
  {
    id: 1,
    name: "John's Hair Salon",
    location: "2 km away",
    rating: 4.8,
    reviews: 120,
    description: "Expert haircuts and styling services.",
    image: "https://via.placeholder.com/100",
    distance: 2,
  },
  {
    id: 2,
    name: "Luxury Hair Spa",
    location: "5 km away",
    rating: 4.6,
    reviews: 90,
    description: "Specialized in hair treatment and spa.",
    image: "https://via.placeholder.com/100",
    distance: 5,
  },
];

const ServiceProviderList = () => {
  const { serviceType } = useParams();
  const [userLocation, setUserLocation] = useState(null);
  const [providers, setProviders] = useState(sampleProviders);

  useEffect(() => {
    // Get user location using the Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );

    // Sort providers by distance (for now using static distances)
    setProviders((prevProviders) =>
      [...prevProviders].sort((a, b) => a.distance - b.distance)
    );
  }, []);

  return (
    <div className="provider-list">
      <h2>{serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Providers</h2>
      <div className="provider-grid">
        {providers.map((provider) => (
          <div key={provider.id} className="provider-card">
            <img src={provider.image} alt={provider.name} className="provider-image" />
            <div className="provider-info">
              <h3>{provider.name}</h3>
              <p>{provider.location}</p>
              <p>Rating: ⭐ {provider.rating} ({provider.reviews} reviews)</p>
              <p>{provider.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProviderList;
