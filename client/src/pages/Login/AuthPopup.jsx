import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // styling for popup

const AuthPopup = ({ onClose, onLoginSuccess }) => {
  //  Login/Signup toggle ke liye state
  const [isSignup, setIsSignup] = useState(false);

  // Form ke input data ke liye state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  //  Error message ke liye state
  const [error, setError] = useState('');

  //  Input field change handle karna
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit handle karna (login/signup)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Login ya Signup ka URL
    const endpoint = isSignup
      ? 'http://localhost:5000/api/auth/signup'
      : 'http://localhost:5000/api/auth/login';

    try {
      //  Agar signup hai toh full data bhejo, login me sirf username & password
      const payload = isSignup
        ? formData
        : { username: formData.username, password: formData.password };

      const res = await axios.post(endpoint, payload);
      console.log(' Auth Success:', res.data);

      //  Token aur user data localStorage me store karo
      console.log("Received Token:", res.data.token);
      localStorage.setItem('userToken', res.data.token);
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));

      //  Navbar ko update karo & popup band karo
      onLoginSuccess(); 
      onClose();
    } catch (err) {
      console.error('Auth Error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

        {/*Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
          />
          
          {/* Email field sirf signup ke time show hota hai */}
          {isSignup && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          )}
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          {/* Error message dikhana */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit">
            {isSignup ? 'Create Account' : 'Login'}
          </button>
        </form>

        {/*  Switch between login and signup */}
        <p className="auth-switch">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? ' Login' : ' Sign up'}
          </span>
        </p>

        {/* Close button */}
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default AuthPopup;
