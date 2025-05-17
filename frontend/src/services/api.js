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

export default API;
