import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import LoginForm from '../components/LoginForm.jsx';
import api from '../api/axios.js';

function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await api.post('/auth/login', data);
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(message);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-base-200 relative'>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}

export default LoginPage