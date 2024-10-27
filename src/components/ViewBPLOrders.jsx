import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBPLOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bpl-orders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust based on your auth setup
          },
        });
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', fontSize: '18px' }}>Loading orders...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>BPL Orders</h2>
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>No BPL orders found.</p>
      ) : (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}>
          <thead style={{ backgroundColor: '#4CAF50', color: 'white' }}>
            <tr>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Order ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>User ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Product ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Notes</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px', textAlign: 'center' }}>{order._id}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{order.userId}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{order.productId}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{JSON.stringify(order.notes)}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewBPLOrders;
