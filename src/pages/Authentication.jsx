import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/Authentication.css";

const Authentication = () => {
  const { role } = useParams(); // Extract the role from the URL
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(`${isSignUp ? "Registering" : "Logging in"} as ${role}`);
  };
  const handleGoogleLogin = () => {
    console.log("Google login triggered");
    // Integrate with Google OAuth or Firebase for actual login
  };

  return (
    <div className="auth-container">
      <div className="auth-visual-section">
        <h2>{role === "SERVICE_USER" ? "Welcome, Service User!" : "Welcome, Service Provider!"}</h2>
        <p >
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
          <button type="button" className="google-login-button" onClick={handleGoogleLogin}>
            Sign In with Google
          </button>
          <p className="toggle-link-container">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span className="toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Login here" : "Sign up here"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Authentication;