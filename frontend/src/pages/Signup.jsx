import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import SignupForm from '../components/auth/SignupForm.jsx';
import api from '../api/axios.js';

function SignupPage() {
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      await api.post('/auth/signup', data);
      toast.success('Account created successful!');
      navigate('/login');
    } catch (error) {
      const message = error.message || "Something went wrong. Try again!";
      toast.error(message);
    } finally { setLoading(false) }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-base-200 relative'>
      <SignupForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}

export default SignupPage