import React from 'react';
import axios from 'axios';

const DeleteProducts = ({ products = [], onProductDeleted }) => {
  const handleProductDeleted = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.post("http://localhost:8080/deleteProducts", { _id: productId });
        if (response.data.status === "deleted") {
          alert("Product deleted successfully");
          onProductDeleted(productId); // Notify parent to update the product list
        } else {
          alert("Product not found");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("An error occurred while deleting the product");
      }
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>Products List</h2>
      {products.length === 0 ? (
        <p style={{ color: '#666' }}>No products found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {products.map((product) => (
            <li key={product._id} style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '18px', color: '#333' }}>
                {product.name} - Price: ₹{product.price}
              </span>
              <button 
                onClick={() => handleProductDeleted(product._id)} 
                style={{ 
                  padding: '8px 12px', 
                  backgroundColor: '#e74c3c', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  transition: 'background-color 0.3s', 
                }} 
                onMouseEnter={e => e.target.style.backgroundColor = '#c0392b'}
                onMouseLeave={e => e.target.style.backgroundColor = '#e74c3c'}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteProducts;
