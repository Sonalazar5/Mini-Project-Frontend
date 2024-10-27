import React from 'react';
import axios from 'axios';

const DeleteUsers = ({ users = [], onUserDeleted }) => {
  const handleDelete = async (userId) => {
    try {
      const response = await axios.post("http://localhost:8080/deleteUser", { _id: userId });
      if (response.data.status === "deleted") {
        alert("User deleted successfully");
        onUserDeleted(userId); // Notify parent to update the user list
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user");
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>User List</h2>
      {users.length === 0 ? (
        <p style={{ color: '#666' }}>No users found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {users.map((user) => (
            <li key={user._id} style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '18px', color: '#333' }}>
                {user.name} ({user.email})
              </span>
              <button 
                onClick={() => handleDelete(user._id)} 
                style={{ 
                  padding: '8px 12px', 
                  backgroundColor: '#e74c3c', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  transition: 'background-color 0.3s', 
                }} 
                onMouseEnter={e => e.target.style.backgroundColor = '#c0392b'}
                onMouseLeave={e => e.target.style.backgroundColor = '#e74c3c'}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteUsers;
