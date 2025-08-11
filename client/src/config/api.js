export const API_BASE_URL = 'http://localhost:5000/api';
export const PROJECT_API = `${API_BASE_URL}/projects`;

// Add axios instance with default config
import axios from 'axios';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);