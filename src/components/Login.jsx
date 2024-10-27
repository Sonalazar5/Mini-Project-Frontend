import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const readValue = async () => {
    console.log(input);
    try {
      const response = await axios.post('http://localhost:8080/SignIn', input);
      if (response.status === 200 && response.data.status === 'success') {
        const token = response.data.token;
        localStorage.setItem('token', token);

        const decoded = jwtDecode(token);
        localStorage.setItem('userId', decoded.userId);

        navigate('/UserProfile');
      } else {
        setError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="bg-success" style={{
      minHeight: '100vh',
      backgroundImage: "url('/Sadhya1.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '10px'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row g-3">
              <div className="col-12 col-md-3 offset-md-4">
                <label htmlFor="email" className="form-label" style={{ color: 'black' }}><b>EMAIL-ID</b></label>
                <input type="text" className="form-control" style={{ color: 'black' }} id="email" name='email' value={input.email} onChange={inputHandler} />
              </div>
              <div className="col-12 col-md-3 offset-md-4">
                <label htmlFor="password" className="form-label" style={{ color: 'black' }}><b>PASSWORD</b></label>
                <input type="password" className="form-control" style={{ color: 'black' }} id="password" name='password' value={input.password} onChange={inputHandler} />
              </div>
              <center>
                <div className="col-12">
                  <button className="btn btn-success" onClick={readValue}>LOGIN</button>
                </div>
              </center>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
