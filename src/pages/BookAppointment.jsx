import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { useNavigate, useParams } from 'react-router-dom';

const BookAppointment = () => {
  const { serviceId } = useParams();
  const [date, setDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QR');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleBook = async () => {
    try {
      const token = getToken();
      const response = await axios.post('http://localhost:5000/api/appointments', {
        service: serviceId,
        date,
        paymentMethod
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Appointment booked successfully');
      navigate('/appointments');
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage('Error booking appointment');
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      {message && <p>{message}</p>}
      <div>
        <label>Date:</label>
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Payment Method:</label>
        <select 
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="QR">QR</option>
          <option value="COD">COD</option>
        </select>
      </div>
      <button onClick={handleBook}>Book Appointment</button>
    </div>
  );
};

export default BookAppointment;