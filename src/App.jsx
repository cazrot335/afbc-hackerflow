import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing.jsx';
import Authentication from "./pages/Authentication";
import ServiceProviderDashboard from './pages/ServiceProviderDash';
import ServiceUserDashboard from './pages/ServiceUserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/authentication/:role" element={<Authentication />} />
        <Route path="/serviceProviderDashboard" element={<ServiceProviderDashboard />} />
        <Route path="/dashboard/*" element={<ServiceUserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
