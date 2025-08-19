import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000/api';
export const PROJECT_API = `${API_BASE_URL}/projects`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;