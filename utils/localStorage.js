 import { STORAGE_KEYS } from './constants';
 
 // Token save karo browser mein
 export const saveToken = (token) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
 };

 // Token retrieve karo browser se
export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// Token delete karo (Logout ke time)
export const removeToken = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

// User data save karo (Object hai toh JSON string mein convert karo)
export const saveUser = (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

// User data get karo (String se Object mein convert karo)
export const getUser = () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
};

// User data delete karo
export const removeUser = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
};

// Clear all auth data
export const clearAuthData = () => {
    removeToken();
    removeUser();
};


