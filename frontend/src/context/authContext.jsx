import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchUser()
  }, []);

  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    setUser(res.data);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null)
    window.location.href = "/login";
  };

  const value = {
    user, loading, login, logout, isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {loading? null: children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  return useContext(AuthContext);
};