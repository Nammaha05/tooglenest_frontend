export const API_BASE_URL = 'http://localhost:5000/api';

// API Endpoints - Kaunsa API kahan hai?
export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        ME: '/auth/me'
    },
    PROJECTS: '/projects',
    TASKS: '/tasks'
};

// Local Storage Keys - Browser mein data save karne ke liye
export const STORAGE_KEYS = {
    TOKEN: 'togglenest_token',
    USER: 'togglenest_user'
};

// Task Status
export const TASK_STATUS = {
    TODO: 'To-Do',
    IN_PROFRESS: 'In Progress',
    DONE: 'Done'
};

// User Roles
export const USER_ROLES = {
    ADMIN: 'admin',
    MEMBER: 'member'
};



