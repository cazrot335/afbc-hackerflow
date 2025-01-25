import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingCart, 
  Globe, 
  Shield, 
  UserPlus, 
  User, 
  Zap 
} from 'lucide-react'; // Importing icons from Lucide

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const features = [
    {
      icon: ShoppingCart,
      title: "Easy Booking",
      color: "blue",
    },
    {
      icon: Globe,
      title: "Global Services",
      color: "green",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      color: "purple",
    },
    {
      icon: UserPlus,
      title: "Verified Providers",
      color: "indigo",
    },
  ];

  // Handle role selection and navigate to the respective authentication page
  const handleRoleSelection = (role) => {
    navigate(`/authentication/${role}`); // Correct route
    setShowAuthModal(false);
  };
  const styles = {
    landingPage: {
      width: "100%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f0f2f5",
      position: "relative",
      overflow: "hidden",
    },
    logoContainer: {
      position: "absolute",
      top: "20px",
      left: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      border: "2px solid #e6f2ff", // Light blue border for ServiceSync
      borderRadius: "8px",
      padding: "5px",
    },
    logo: {
      width: "30px",
      height: "30px",
      color: "#007bff",
    },
    websiteName: {
      position: "absolute",
      top: "20px",
      right: "20px",
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#333",
    },
    serviceSyncText: {
      color: "#007bff", // Blue color for ServiceSync
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    getStartedBtn: {
      position: "absolute", // Positioned at the top-right corner
      top: "20px",
      right: "20px",
      display: "flex",
      alignItems: "center",
      padding: "8px 24px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s ease",
    },
    content: {
      width: "100%",
      maxWidth: "1200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    textSection: {
      textAlign: "center",
      marginBottom: "50px",
      width: "100%",
    },
    title: {
      fontSize: "3rem",
      marginBottom: "20px",
      color: "#333",
    },
    description: {
      fontSize: "1.2rem",
      color: "#666",
      marginBottom: "30px",
    },
    features: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "24px",
      justifyContent: "center",
      padding: "20px",
      width: "100%",
    },
    featureCard: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "20px",
      padding: "12px",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      maxWidth: "280px",
      width: "100%",
      boxSizing: "border-box",
    },
    featureColors: {
      blue: { backgroundColor: "#e6f2ff", color: "#0066cc" },
      green: { backgroundColor: "#e6ffe6", color: "#00cc00" },
      purple: { backgroundColor: "#f2e6ff", color: "#6600cc" },
      indigo: { backgroundColor: "#e6e6ff", color: "#0000cc" },
    },
    icon: {
      fontSize: "2rem",
    },
    authModal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
    },
    authModalContent: {
      background: "#fff",
      padding: "2rem",
      borderRadius: "1rem",
      width: "90%",
      maxWidth: "400px",
      textAlign: "center",
    },
    authModalButtons: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      marginTop: "20px",
    },
    roleButton: {
      padding: "1rem",
      fontSize: "1rem",
      fontWeight: "bold",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  const AuthModal = () => {
  const handleOutsideClick = (e) => {
    // Close the modal if clicked outside the modal content
    if (e.target.id === "authModalOverlay") {
      setShowAuthModal(false);
    }
  };

  return (
    <div
      id="authModalOverlay"
      style={styles.authModal}
      onClick={handleOutsideClick}
    >
      <div style={{ ...styles.authModalContent, position: "relative" }}>
        {/* Close Button */}
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "1.5rem",
            fontWeight: "bold",
            cursor: "pointer",
            color: "#333",
          }}
          onClick={() => setShowAuthModal(false)}
        >
          &times;
        </button>

        <h2 style={{ color: "#000" }}>Choose Your Role</h2>
        <div style={styles.authModalButtons}>
          <button
            style={{
              ...styles.roleButton,
              backgroundColor: "#3b82f6",
              color: "white",
            }}
            onClick={() => handleRoleSelection("SERVICE_USER")}
          >
            <User /> Service User
          </button>
          <button
            style={{
              ...styles.roleButton,
              backgroundColor: "#10b981",
              color: "white",
            }}
            onClick={() => handleRoleSelection("SERVICE_PROVIDER")}
          >
            <UserPlus /> Service Provider
          </button>
        </div>
      </div>
    </div>
  );
};

  
  

  return (
    <div style={styles.landingPage}>
      <div style={styles.logoContainer}>
        <Zap style={styles.logo} />
        <span style={styles.serviceSyncText}>ServiceSync</span>
      </div>
      {showAuthModal && <AuthModal />}
      <button
        style={styles.getStartedBtn}
        onClick={() => setShowAuthModal(true)}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#0056b3")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#007bff")
        }
      >
        <User style={{ marginRight: "10px" }} /> Get Started
      </button>
      <div style={styles.content}>
        <div style={styles.textSection}>
          <h1 style={styles.title}>Connect. Book. Experience.</h1>
          <p style={styles.description}>
            Your one-stop platform for seamless service discovery and booking
            across multiple domains.
          </p>
        </div>
        <div style={styles.features}>
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                style={{
                  ...styles.featureCard,
                  ...styles.featureColors[feature.color],
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 8px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 4px rgba(0,0,0,0.1)";
                }}
              >
                <IconComponent style={styles.icon} />
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