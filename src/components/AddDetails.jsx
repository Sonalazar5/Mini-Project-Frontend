import React, { useState } from 'react';
import axios from 'axios';

const AddDetails = () => {
  const [details, setDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
  });
  const [rationCardImage, setRationCardImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRationCardImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', details.name);
    formData.append('email', details.email);
    formData.append('address', details.address);
    formData.append('phone', details.phone);
    formData.append('password', details.password);
    formData.append('rationcard', rationCardImage);

    try {
      const response = await axios.post('http://localhost:8080/registerBplUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data && response.data.message) {
        setSuccessMessage(response.data.message);
        setDetails({
          name: '',
          email: '',
          address: '',
          phone: '',
          password: '',
        });
        setRationCardImage(null);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('There was an error!', error);
      setErrorMessage(error.response?.data?.message || 'Error adding details.');
      setSuccessMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Add User Details</h2>
      <input
        type="text"
        name="name"
        value={details.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '15px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          fontSize: '1rem',
        }}
      />
      <input
        type="email"
        name="email"
        value={details.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '15px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          fontSize: '1rem',
        }}
      />
      <input
        type="text"
        name="address"
        value={details.address}
        onChange={handleInputChange}
        placeholder="Address"
        required
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '15px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          fontSize: '1rem',
        }}
      />
      <input
        type="text"
        name="phone"
        value={details.phone}
        onChange={handleInputChange}
        placeholder="Phone"
        required
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '15px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          fontSize: '1rem',
        }}
      />
      <input
        type="password"
        name="password"
        value={details.password}
        onChange={handleInputChange}
        placeholder="Password"
        required
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '15px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          fontSize: '1rem',
        }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          fontSize: '1rem',
          color: '#333',
          backgroundColor: '#f2f2f2',
        }}
      />
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#218838')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#28a745')}
      >
        Submit
      </button>
      {successMessage && (
        <p style={{ color: 'green', textAlign: 'center', marginTop: '20px', fontSize: '1rem' }}>{successMessage}</p>
      )}
      {errorMessage && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '20px', fontSize: '1rem' }}>{errorMessage}</p>
      )}
    </form>
  );
};

export default AddDetails;
