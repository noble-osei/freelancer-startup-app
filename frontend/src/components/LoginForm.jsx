import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm({ onSubmit }) {
  const [ formData, setFormData ] = useState({
    usernameOrEmail: "",
    password: "",
    rememberMe: false
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
            <h2 className='text-2xl font-semibold'>Login</h2>
          </div>

          <form className='space-y-4 mt-6' onSubmit={handleSubmit} method='POST'>
            {/* UsernameOrEmail input */}
            <div className="form-control">
              <input 
                type="text"
                name='usernameOrEmail'
                className='input input-bordered w-full'
                placeholder='Username or Email'
                value={formData.usernameOrEmail}
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

            <div className="form-control">
              <input 
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={() => setFormData({ ...formData, rememberMe: !formData.rememberMe })}
              />

              <label className="label ml-1">
                <span className="label-text">Remember Me</span>
              </label>
            </div>

            <button type="submit" className='btn btn-primary w-full'>
              Login
            </button>

            <p className='text-center text-base-content/70'>
              Don't have an account?
              <Link to={"/signup"} className='link link-primary ml-1'>Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm