import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './tooglenest_frontend/pages/auth/Login';
import Signup from './tooglenest_frontend/pages/auth/Signup';
import Dashboard from './tooglenest_frontend/pages/Dashboard';
import Projects from './tooglenest_frontend/pages/Projects';
import Tasks from './tooglenest_frontend/pages/Tasks';
import Kanban from './tooglenest_frontend/pages/Kanban';
import Landing from './tooglenest_frontend/pages/Landing';
import About from './tooglenest_frontend/pages/About';
import ProtectedRoute from './tooglenest_frontend/components/auth/ProtectedRoute';
import PublicRoute from './tooglenest_frontend/components/auth/PublicRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/kanban"
        element={
          <ProtectedRoute>
            <Kanban />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;