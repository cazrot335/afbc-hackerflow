import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken, isTokenExpired } from '../utils/auth';
import QRCode from 'qrcode.react';

const BookingPage = ({ serviceId }) => {
  const [service, setService] = useState(null);
  const [date, setDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/services/${serviceId}`);
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleBooking = async () => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      console.error('Token expired or invalid');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/appointments', {
        serviceId,
        date,
        paymentMethod,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (paymentMethod === 'qr') {
        setQrCode(response.data.qrCode);
      }

      console.log('Appointment booked:', response.data);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div>
      {service && (
        <div>
          <h1>{service.name}</h1>
          <p>{service.description}</p>
          <p>Price: {service.pricing}</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="qr">QR Code</option>
          </select>
          <button onClick={handleBooking}>Book Appointment</button>
          {qrCode && <QRCode value={qrCode} />}
        </div>
      )}
    </div>
  );
};

export default BookingPage;