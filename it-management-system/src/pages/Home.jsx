// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import drdoLogo from '../assets/DRDO8.jpg';
import officeImage from '../assets/office.jpg';
import loginSideImage from '../assets/login-side.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Home.css';
import 'animate.css';

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
      response.data.user.role === 'IT_Admin' ? navigate('/admin') : navigate('/user');
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: `url(${officeImage}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      <div
        className="container py-5"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '20px',
          color: '#fff',
        }}
      >
        <div className="row g-5 align-items-center">
          {/* Left Section */}
          <div className="col-lg-6 animate__animated animate__fadeInLeft">
            <h1 className="display-4 fw-bold text-light mb-4">
              DRDO IT Management System
            </h1>
            <p className="lead text-light mb-4">
              Secure & centralized IT asset management for Defence R&D Organisation.
            </p>
            <ul className="list-group list-group-flush mb-4">
              {features.map((feature, idx) => (
                <li key={idx} className="list-group-item border-0 ps-0 d-flex align-items-center bg-transparent text-white">
                  <i className="bi bi-check2-circle text-success me-2 fs-5"></i> {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Login */}
          <div className="col-lg-6 animate__animated animate__fadeInRight">
            <div className="card shadow-lg border-0 rounded-4 position-relative overflow-hidden bg-white">
              {/* Floating Side Image */}
              <img
                src={loginSideImage}
                alt="Login Visual"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.1,
                  zIndex: 0
                }}
              />
              <div className="card-body p-5 position-relative" style={{ zIndex: 1 }}>
                <div className="text-center mb-4">
                  <img
                    src={drdoLogo}
                    alt="DRDO Logo"
                    width="100" // enlarged size
                    className="mb-3"
                  />
                  <h2 className="text-primary">Login to Portal</h2>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-semibold">Username</label>
                    <input
                      id="username"
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                    <input
                      id="password"
                      type="password"
                      className="form-control form-control-lg rounded-3"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 btn-lg fw-bold rounded-3">
                    <i className="bi bi-box-arrow-in-right me-2"></i>Login
                  </button>
                </form>
              </div>
            </div>
            <p className="text-center text-light mt-3 small">
              © {new Date().getFullYear()} DRDO | IT Cell
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
