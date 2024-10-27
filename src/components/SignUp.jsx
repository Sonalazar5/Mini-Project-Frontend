import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [input, setInput] = useState({
    name: "",
    phonenumber: "",
    email: "",
    address: "",
    password: "",
    confirmpassword: ""
  });

  const [errorMessages, setErrorMessages] = useState([]); // Array to hold error messages

  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const validateInput = () => {
    const errors = [];
    const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

    if (!input.name) {
      errors.push("Name is required.");
    }
    if (!input.phonenumber || !phoneRegex.test(input.phonenumber)) {
      errors.push("A valid 10-digit phone number is required.");
    }
    if (!input.email || !emailRegex.test(input.email)) {
      errors.push("A valid email address is required.");
    }
    if (!input.address) {
      errors.push("Address is required.");
    }
    if (!input.password) {
      errors.push("Password is required.");
    }
    if (input.password !== input.confirmpassword) {
      errors.push("Password and Confirm Password do not match.");
    }

    return errors;
  };

  const readValue = () => {
    const errors = validateInput(); // Validate inputs
    if (errors.length > 0) {
      setErrorMessages(errors); // Set error messages
      return; // Exit if there are validation errors
    }

    const newInput = {
      name: input.name,
      phonenumber: input.phonenumber,
      email: input.email,
      address: input.address,
      password: input.password
    };

    axios.post("http://localhost:8080/SignUp", newInput)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          sessionStorage.setItem('name', input.name); // Store name
          alert("Registered successfully");
          setInput({
            name: "",
            phonenumber: "",
            email: "",
            address: "",
            password: "",
            confirmpassword: ""
          });
          window.location.href = '/UserProfile'; // Redirect after signup
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="bg-success" style={{
      minHeight: '100vh',
      backgroundImage: "url('/Sadhyaaaaa.png')",
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
                <label htmlFor="name" className="form-label" style={{ color: 'black' }}><b>NAME</b></label>
                <input type="text" className="form-control" id="name" style={{ color: 'black' }} name='name' value={input.name} onChange={inputHandler} />
              </div>
              <div className="col-12 col-md-3 offset-md-4">
                <label htmlFor="phonenumber" className="form-label" style={{ color: 'black' }}><b>PHONE NUMBER</b></label>
                <input type="number" className="form-control" id="phonenumber" style={{ color: 'black' }} name='phonenumber' value={input.phonenumber} onChange={inputHandler} />
              </div>
              <div className="col-12 col-md-3 offset-md-4">
                <label htmlFor="email" className="form-label" style={{ color: 'black' }}><b>EMAIL-ID</b></label>
                <input type="text" className="form-control" style={{ color: 'black' }} id="email" name='email' value={input.email} onChange={inputHandler} />
              </div>
              <div className="col-12 col-md-3 offset-md-4">
                <label htmlFor="address" className="form-label" style={{ color: 'black' }}><b>ADDRESS</b></label>
                <input type="text" className="form-control" style={{ color: 'black' }} id="address" name='address' value={input.address} onChange={inputHandler} />
              </div>
              <div className="col-12 col-md-3 offset-md-4">
                <label htmlFor="password" className="form-label" style={{ color: 'black' }}><b>PASSWORD</b></label>
                <input type="password" className="form-control" style={{ color: 'black' }} id="password" name='password' value={input.password} onChange={inputHandler} />
              </div>
              <div className="col-12 col-md-3 offset-md-4">
                <label htmlFor="confirmpassword" className="form-label" style={{ color: 'black' }}><b>CONFIRM PASSWORD</b></label>
                <input type="password" className="form-control" style={{ color: 'black' }} id="confirmpassword" name='confirmpassword' value={input.confirmpassword} onChange={inputHandler} />
              </div>
              <center>
                <div className="col-12">
                  <button className="btn btn-success" onClick={readValue}>SIGNUP</button>
                </div>
              </center>
              {/* Display error messages */}
              {errorMessages.length > 0 && (
                <div className="col-12 mt-3">
                  <ul style={{ color: 'red' }}>
                    {errorMessages.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
