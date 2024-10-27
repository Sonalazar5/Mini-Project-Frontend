import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BplProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bpl-products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = async (product) => {
    try {
      const isBPLUser = true; // Replace with actual condition to check if the user is BPL
  
      if (isBPLUser) {
        // Directly create an order on the server without using Razorpay for BPL users
        const orderResponse = await axios.post('http://localhost:8080/bpl-order', {
          userId: localStorage.getItem('userId'),
          productId: product._id,
          amount: 0, // No charge for BPL users
          notes: { productName: product.name, userCategory: 'BPL' },
        });
  
        console.log('Order created successfully for BPL user:', orderResponse.data);
        alert('Order placed successfully for BPL user!');
      } else {
        // Proceed with the Razorpay payment for non-BPL users
        const orderResponse = await axios.post('http://localhost:8080/order', {
          amount: product.price * 100,
          currency: 'INR',
          receipt: `receipt_${product._id}`,
          notes: { productName: product.name },
        });
  
        const { id: order_id, currency, amount } = orderResponse.data;
  
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: amount,
          currency: currency,
          name: 'Sadhya',
          description: `Order for ${product.name}`,
          order_id: order_id,
          handler: async function (response) {
            const paymentData = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              userId: localStorage.getItem('userId'),
              productId: product._id,
              amount: product.price * 100,
              currency: 'INR',
              receipt: `receipt_${product._id}`,
            };
  
            try {
              const paymentResponse = await axios.post('http://localhost:8080/paymentsuccess', paymentData);
              console.log('Payment response:', paymentResponse.data);
              alert('Payment successful! Your order has been placed.');
            } catch (error) {
              console.error('Error processing payment success:', error.response ? error.response.data : error.message);
              alert('Payment was successful, but we encountered an error while processing. Please contact support.');
            }
          },
          prefill: {
            name: 'Sona Lazar',
            email: 'sonalazar5@gmail.com',
            contact: '9633591213',
          },
          notes: {
            address: 'Sadhya Headquarters',
          },
          theme: {
            color: '#3399cc',
          },
        };
  
        if (typeof window.Razorpay !== 'undefined') {
          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } else {
          alert('Razorpay SDK not loaded.');
        }
      }
    } catch (error) {
      console.error('Error during the order process:', error.response ? error.response.data : error.message);
      alert('Error during order process. Please try again.');
    }
  };
  
  
  // Filtered products based on the search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by name
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) // Search by description
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        style={{
          padding: '10px',
          margin: '20px',
          width: 'calc(100% - 40px)',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              margin: '20px',
            }}
          >
            {filteredProducts.map((product) => (
              <div key={product._id} style={{ marginBottom: '40px' }}>
                <div
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    width: '300px',
                    height: '480px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                    }}
                  />
                  <h3 style={{ fontSize: '1.2em', margin: '10px 0' }}>{product.name}</h3>
                  <p style={{ fontSize: '0.9em', color: '#555' }}>{product.description}</p>
                  <p style={{ fontWeight: 'bold', color: '#2c3e50' }}>Price: ₹{product.price}</p>
                  <p style={{ fontSize: '0.9em', color: '#777' }}>Category: {product.category}</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '10px',
                  }}
                >
                  <button
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                    onClick={() => handleBuyNow(product)}
                  >
                   ORDER NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BplProducts;
