import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Ensure the CSS file is imported
import { jwtDecode } from 'jwt-decode';

const HomePage = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const readValue = async () => {
    // Clear any previous errors
    setError('');

    // Validate input
    if (!input.email || !input.password) {
      setError('Email and Password are required.');
      return;
    }
    
    if (!validateEmail(input.email)) {
      setError('Invalid email format.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/SignIn', input);
      if (response.status === 200 && response.data.status === 'success') {
        const token = response.data.token;
        localStorage.setItem('token', token);

        const decoded = jwtDecode(token);
        localStorage.setItem('userId', decoded.userId);

        window.location.href = '/UserProfile'; 
      } else {
        setError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="homepage-bg" style={{ backgroundImage: `url('good.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">SADHYA</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/About">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/AdminLogin">Admin Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row g-3 form-container mt-5">
              <div className="col-12 col-md-6 offset-md-3">
                <h2 className="welcome-text text-center mb-4">Welcome to SADHYA</h2>
                <p className="welcome-subtext text-center">An Oasis for Healthy and Organic Food</p>

                <div className="mt-4">
                  <label htmlFor="email" className="form-label"><b>Email ID</b></label>
                  <input type="text" className="form-control transparent-input" id="email" name='email' value={input.email} onChange={inputHandler} />
                </div>
                <div className="mt-3">
                  <label htmlFor="password" className="form-label"><b>Password</b></label>
                  <input type="password" className="form-control transparent-input" id="password" name='password' value={input.password} onChange={inputHandler} />
                </div>
                <div className="col-12 text-center mt-4">
                  <button className="btn" onClick={readValue}>Login</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="col-12 text-center mt-3">
                  <span>
                    Doesn't have an account? <a className="nav-link text-success" href="/SignUp">Sign Up</a>
                  </span>
                </div>
                <div className="col-12 text-center mt-3">
                  <span>
                    BPL user? <a className="nav-link text-success" href="/BPLLogin">BPL SignIn</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
