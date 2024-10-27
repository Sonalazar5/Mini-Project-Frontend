import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for routing

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send product data to the backend
    axios.post('http://localhost:8080/addProduct', product)
      .then(response => {
        alert('Product added successfully');
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const handleButtonClick = () => {
    // Additional functionality if needed on button click
    console.log('Button clicked!');
  };

  return (
    <div
      className="add-product-container"
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/Sadhya1.png')",  // Ensure the correct path to the image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column' // Added to stack the link and form
      }}
    >
      <div style={{ alignSelf: 'flex-end', margin: '20px' }}>
        <Link to="/AddBPLProducts" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
          Add BPL Product
        </Link>
      </div>
      <form 
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Product</h2>

        <div style={{ marginBottom: '15px' }}>
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            value={product.name} 
            onChange={handleChange} 
            required 
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description</label>
          <input 
            type="text" 
            name="description" 
            value={product.description} 
            onChange={handleChange} 
            required 
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Price</label>
          <input 
            type="number" 
            name="price" 
            value={product.price} 
            onChange={handleChange} 
            required 
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Category</label>
          <input 
            type="text" 
            name="category" 
            value={product.category} 
            onChange={handleChange} 
            required 
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Image URL</label>
          <input 
            type="text" 
            name="image" 
            value={product.image} 
            onChange={handleChange} 
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
            }}
          />
        </div>

        <button 
          type="submit" 
          onClick={handleButtonClick}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '10px',
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
