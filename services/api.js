 import axios from 'axios';
 import { API_BASE_URL } from '../utils/constants';
 import { getToken } from '../utils/localStorage';

 // Axios instance banao with default settings
 const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
 });

// Request Interceptor - Har request se pehle chalta hai
api.interceptors.request.use(
    (config) => {
        // LocalStorage se token lo
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor - Har response ke baad chalta hai
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
         // Agar 401 error (Unauthorized) aaye
        if (error.response?.status === 401) {
            // Token expired ya invalid hai
            localStorage.clear();// Sab data clear karo
            window.location.href = '/login';// Login page pe bhej do
        }

        return Promise.reject(error);
    }
);

export default api;