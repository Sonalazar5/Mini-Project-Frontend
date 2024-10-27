import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = ({ userId }) => {
  const [cart, setCartState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        console.warn('No userId provided. Cannot fetch cart.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/viewCart', { params: { userId } });
        if (response.data && response.data.products) {
          setCartState(response.data.products);
        } else {
          setCartState([]);
        }
      } catch (error) {
        setError('Failed to fetch cart. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleBuyNow = async (item) => {
    const product = item.productId;

    if (!product || !product.price) {
      console.error('Product data is invalid or missing price.');
      return;
    }

    try {
      const orderResponse = await axios.post('http://localhost:8080/order', {
        amount: product.price * item.quantity * 100,
        currency: 'INR',
        receipt: `receipt_${product._id}`,
        notes: { note_key: 'note_value' },
      });

      const { id: order_id, currency, amount } = orderResponse.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'Sadhya',
        description: `Order for ${product.name}`,
        order_id: order_id,
        handler: async (response) => {
          const paymentData = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            userId: localStorage.getItem('userId'),
            productId: product._id,
            amount: product.price * item.quantity * 100,
            currency: 'INR',
            receipt: `receipt_${product._id}`,
          };

          try {
            await axios.post('http://localhost:8080/paymentsuccess', paymentData);
            setPaymentSuccess(true);
          } catch (error) {
            console.error('Error recording payment:', error.response ? error.response.data : error.message);
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

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during the order process:', error.response ? error.response.data : error.message);
      alert('Error during order process. Please try again.');
    }
  };

  const removeProduct = async (productId) => {
    try {
      await axios.delete('http://localhost:8080/remove', { data: { userId, productId } });
      setCartState(cart.filter(item => item.productId?._id !== productId));
    } catch (error) {
      console.error('Error removing product:', error.response ? error.response.data : error.message);
      alert('Error removing product. Please try again.');
    }
  };

  const updateQuantity = (productId, increment) => {
    setCartState(cart.map(item => {
      if (item.productId?._id === productId) {
        const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(newQuantity, 1) };
      }
      return item;
    }));
  };

  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Your Cart</h2>
      <div className="row">
        {cart.map((item) => (
          <div key={item.productId?._id} className="col-md-4 mb-4">
            <div className="card" style={{ border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
              {item.productId && (
                <>
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '10px 10px 0 0',
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: '#333' }}>{item.productId.name}</h5>
                    <p className="card-text">Price: ₹{item.productId.price} - {item.quantity} units</p>
                    <div className="d-flex justify-content-between">
                      <div>
                        <button 
                          className="btn btn-light btn-sm"
                          onClick={() => updateQuantity(item.productId._id, false)}
                          style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '5px 10px', backgroundColor: '#fff', color: '#333' }}
                        >
                          -
                        </button>
                        <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                        <button 
                          className="btn btn-light btn-sm"
                          onClick={() => updateQuantity(item.productId._id, true)}
                          style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '5px 10px', backgroundColor: '#fff', color: '#333' }}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="btn btn-light btn-sm" 
                        onClick={() => removeProduct(item.productId._id)}
                        style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '5px 10px', backgroundColor: '#fff', color: '#d9534f' }}
                      >
                        Remove
                      </button>
                    </div>
                    <button 
                      className="btn btn-primary btn-sm mt-2" 
                      onClick={() => handleBuyNow(item)}
                      style={{ borderRadius: '5px', padding: '8px 12px', backgroundColor: '#007bff', color: '#fff' }}
                    >
                      Buy Now
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
