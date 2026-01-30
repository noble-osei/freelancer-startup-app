import React from 'react'
import { useAuth } from '../context/authContext.jsx'
import { Outlet, useNavigate } from 'react-router-dom'

function ProtectedRoute() {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {loading && (<p>Loading...</p>)}
      {isAuthenticated ? <Outlet /> : navigate("/login")}
    </>
  )
}

export default ProtectedRoute