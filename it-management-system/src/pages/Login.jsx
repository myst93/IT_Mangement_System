// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import drdoLogo from '../assets/DRDO8.jpg';
import './Home.css';

const features = [
  "User Management (Admins & IT Personnel)",
  "PC Inventory Management",
  "Role-Based Access Control",
  "Request/Approval Workflow for PC Changes",
  "Secure Authentication",
  "Detailed PC Information",
];

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role);

      // Redirect based on role
      if (response.data.user.role === 'IT_Admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${drdoLogo})`,
      }}
    >
      <div className="overlay"></div>
      <div className="home-content">
        <div className="left">
          <h1 className="title">DRDO IT Management System</h1>
          <p className="description">
            Welcome to the Defence R&D Organisation's IT Management Portal. This platform provides secure, centralized management for all IT assets and personnel.
          </p>
          <ul className="feature-list">
            {features.map((feature, index) => (
              <li key={index} className="feature-item">• {feature}</li>
            ))}
          </ul>
        </div>
        <div className="right">
          <h2 className="login-title">Portal Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;