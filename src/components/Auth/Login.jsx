import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Authentication.css"; // Importing the same CSS for consistency

const Login = ({ role }) => {
  const navigate = useNavigate(); // To redirect after successful login

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation: Ensure fields are filled
    if (!formData.email || !formData.password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      // API call to your backend for login
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role, // Send the role (either SERVICE_USER or SERVICE_PROVIDER)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      // On successful login, save user session/token if necessary
      // You could store the token in localStorage or use a context to manage user state

      // Redirect user to the dashboard or relevant page
      navigate(`/dashboard/${role}`); // Adjust the redirection URL based on your app's routing
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login triggered");
    // Integrate with Google OAuth or Firebase for actual login
  };

  return (
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
          {error && <p className="error-message">{error}</p>}
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

export default Login;
