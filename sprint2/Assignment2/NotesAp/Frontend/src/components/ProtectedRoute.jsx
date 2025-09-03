import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;
  if (adminOnly && user.role !== 'Admin') return <Navigate to="/dashboard" replace />;

  return children;
}
