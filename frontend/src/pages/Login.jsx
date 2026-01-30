import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import LoginForm from '../components/LoginForm.jsx';
import { useAuth } from "../context/authContext.jsx";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (data) => {
    try {
      await login(data);
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