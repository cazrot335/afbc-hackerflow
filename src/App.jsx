import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing.jsx';
import Authentication from "./pages/Authentication";
import ServiceUserDashboard from './pages/ServiceUserDashboard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/authentication/:role" element={<Authentication />} />
        <Route path="/dashboard/*" element={<ServiceUserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
