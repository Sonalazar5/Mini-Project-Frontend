import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteProducts from './DeleteProducts'; // Import the DeleteProducts component

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/Viewproducts");
        setProducts(response.data); // Assuming response.data is the product array
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductDeleted = (productId) => {
    setProducts(products.filter(product => product._id !== productId)); // Update the product list
  };

  return (
    <div style={{ 
      maxWidth: '700px', 
      margin: '20px auto', 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '10px', 
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
      backgroundColor: '#fff', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#4A4A4A', 
        marginBottom: '20px' 
      }}>Product Management</h1>
      <DeleteProducts products={products} onProductDeleted={handleProductDeleted} />
      {products.length === 0 && <p style={{ textAlign: 'center', color: '#777' }}>No products found.</p>}
    </div>
  );
};

export default ProductManagement;