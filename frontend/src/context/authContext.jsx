import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (error) {
      setUser(null);
      if (error.response?.status === 401 && window.location.pathname !== "/login") {
        navigate("/login");
      }
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchUser()
  }, []);

  const login = async (credentials) => {
    await api.post("/auth/login", credentials);
    fetchUser()
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  const value = {
    user, loading, login, logout, refreshUser: fetchUser,
  };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};