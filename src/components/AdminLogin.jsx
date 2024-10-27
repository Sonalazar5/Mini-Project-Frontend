import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correct import

const Login = () => {
  const [input, setInput] = useState({
    admin_name: "",
    admin_password: ""
  });

  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate(); // Declare navigate outside readValue

  const readValue = () => {
    console.log(input);

    axios.post("http://localhost:8080/AdminLogin", input)
      .then((response) => {
        console.log(response.data);

        if (response.data.status === "Login success") {
          // Corrected the sessionStorage values
          sessionStorage.setItem("admin_name", response.data.admin_name);
          sessionStorage.setItem("token", response.data.token);

          // Navigate to AdminDashboard
          navigate("/AdminDashboard");
        } else {
          alert(response.data.status);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="bg-success" style={{
      minHeight: '100vh',
      backgroundImage: "url('/good.png')",
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
                <label htmlFor="admin_name" className="form-label" style={{ color: 'black' }}><b>ADMIN NAME</b></label>
                <input type="text" className="form-control" style={{ color: 'black' }} id="admin_name" name='admin_name' value={input.admin_name} onChange={inputHandler} />
              </div>
              <div className="col-12 col-md-3 offset-md-4">
                <label htmlFor="admin_password" className="form-label" style={{ color: 'black' }}><b>PASSWORD</b></label>
                <input type="password" className="form-control" style={{ color: 'black' }} id="admin_password" name='admin_password' value={input.admin_password} onChange={inputHandler} />
              </div>
              <center>
                <div className="col-12">
                  <button className="btn btn-success" onClick={readValue}>LOGIN</button>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
