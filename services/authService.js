 import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { saveToken, saveUser, clearAuthData } from '../utils/localStorage';


// Register new user
export const register = async (userData) => {
    try {
        // POST request bhejo with user data
        const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);

         // Backend se response return karo
        return response.data;
    } catch (error) {
        // Agar error aaye, throw kar do
        throw error.response?.data || error.message;
    }
};

// Login user
export const login = async (credentials) => {
    try {
        // POST request with email & password
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

        // Agar token mila, save kar lo
        if (response.data.token) {
            saveToken(response.data.token);
            saveUser(response.data.user);
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get current logged-in user details
export const getMe = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.AUTH.ME);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout user
export const logout = () => {
    clearAuthData();
     // Login page pe redirect karo
  window.location.href = '/login';
};