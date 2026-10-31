// src/services/api.js
import axios from 'axios';

const apiBaseURL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '')
  || (import.meta.env.PROD ? 'https://it-mangement-system.onrender.com/api' : '/api');

const api = axios.create({
  baseURL: apiBaseURL,
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