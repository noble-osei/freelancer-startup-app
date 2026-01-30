import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <Routes>
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App