// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Updated imports
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Summary from './components/Summary';
import Reports from './components/Reports';

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
        {/* Default redirection */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
