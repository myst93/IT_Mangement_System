// src/components/Shared/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-white font-bold mr-4">Home</Link>
        {localStorage.getItem('role') === 'IT_Admin' && (
          <Link to="/admin" className="text-white font-bold mr-4">Admin Dashboard</Link>
        )}
        {localStorage.getItem('role') === 'IT_Personnel' && (
          <Link to="/user" className="text-white font-bold mr-4">User Dashboard</Link>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;