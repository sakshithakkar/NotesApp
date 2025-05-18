import axios from 'axios';
import { getToken } from '../auth';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Intercept 401 Unauthorized
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token'); // optional: clean up
      window.location.href = '/session-expired';
    }
    return Promise.reject(error);
  }
);


export default API;
