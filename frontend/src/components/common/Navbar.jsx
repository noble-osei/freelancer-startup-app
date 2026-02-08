import React from 'react'

import { useAuth } from '../../context/authContext.jsx'

function Navbar() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <nav className='navbar bg-base-100 shadow-md px-6 justify-between'>
      <div>
        <span className='text-2xl font-bold text-base-content/50 tracking-tighter'>LOGO</span>
      </div>

      <div>
        <button className='btn btn-ghost' onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar