import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import SignupForm from '../components/SignupForm.jsx';
import api from '../api/axios.js';

function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await api.post('/auth/signup', data);

      toast.success('Account created successful!');
      navigate('/login');
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(message);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-base-200 relative'>
      <SignupForm onSubmit={handleSubmit} />
    </div>
  )
}

export default SignupPage