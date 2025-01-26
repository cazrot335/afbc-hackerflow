import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import "./styles/Authentication.css";

const Authentication = () => {
  const { role } = useParams(); // Extract the role from the URL
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/auth/${isSignUp ? 'signup' : 'login'}`, {
        email: formData.email,
        password: formData.password,
        role: role.toLowerCase(),
      });
      console.log(response.data);
      // Store token and navigate to respective dashboard
      localStorage.setItem('jwtToken', response.data.token);
      if (role.toLowerCase() === 'service_provider') {
        navigate('/serviceProviderDashboard');
      } else {
        navigate('/dashboard/*');
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google', {
        token: response.credential,
      });
      console.log(res.data);
      // Store token and navigate to respective dashboard
      localStorage.setItem('jwtToken', res.data.token);
      if (res.data.role === 'service_provider') {
        navigate('/serviceProviderDashbo');
      } else {
        navigate('/dashboard/*');
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failed", error);
    // Handle error (e.g., show error message)
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="auth-container">
        <div className="auth-visual-section">
          <h2>{role === "SERVICE_USER" ? "Welcome, Service User!" : "Welcome, Service Provider!"}</h2>
          <p>
            {isSignUp
              ? "Sign up now and start accessing services."
              : "Login to your account to continue."}
          </p>
        </div>
        <div className="auth-form-section">
          <form onSubmit={handleSubmit} className="auth-form">
            <h1>
              {role === "SERVICE_USER" ? "Service User" : "Service Provider"}{" "}
              {isSignUp ? "Sign Up" : "Login"}
            </h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {isSignUp && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}
            <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              buttonText="Sign In with Google"
            />
            <p className="toggle-link-container">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span className="toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Login here" : "Sign up here"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Authentication;