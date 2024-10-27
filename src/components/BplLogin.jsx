import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BPLLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const validateEmail = (email) => {
    // Basic email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Check password length and complexity (at least 3 characters)
    return password.length >= 3;
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Reset error message
    setError('');

    // Validate email and password
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/BPLLogin', {
        email,
        password,
      });

      if (response.data.status === 'success') {
        alert('Login successful');
        // Redirect to BPL products page
        navigate('/BPLProfile'); // Use navigate to go to the BPL products page
      } else {
        setError('User not verified by admin');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('User not verified by admin');
    }
  };

  const handleSignup = () => {
    navigate('/AddDetails'); // Navigate to the signup page
  };

  const styles = {
    loginContainer: {
      width: '300px',
      margin: '50px auto',
      padding: '20px',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
    },
    loginForm: {
      display: 'flex',
      flexDirection: 'column',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    label: {
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
    },
    inputFocus: {
      borderColor: '#007bff',
      outline: 'none',
    },
    loginButton: {
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    signupContainer: {
      textAlign: 'center',
      marginTop: '20px',
    },
    signupButton: {
      color: '#007bff',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    error: {
      color: 'red',
      fontSize: '14px',
      marginTop: '10px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.loginContainer}>
      <h2 style={styles.heading}>BPL User Login</h2>
      <form onSubmit={handleLogin} style={styles.loginForm}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
        </div>
        {error && <div style={styles.error}>{error}</div>} {/* Show error message */}
        <button type="submit" style={styles.loginButton}>Login</button>
      </form>
      <div style={styles.signupContainer}>
        <p>
          Don't have an account?{' '}
          <button onClick={handleSignup} style={styles.signupButton}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default BPLLoginPage;
