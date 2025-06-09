// src/components/Shared/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const role = localStorage.getItem('role');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-house-door-fill me-2"></i>
          AMC Portal
        </Link>

        <div className="d-flex align-items-center gap-3">
          {/* {role === 'IT_Admin' && (
            <Link to="/admin" className="btn btn-outline-light btn-sm rounded-pill">
              <i className="bi bi-speedometer2 me-1"></i>
              Admin Dashboard
            </Link>
          )} */}
          {role === 'IT_Personnel' && (
            <Link to="/user" className="btn btn-outline-light btn-sm rounded-pill">
              <i className="bi bi-person-badge me-1"></i>
              User Dashboard
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="btn btn-danger btn-sm rounded-pill d-flex align-items-center gap-2"
          >
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
