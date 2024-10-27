import React, { useState } from 'react';
import axios from 'axios';

const  AddBPLProducts = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/addBPLProduct', productData);
      setMessage(response.data.message);
      setProductData({ name: '', description: '', price: '', category: '', image: '' });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error adding product');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#343a40' }}>Add BPL Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          Name:
          <input 
            type="text" 
            name="name" 
            value={productData.name} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '5px', fontSize: '16px' }} 
          />
        </label>
        <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          Description:
          <input 
            type="text" 
            name="description" 
            value={productData.description} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '5px', fontSize: '16px' }} 
          />
        </label>
        <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          Price:
          <input 
            type="number" 
            name="price" 
            value={productData.price} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '5px', fontSize: '16px' }} 
          />
        </label>
        <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          Category:
          <input 
            type="text" 
            name="category" 
            value={productData.category} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '5px', fontSize: '16px' }} 
          />
        </label>
        <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          Image URL:
          <input 
            type="text" 
            name="image" 
            value={productData.image} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '5px', fontSize: '16px' }} 
          />
        </label>
        <button 
          type="submit" 
          style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          Add Product
        </button>
      </form>
      {message && <p style={{ textAlign: 'center', marginTop: '15px', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default  AddBPLProducts;
