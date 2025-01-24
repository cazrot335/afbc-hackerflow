import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './styles/LandingPage.css';
import { 
  ShoppingCart, 
  Globe, 
  Shield, 
  UserPlus, 
  User 
} from 'lucide-react';

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const features = [
    { 
      icon: ShoppingCart, 
      title: 'Easy Booking', 
      color: 'blue' 
    },
    { 
      icon: Globe, 
      title: 'Global Services', 
      color: 'green' 
    },
    { 
      icon: Shield, 
      title: 'Secure Payments', 
      color: 'purple' 
    },
    { 
      icon: UserPlus, 
      title: 'Verified Providers', 
      color: 'indigo' 
    }
  ];

  // Handle role selection and navigate to the respective authentication page
  const handleRoleSelection = (role) => {
    navigate(`/authentication/${role}`); // Correct route
    setShowAuthModal(false);
  };

  const AuthModal = () => (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <h2>Choose Your Role</h2>
        <div className="role-buttons">
          <button 
            onClick={() => handleRoleSelection('SERVICE_USER')} 
            className="service-user"
          >
            <User className="icon" />
            Service User
          </button>
          <button 
            onClick={() => handleRoleSelection('SERVICE_PROVIDER')} 
            className="service-provider"
          >
            <UserPlus className="icon" />
            Service Provider
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="landing-page">
      {showAuthModal && <AuthModal />} {/* Show modal when true */}

      <div className="content">
        <div className="text-section">
          <h1>Connect. Book. Experience.</h1>
          <p>
            Your one-stop platform for seamless service discovery and booking across multiple domains.
          </p>
          <button onClick={() => setShowAuthModal(true)} className="get-started-btn">
            <User className="icon" /> Get Started
          </button>
        </div>

        <div className="features">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.title} className={`feature-card ${feature.color}`}>
                <IconComponent className="icon" />
                <h3>{feature.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;