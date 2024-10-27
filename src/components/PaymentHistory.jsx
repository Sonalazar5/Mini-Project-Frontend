import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostSoldProduct, setMostSoldProduct] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentResponse = await axios.get('http://localhost:8080/viewpayments');
        // Filter out BPL product orders
        const filteredPayments = paymentResponse.data.filter(payment => !payment.bplproduct);
        setPayments(filteredPayments);

        // Calculate most sold product from filtered payments
        const productCount = {};
        filteredPayments.forEach(payment => {
          const productName = payment.product ? payment.product.name : 'Unknown Product';
          productCount[productName] = (productCount[productName] || 0) + 1;
        });

        const sortedProducts = Object.entries(productCount).sort((a, b) => b[1] - a[1]);
        setMostSoldProduct(sortedProducts[0] ? sortedProducts[0][0] : null);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>USER ORDERS</h1>
      {mostSoldProduct && (
        <p style={styles.mostSold}>Most Sold Product: {mostSoldProduct}</p>
      )}
      {loading ? (
        <p style={styles.loadingText}>Loading orders...</p>
      ) : (
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>User Name</th>
              <th style={styles.th}>Phone Number</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Product Name</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Payment ID</th>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody style={styles.tbody}>
            {payments.length > 0 ? (
              payments.map(payment => (
                <tr key={payment.razorpayPaymentId} style={styles.tr}>
                  <td style={styles.td}>{payment.userId ? payment.userId.name : 'Unknown User'}</td>
                  <td style={styles.td}>{payment.userId ? payment.userId.phonenumber : 'N/A'}</td>
                  <td style={styles.td}>{payment.userId ? payment.userId.email : 'N/A'}</td>
                  <td style={styles.td}>{payment.product ? payment.product.name : 'Unknown Product'}</td>
                  <td style={styles.td}>₹{(payment.amount / 100).toFixed(2)}</td>
                  <td style={styles.td}>{payment.razorpayPaymentId}</td>
                  <td style={styles.td}>{payment.razorpayOrderId}</td>
                  <td style={styles.td}>{new Date(payment.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={styles.emptyMessage}>No payments found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: 'auto',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  mostSold: {
    textAlign: 'center',
    color: '#007bff',
    fontSize: '1.2em',
    marginBottom: '10px',
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  thead: {
    backgroundColor: '#007bff',
    color: '#ffffff',
  },
  th: {
    padding: '10px',
    textAlign: 'left',
  },
  tbody: {
    backgroundColor: '#ffffff',
  },
  tr: {
    borderBottom: '1px solid #dddddd',
  },
  td: {
    padding: '10px',
    textAlign: 'left',
  },
  emptyMessage: {
    textAlign: 'center',
    padding: '20px',
    fontStyle: 'italic',
  },
};

export default PaymentHistory;
