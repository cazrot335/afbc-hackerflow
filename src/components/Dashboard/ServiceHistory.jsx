import React, { useState } from "react";
import "../../pages/styles/ServiceHistory.css"; // Adjust path based on the folder structure


// Sample Data (this would normally come from your backend/database)
const serviceHistoryData = [
  {
    id: 1,
    serviceName: "Plumbing",
    providerName: "John Doe Plumbing",
    date: "2025-01-10",
    location: "New York, NY",
    rating: 4,
    reviews: 10,
    description: "Plumbing services including leak repairs and installations.",
  },
  {
    id: 2,
    serviceName: "Haircut",
    providerName: "Jane's Hair Salon",
    date: "2025-01-05",
    location: "Los Angeles, CA",
    rating: 5,
    reviews: 25,
    description: "Get the latest hairstyles and trendy haircuts.",
  },
  // Add more sample data here
];

const ServiceHistory = () => {
  const [reviews, setReviews] = useState({});
  const [rating, setRating] = useState({});

  const handleRatingChange = (serviceId, newRating) => {
    setRating({ ...rating, [serviceId]: newRating });
  };

  const handleReviewChange = (serviceId, review) => {
    setReviews({ ...reviews, [serviceId]: review });
  };

  const handleSubmitReview = (serviceId) => {
    // Handle review submission logic (e.g., save to the backend)
    console.log(`Submitted review for Service ID: ${serviceId}`);
  };

  return (
    <div className="service-history-section">
      <h2>Service History</h2>
      <div className="service-history-list">
        {serviceHistoryData.map((service) => (
          <div key={service.id} className="service-history-card">
            <div className="service-details">
              <h3>{service.serviceName}</h3>
              <p>{service.providerName}</p>
              <p>{service.date}</p>
              <p>{service.location}</p>
              <p>{service.description}</p>
            </div>
            <div className="service-rating">
              <span>Rating: {service.rating} stars</span>
              <span>({service.reviews} reviews)</span>
            </div>
            <div className="rating-input">
              <label htmlFor="rating">Rate this service:</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating[service.id] || service.rating}
                onChange={(e) => handleRatingChange(service.id, e.target.value)}
              />
            </div>
            <div className="review-input">
              <textarea
                placeholder="Leave a review"
                value={reviews[service.id] || ""}
                onChange={(e) => handleReviewChange(service.id, e.target.value)}
              ></textarea>
            </div>
            <button onClick={() => handleSubmitReview(service.id)}>
              Submit Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHistory;
