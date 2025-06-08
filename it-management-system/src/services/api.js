// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Add this interceptor if not present:
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;