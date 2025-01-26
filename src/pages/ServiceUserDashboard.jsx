import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const ServiceUserDashboard = () => {
  const [activeSection, setActiveSection] = useState('services');
  const [searchTerm, setSearchTerm] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    contact: '',
    location: '',
    profilePic: ''
  });
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchServices();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = getToken();
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        removeToken();
        navigate('/authentication/SERVICE_USER');
      } else {
        console.error('Error fetching profile:', error);
      }
    }
  };

  const fetchServices = async () => {
    try {
      const token = getToken();
      const response = await axios.get('http://localhost:5000/api/services', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data);
      setFilteredServices(response.data); // Initialize filtered services
    } catch (error) {
      if (error.response && error.response.status === 401) {
        removeToken();
        navigate('/authentication/SERVICE_USER');
      } else {
        console.error('Error fetching services:', error);
      }
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      const token = getToken();
      const response = await axios.post('http://localhost:5000/api/profile/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Image upload response:', response.data);
      setProfileData(prev => ({ ...prev, profilePic: response.data.url }));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        removeToken();
        navigate('/authentication/SERVICE_USER');
      } else {
        console.error('Error uploading image:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleProfileSave = async () => {
    try {
      const token = getToken();
      console.log('Profile data before saving:', profileData);
      await axios.put('http://localhost:5000/api/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        removeToken();
        navigate('/authentication/SERVICE_USER');
      } else {
        console.error('Error updating profile:', error);
        setMessage('Error updating profile');
      }
    }
  };

  const handleBookAppointment = (serviceId) => {
    navigate(`/book-appointment/${serviceId}`);
  };

  const handleSearch = () => {
    console.log('Search term:', searchTerm);
    const filtered = services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('Filtered services:', filtered);
    setFilteredServices(filtered);
    navigate('/search-results', { state: { services: filtered } });
  };

  const styles = {
    dashboard: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f6',
      color: '#333'
    },
    navbar: {
      width: '250px',
      backgroundColor: 'white',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column'
    },
    navbarLogo: {
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#3498db',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.5rem'
    },
    navItems: {
      listStyle: 'none',
      padding: '20px 0'
    },
    navItem: {
      position: 'relative',
      padding: '10px 20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    navItemHover: {
      backgroundColor: '#f0f0f0'
    },
    navItemDropdown: {
      display: 'none',
      position: 'absolute',
      left: '100%',
      top: '0',
      width: '250px',
      backgroundColor: 'white',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
      zIndex: 10,
      padding: '15px'
    },
    mainContent: {
      flexGrow: 1,
      padding: '20px',
      backgroundColor: '#f4f4f6',
      overflowY: 'auto'
    },
    servicesSearch: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    },
    searchContainer: {
      width: '60%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    searchInput: {
      width: '80%',
      padding: '15px',
      border: '2px solid #3498db',
      borderRadius: '25px',
      fontSize: '1rem',
      textAlign: 'center'
    },
    searchButton: {
      marginLeft: '10px',
      padding: '10px 15px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    searchPlaceholder: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#888',
      pointerEvents: 'none'
    },
    profileForm: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    formGroup: {
      marginBottom: '15px'
    },
    formLabel: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold'
    },
    formInput: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px'
    },
    addProfileBtn: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    paymentTable: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    paymentTableCell: {
      border: '1px solid #ddd',
      padding: '10px',
      textAlign: 'left'
    },
    paymentTableHeader: {
      backgroundColor: '#f2f2f2'
    },
    profilePic: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '10px'
    },
    serviceCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    serviceImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '10px'
    },
    bookButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.dashboard}>
      <nav style={styles.navbar}>
        <div style={styles.navbarLogo}>UserDash</div>
        <ul style={styles.navItems}>
          {['Services', 'Bookings', 'Profile', 'Appointments', 'Payment History'].map((item) => (
            <li 
              key={item} 
              style={styles.navItem}
              onClick={() => setActiveSection(item.toLowerCase().replace(' ', ''))}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
      <main style={styles.mainContent}>
        {activeSection === 'services' && (
          <div style={styles.servicesSearch}>
            <div style={styles.searchContainer}>
              <input 
                type="text" 
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                style={styles.searchButton}
                onClick={handleSearch}
              >
                Search
              </button>
              {!searchTerm && (
                <div style={styles.searchPlaceholder}>
                  Search for services
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === 'profile' && (
          <div style={styles.profileForm}>
            {message && <div>{message}</div>}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Profile Picture</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
              />
              {profileData.profilePic && (
                <img 
                  src={`http://localhost:5000/${profileData.profilePic}`} 
                  alt="Profile" 
                  style={styles.profilePic}
                />
              )}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Name</label>
              <input 
                type="text" 
                name="name"
                style={styles.formInput}
                value={profileData.name || ''} // Ensure initial value
                onChange={handleProfileChange}
                placeholder="Enter your name"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Contact</label>
              <input 
                type="tel" 
                name="contact"
                style={styles.formInput}
                value={profileData.contact || ''} // Ensure initial value
                onChange={handleProfileChange}
                placeholder="Enter contact number"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Location</label>
              <input 
                type="text" 
                name="location"
                style={styles.formInput}
                value={profileData.location || ''} // Ensure initial value
                onChange={handleProfileChange}
                placeholder="Enter your location"
              />
            </div>
            <button 
              style={styles.addProfileBtn}
              onClick={handleProfileSave}
            >
              Save Changes
            </button>
          </div>
        )}

        {activeSection === 'services' && (
          <div>
            {filteredServices.length > 0 ? (
              filteredServices.map(service => (
                <div key={service._id} style={styles.serviceCard}>
                  <img src={service.image} alt={service.name} style={styles.serviceImage} />
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <button 
                    style={styles.bookButton}
                    onClick={() => handleBookAppointment(service._id)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))
            ) : (
              <p>No services found</p>
            )}
          </div>
        )}

        {activeSection === 'paymenthistory' && (
          <table style={styles.paymentTable}>
            <thead>
              <tr>
                <th style={{...styles.paymentTableCell, ...styles.paymentTableHeader}}>Date</th>
                <th style={{...styles.paymentTableCell, ...styles.paymentTableHeader}}>Amount</th>
                <th style={{...styles.paymentTableCell, ...styles.paymentTableHeader}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td style={styles.paymentTableCell}>{payment.date}</td>
                  <td style={styles.paymentTableCell}>{payment.amount}</td>
                  <td style={styles.paymentTableCell}>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default ServiceUserDashboard;