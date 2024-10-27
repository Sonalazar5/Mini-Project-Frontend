import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch messages from the server
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8080/messages');
        setMessages(response.data);
      } catch (error) {
        setError('Error fetching messages. Please try again later.');
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Messages from Users</h2>
      {loading ? (
        <p>Loading messages...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : messages.length === 0 ? (
        <p>No messages available.</p>
      ) : (
        messages.map((message) => (
          <div key={message._id} style={styles.message}>
            {/* Check if sender exists and has a name property */}
            <strong>{message.sender ? message.sender.name : 'Unknown Sender'}:</strong> <br />
            <strong>Address:</strong> {message.address}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    maxHeight: '400px',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
  },
  message: {
    margin: '5px 0',
    padding: '5px',
    border: '1px solid #e0e0e0',
    borderRadius: '3px',
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
  },
};

export default AdminPage;
