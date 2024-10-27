// FeedbackForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId'); // Get the logged-in user ID

    try {
      await axios.post('http://localhost:8080/submitFeedback', { userId, message });
      alert('Feedback submitted successfully!');
      setMessage(''); // Clear the message
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your feedback here..."
        required
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          marginBottom: '10px',
        }}
      />
      <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
        Submit Feedback
      </button>
    </form>
  );
};

export default Feedback;
