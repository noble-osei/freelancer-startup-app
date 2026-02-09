import React from 'react'
import { useAuth } from '../../context/authContext.jsx'
import { Outlet, Navigate } from 'react-router-dom'
import Loading from "./Loading.jsx"

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute