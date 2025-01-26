import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing.jsx';
import Authentication from "./pages/Authentication";
import ServiceProviderDashboard from './pages/ServiceProviderDash';
import ServiceUserDashboard from './pages/ServiceUserDashboard';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/authentication/:role" element={<Authentication />} /> {/* Ensure this route is defined */}
        <Route path="/serviceProviderDashboard" element={<ServiceProviderDashboard />} />
        <Route path="/dashboard/*" element={<ServiceUserDashboard />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
