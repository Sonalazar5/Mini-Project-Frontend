import React, { useState } from 'react';
import axios from 'axios';

const AddToCart = ({ userId }) => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    try {
      const response = await axios.post('http://localhost:8080/addToCart', {
        userId,
        productId,
        quantity,
      });
      console.log('Cart updated:', response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div>
      <h2>Add Product to Cart</h2>
      <input
        type="text"
        value={productId}
        placeholder="Enter product ID"
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="number"
        value={quantity}
        placeholder="Quantity"
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;
