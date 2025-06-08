// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import drdoLogo from '../assets/DRDO8.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

const features = [
  "User Management (Admins & IT Personnel)",
  "PC Inventory Management",
  "Role-Based Access Control",
  "Request/Approval Workflow for PC Changes",
  "Secure Authentication",
  "Detailed PC Information",
];

function Home() {
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
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: `linear-gradient(rgba(255,255,255,0.92),rgba(255,255,255,0.92)), url(${drdoLogo}) no-repeat center right`,
        backgroundSize: "contain",
      }}
    >
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          {/* Left: Features */}
          <div className="col-lg-7 mb-4 mb-lg-0">
            <div className="mb-4">
              <h1 className="display-5 fw-bold text-primary mb-3">DRDO IT Management System</h1>
              <p className="lead text-dark">
                Welcome to the Defence R&D Organisation's IT Management Portal. This platform provides secure, centralized management for all IT assets and personnel.
              </p>
            </div>
            <ul className="list-group list-group-flush shadow-sm">
              {features.map((feature, idx) => (
                <li key={idx} className="list-group-item bg-transparent border-0 ps-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          {/* Right: Login */}
          <div className="col-lg-5">
            <div className="card shadow-lg border-0">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4 text-primary">Portal Login</h2>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;