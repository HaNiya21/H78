import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated import for useNavigate
import '../index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password
      });
  
      // Store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);

  
      console.log('Login successful:', response.data);
      
      // Redirect to the dashboard after successful login
      navigate('/dashboard'); // Redirect using useNavigate
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-label="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
