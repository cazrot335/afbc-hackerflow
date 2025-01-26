import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../utils/auth';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { services } = location.state || [];

  const handleBookAppointment = async (serviceId) => {
    const date = new Date(); // Example date, you can replace it with a date picker value
    const paymentMethod = 'COD'; // Example payment method, you can replace it with a selected value

    try {
      const token = getToken();
      const response = await axios.post('http://localhost:5000/api/appointments', {
        service: serviceId,
        date,
        paymentMethod,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Appointment booked:', response.data);
      navigate('/appointments');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div>
      <h1>Search Results</h1>
      {services.length > 0 ? (
        services.map(service => (
          <div key={service._id} style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
            <img src={service.image} alt={service.name} style={{ width: '100px', height: '100px' }} />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Price: {service.pricing}</p>
            <p>Availability: {service.availability}</p>
            <button onClick={() => handleBookAppointment(service._id)}>Book Appointment</button>
          </div>
        ))
      ) : (
        <p>No services found</p>
      )}
    </div>
  );
};

export default SearchResults;