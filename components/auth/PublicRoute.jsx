import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Agar logged in hai, dashboard pe bhej do
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Agar logged out hai, page dikhao (Login/Signup)
  return children;
};

export default PublicRoute;