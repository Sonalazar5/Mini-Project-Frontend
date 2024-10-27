import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrders = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');
    const API_URL = 'http://localhost:8080/userpayments';

    useEffect(() => {
        const fetchUserPayments = async () => {
            try {
                console.log('User ID:', userId); // Log User ID
                const response = await axios.get(API_URL, { params: { userId } });
                console.log('API Response:', response.data); // Log API response
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
                setError('Failed to fetch payments. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserPayments();
    }, [userId]);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>My Orders</h1>
            {loading ? (
                <p style={styles.loadingText}>Loading payments...</p>
            ) : error ? (
                <p style={styles.errorText}>{error}</p>
            ) : (
                <table style={styles.table}>
                    <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}>Payment ID</th>
                            <th style={styles.th}>Product Name</th>
                            <th style={styles.th}>Amount</th>
                            <th style={styles.th}>Date</th>
                        </tr>
                    </thead>
                    <tbody style={styles.tbody}>
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <tr key={payment._id} style={styles.tr}>
                                    <td style={styles.td}>{payment.razorpayPaymentId}</td>
                                    <td style={styles.td}>{payment.product ? payment.product.name : 'Unknown Product'}</td>
                                    <td style={styles.td}>₹{(payment.amount / 100).toFixed(2)}</td>
                                    <td style={styles.td}>{new Date(payment.createdAt).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={styles.emptyMessage}>No payments found</td>
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
    loadingText: {
        textAlign: 'center',
        color: '#666',
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
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

export default UserOrders;
