// src/components/Admin/AddUser.jsx
import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    role: 'IT_Personnel',
    fullName: '',
    designation: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user.username || !user.password || !user.fullName || !user.designation) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await api.post('/users', user);
      setSuccess(response.data.message);
      setUser({
        username: '',
        password: '',
        role: 'IT_Personnel',
        fullName: '',
        designation: '',
      });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while adding the user.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Role:</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="IT_Personnel">IT Personnel</option>
            <option value="IT_Admin">IT Admin</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Designation:</label>
          <input
            type="text"
            name="designation"
            value={user.designation}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;