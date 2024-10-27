import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteUsers from './DeleteUsers';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getUsers");
        setUsers(response.data); // Assuming response.data is the user array
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserDeleted = (userId) => {
    setUsers(users.filter(user => user._id !== userId)); // Update the user list
  };

  return (
    <div style={{ 
      maxWidth: '700px', 
      margin: '20px auto', 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '10px', 
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
      backgroundColor: '#fff', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#4A4A4A', 
        marginBottom: '20px' 
      }}>User Management</h1>
      <DeleteUsers users={users} onUserDeleted={handleUserDeleted} />
      {users.length === 0 && <p style={{ textAlign: 'center', color: '#777' }}>No users found.</p>}
    </div>
  );
};

export default UserManagement;
