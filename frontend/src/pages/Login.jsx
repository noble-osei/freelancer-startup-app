import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import LoginForm from '../components/auth/LoginForm.jsx';
import { useAuth } from "../context/authContext.jsx";

function LoginPage() {
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      await login(data);
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(message);
    } finally { setLoading(false) }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-base-200 relative'>
      <LoginForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}

export default LoginPage