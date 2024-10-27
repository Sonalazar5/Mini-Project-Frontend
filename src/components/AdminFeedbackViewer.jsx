// AdminFeedbackViewer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminFeedbackViewer = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getFeedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div>
      <h1>Feedback from Users</h1>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        feedbacks.map(feedback => (
          <div key={feedback._id} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
            <p><strong>User:</strong> {feedback.userId.name} ({feedback.userId.email})</p>
            <p><strong>Feedback:</strong> {feedback.message}</p>
            <p><small>{new Date(feedback.createdAt).toLocaleString()}</small></p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminFeedbackViewer;
