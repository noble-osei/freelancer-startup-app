import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignupForm({ onSubmit, loading }) {
  const [ formData, setFormData ] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });
  const [ showPassword, setShowPassword ] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData)
  };

  return (
    <div className='w-full max-w-100'>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">

          <div className='text-center'>
            <h2 className='text-2xl font-semibold'>Signup</h2>
          </div>

          <form className='space-y-4 mt-6' onSubmit={handleSubmit} method='POST'>
            {/* Full Name input */}
            <div className="form-control"> 
              <input 
                type="text"
                name='name'
                className='input input-bordered w-full'
                placeholder='Full Name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Username input */}
            <div className="form-control">
              <input 
                type="text"
                name='username'
                className='input input-bordered w-full'
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email input */}
            <div className="form-control">
              <input 
                type="email"
                name='email'
                className='input input-bordered w-full'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password input */}
            <div className="form-control relative">
              <input 
                type={showPassword? "text": "password"}
                name='password'
                className='input input-bordered w-full'
                placeholder='Create Password'
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type='button'
                className='absolute right-2 top-1/2 -translate-y-1/2 text-sm'
                onClick={() => setShowPassword(!showPassword)}
              >
                { showPassword ? "Hide": "Show"}
              </button>
            </div>

            <button type="submit" className='btn btn-primary w-full' disabled={loading}>
              {loading? (<span className='loading loading-spinner'></span>): "Signup"}
            </button>

            <p className='text-center text-base-content/70'>
              Already have an account?
              <Link to={"/login"} className='link link-primary ml-1'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupForm