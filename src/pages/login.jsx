import React, { useState } from 'react';
import '../assets/css/login.css'; 
import lock from '../assets/images/lock.png'; 
import mail from '../assets/images/email.png'; 
import logo from '../assets/images/logo.png'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

function Login() {
  // State hooks for managing form inputs and validation errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  // Function to validate form inputs
  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Invalid email address';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/\d/.test(password)) {
      errors.password = 'Password must contain at least one number';
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[!@#$%^&*]/.test(password)) {
      errors.password = 'Password must contain at least one special character';
    }

    return errors;
  };

  const navigate = useNavigate();

  // Handlers for input changes with error clearing
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      const newErrors = { ...errors };
      delete newErrors.email;
      setErrors(newErrors);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      const newErrors = { ...errors };
      delete newErrors.password;
      setErrors(newErrors);
    }
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      try {
        // Send login request
        const response = await axios.post('https://coreapi.hectorai.live/api/auth/login', {
          email,
          password,
        }, {
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Form submitted', response.data);

        // Extracting userDetails and token from response
        const { userDetails: {fullName}, token } = response.data;

        // Logging user details and token
        console.log('Fullname:', fullName);
        console.log('Token:', token);
 
        // Storing token for future requests (example using localStorage)
        localStorage.setItem('token', token);
        setErrors({});
        setAuthError('');

        // Navigate to home page on successful login
        if (response.data.success) {
          navigate('/home');
        } else {
          setAuthError('Invalid email or password.');
        }
      } catch (error) {
        console.error('Login error', error);
        setAuthError('Invalid email or password.');
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="login-container">
      <div className="company-logo">
        <img src={logo} alt="Company Logo"/>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        <div className="form-group">
          <label htmlFor="email" className="left">Email</label>
          <div className="input-container">
            <img src={mail} alt="Email Icon"/>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your Email address"
            />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="left">Password</label>
          <div className="input-container">
            <img src={lock} alt="Password Icon"/>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your Password"
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
          <a href="/forgot-password" className="forgot-password">
            Forgot password?
          </a>
        </div>
        <div className="form-group remembermeBlock">
          <label className="rememberMe">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
        </div>
        <button type="submit">SIGN IN</button>
      </form>
      {authError && <p className="error">{authError}</p>}
    </div>
  );
}

export default Login;
