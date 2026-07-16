import axios from 'axios';

// Base API instance - ready for real backend integration
const api = axios.create({
  baseURL: 'https://api.aliveapp.com/v1', // Replace with real API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach auth token
api.interceptors.request.use(
  config => {
    // TODO: Get token from Zustand store or AsyncStorage
    // const token = useAuthStore.getState().token;
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
