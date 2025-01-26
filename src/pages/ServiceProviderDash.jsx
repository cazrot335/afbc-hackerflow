import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken, isTokenExpired } from '../utils/auth';
import OpenStreetMapAutocomplete from '../components/OpenStreetMapAutocomplete';

const ServiceProviderDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({
    businessName: '',
    contact: '',
    location: '',
    gstNo: '',
    photos: [] // Ensure photos is initialized as an empty array
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (!token || isTokenExpired(token)) {
        console.error('Token expired or invalid');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchServices = async () => {
      const token = getToken();
      if (!token || isTokenExpired(token)) {
        console.error('Token expired or invalid');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/services', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const fetchAppointments = async () => {
      const token = getToken();
      if (!token || isTokenExpired(token)) {
        console.error('Token expired or invalid');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/appointments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchProfile();
    fetchServices();
    fetchAppointments();
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 4 - (profile.photos ? profile.photos.length : 0));
    
    setProfile(prev => ({
      ...prev,
      photos: [...(prev.photos || []), ...newImages.map(file => URL.createObjectURL(file))]
    }));
  };

  const handleRemoveImage = (index) => {
    setProfile(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleProfileUpdate = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationSelect = (place) => {
    setProfile(prev => ({
      ...prev,
      location: place.display_name
    }));
  };

  const saveProfile = async () => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      console.error('Token expired or invalid');
      return;
    }

    try {
      const response = await axios.put('http://localhost:5000/api/profile', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Profile saved:', response.data);
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const addService = () => {
    setServices([...services, {
      name: '',
      description: '',
      pricing: '',
      availability: '',
      specialOffer: ''
    }]);
  };

  const updateService = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const deleteService = async (index) => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      console.error('Token expired or invalid');
      return;
    }

    try {
      const serviceId = services[index]._id;
      await axios.delete(`http://localhost:5000/api/services/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedServices = services.filter((_, i) => i !== index);
      setServices(updatedServices);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const saveServiceChanges = async () => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      console.error('Token expired or invalid');
      return;
    }

    try {
      for (const service of services) {
        if (service._id) {
          await axios.put(`http://localhost:5000/api/services/${service._id}`, service, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } else {
          await axios.post('http://localhost:5000/api/services', service, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      }
      console.log('Services saved:', services);
    } catch (error) {
      console.error('Error saving services:', error);
    }
  };

  const handleUpdateStatus = async (appointmentId, status) => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      console.error('Token expired or invalid');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/appointments/${appointmentId}/status`, {
        status,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId ? response.data : appointment
        )
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const styles = {
    dashboard: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#f4f6f9'
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '20px'
    },
    sidebarTitle: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '30px',
      textAlign: 'center',
      color: '#ecf0f1'
    },
    sidebarNav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    navButton: {
      backgroundColor: 'transparent',
      color: '#bdc3c7',
      border: 'none',
      padding: '12px 15px',
      textAlign: 'left',
      cursor: 'pointer',
      borderRadius: '5px',
      transition: 'all 0.3s ease'
    },
    activeNavButton: {
      backgroundColor: '#34495e',
      color: 'white'
    },
    content: {
      flex: 1,
      overflowY: 'auto',
      padding: '30px',
      backgroundColor: '#ecf0f1'
    },
    sectionTitle: {
      marginBottom: '20px',
      color: '#2c3e50',
      borderBottom: '2px solid #3498db',
      paddingBottom: '10px'
    },
    formGroup: {
      marginBottom: '15px'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px'
    },
    imageUpload: {
      display: 'flex',
      gap: '10px',
      marginTop: '10px'
    },
    imagePreview: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '8px',
      position: 'relative'
    },
    removeButton: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    serviceCard: {
      backgroundColor: 'white',
      border: '1px solid #e1e4e8',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    addButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    deleteButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px'
    },
    saveButton: {
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px'
    },
    serviceSaveButton: {
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '20px',
      marginLeft: '10px'
    },
    editButton: {
      backgroundColor: '#f39c12',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarTitle}>ServicePro</div>
        <div style={styles.sidebarNav}>
          <button 
            style={{
              ...styles.navButton, 
              ...(activeSection === 'profile' ? styles.activeNavButton : {})
            }}
            onClick={() => setActiveSection('profile')}
          >
            Business Profile
          </button>
          <button 
            style={{
              ...styles.navButton, 
              ...(activeSection === 'services' ? styles.activeNavButton : {})
            }}
            onClick={() => setActiveSection('services')}
          >
            Service Catalog
          </button>
          <button 
            style={{
              ...styles.navButton, 
              ...(activeSection === 'appointments' ? styles.activeNavButton : {})
            }}
            onClick={() => setActiveSection('appointments')}
          >
            Appointments
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {activeSection === 'profile' && (
          <div>
            <h2 style={styles.sectionTitle}>Business Profile</h2>
            <div style={styles.formGroup}>
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={profile.businessName || ''}
                onChange={handleProfileUpdate}
                style={styles.input}
                disabled={!isEditingProfile}
              />
            </div>
            <div style={styles.formGroup}>
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                value={profile.contact || ''}
                onChange={handleProfileUpdate}
                style={styles.input}
                disabled={!isEditingProfile}
              />
            </div>
            <div style={styles.formGroup}>
              <OpenStreetMapAutocomplete onSelect={handleLocationSelect} />
            </div>
            <div style={styles.formGroup}>
              <input
                type="text"
                name="gstNo"
                placeholder="GST Number"
                value={profile.gstNo || ''}
                onChange={handleProfileUpdate}
                style={styles.input}
                disabled={!isEditingProfile}
              />
            </div>
            <div style={styles.formGroup}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={!isEditingProfile || (profile.photos && profile.photos.length >= 4)}
              />
              <div style={styles.imageUpload}>
                {profile.photos && profile.photos.map((img, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img 
                      src={img} 
                      alt={`Business ${index + 1}`} 
                      style={styles.imagePreview} 
                    />
                    <button 
                      style={styles.removeButton} 
                      onClick={() => handleRemoveImage(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {isEditingProfile ? (
              <button onClick={saveProfile} style={styles.saveButton}>
                Save Profile
              </button>
            ) : (
              <button onClick={() => setIsEditingProfile(true)} style={styles.editButton}>
                Edit Profile
              </button>
            )}
          </div>
        )}

        {activeSection === 'services' && (
          <div>
            <h2 style={styles.sectionTitle}>Service Catalog</h2>
            {services.map((service, index) => (
              <div key={index} style={styles.serviceCard}>
                <input
                  type="text"
                  placeholder="Service Name"
                  value={service.name || ''}
                  onChange={(e) => updateService(index, 'name', e.target.value)}
                  style={styles.input}
                />
                <textarea
                  placeholder="Service Description"
                  value={service.description || ''}
                  onChange={(e) => updateService(index, 'description', e.target.value)}
                  style={{...styles.input, minHeight: '100px'}}
                />
                <input
                  type="text"
                  placeholder="Pricing"
                  value={service.pricing || ''}
                  onChange={(e) => updateService(index, 'pricing', e.target.value)}
                  style={styles.input}
                />
                <input
                  type="text"
                  placeholder="Availability"
                  value={service.availability || ''}
                  onChange={(e) => updateService(index, 'availability', e.target.value)}
                  style={styles.input}
                />
                <input
                  type="text"
                  placeholder="Special Offer"
                  value={service.specialOffer || ''}
                  onChange={(e) => updateService(index, 'specialOffer', e.target.value)}
                  style={styles.input}
                />
                <button onClick={() => deleteService(index)} style={styles.deleteButton}>
                  Delete Service
                </button>
              </div>
            ))}
            <div style={{ display: 'flex' }}>
              <button onClick={addService} style={styles.addButton}>
                Add Service
              </button>
              <button onClick={saveServiceChanges} style={styles.serviceSaveButton}>
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeSection === 'appointments' && (
          <div>
            <h2 style={styles.sectionTitle}>Appointments</h2>
            {appointments.length === 0 ? (
              <p>No appointments yet. Appointments will appear here once services are booked.</p>
            ) : (
              appointments.map((appointment) => (
                <div key={appointment._id} style={styles.serviceCard}>
                  <h3>{appointment.service.name}</h3>
                  <p>Date: {new Date(appointment.date).toLocaleString()}</p>
                  <p>Status: {appointment.status}</p>
                  <button onClick={() => handleUpdateStatus(appointment._id, 'confirmed')}>Confirm</button>
                  <button onClick={() => handleUpdateStatus(appointment._id, 'rejected')}>Reject</button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;