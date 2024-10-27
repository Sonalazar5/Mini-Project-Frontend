import React from 'react';
import axios from 'axios';

const Payment = ({ product }) => {
  const handleBuyNow = async () => {
    console.log('Buy Now clicked'); // Log when the button is clicked
    try {
      // Log product details for debugging
      console.log("Initiating payment for product:", product);

      // Step 1: Create an order on your server
      const orderResponse = await axios.post('http://localhost:8080/order', {
        amount: product.price * 100, // Convert to paise
        currency: 'INR',
        receipt: `receipt_${product._id}`,
        notes: { productName: product.name },
      });

      console.log("Order response:", orderResponse.data); // Log the order response

      const { id: order_id, currency, amount } = orderResponse.data;

      // Step 2: Set up Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay key
        amount: amount, // Amount in paise
        currency: currency,
        name: 'Sadhya',
        description: `Order for ${product.name}`,
        order_id: order_id,
        handler: async function (response) {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            productId: product._id,
            amount: product.price * 100, // Include the amount
            currency: 'INR', // Include currency for backend processing
            receipt: `receipt_${product._id}`, // Include receipt for backend processing
          };

          try {
            // Step 3: Post payment data to your server
            const paymentResponse = await axios.post('http://localhost:8080/paymentsuccess', paymentData);
            console.log("Payment stored response:", paymentResponse.data); // Log the response after storing payment
            alert('Payment successful! Your order has been placed.');
          } catch (error) {
            console.error('Error storing payment data:', error);
            alert('Payment successful, but failed to store payment details.');
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

      // Step 4: Open Razorpay payment modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during the order process:', error);
      alert('Error during order process. Please try again.');
    }
  };

  return (
    <button onClick={handleBuyNow}>Buy Now</button>
  );
};

export default Payment;
