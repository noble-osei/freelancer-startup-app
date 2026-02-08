import React, { useEffect } from 'react'
import { useAuth } from '../../context/authContext.jsx'
import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />;
}

export default ProtectedRoute