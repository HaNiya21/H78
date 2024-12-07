import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Updated imports
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Summary from './components/Summary';
import Reports from './components/Reports';
import Blockchain from './components/Blockchain'; // Import the Blockchain component

function App() {
  const isAuthenticated = localStorage.getItem('token'); // Check if JWT token is available

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/summary"
          element={isAuthenticated ? <Summary /> : <Navigate to="/login" />}
        />
        <Route
          path="/reports"
          element={isAuthenticated ? <Reports /> : <Navigate to="/login" />}
        />
        <Route
          path="/blockchain"
          element={isAuthenticated ? <Blockchain /> : <Navigate to="/login" />} // Add Blockchain route
        />
        {/* Default redirection */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
