import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('/api/payments');
                setPayments(response.data);
            } catch (err) {
                setError('Error fetching payments');
            }
        };

        fetchPayments();
    }, []);

    return (
        <div>
            <h2>Completed Payments</h2>
            {error && <p>{error}</p>}
            {payments.length === 0 ? (
                <p>No completed payments found.</p>
            ) : (
                <ul>
                    {payments.map(payment => (
                        <li key={payment._id}>
                            User ID: {payment.userId} - Amount: {payment.amount} - Status: {payment.status}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PaymentList;
