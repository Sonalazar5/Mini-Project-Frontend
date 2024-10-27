import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminVerify = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/get-users');
        setUsers(response.data);
      } catch (error) {
        setMessage('Error fetching users: ' + (error.response?.data?.error || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleVerify = async (email) => {
    try {
      const response = await axios.post(`http://localhost:8080/verify-user/${email}`);
      setMessage(response.data.message);
      // Fetch users again to get the updated status
      const updatedResponse = await axios.get('http://localhost:8080/get-users');
      setUsers(updatedResponse.data);
    } catch (error) {
      setMessage('Error verifying user: ' + (error.response?.data?.error || error.message));
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  if (loading) return <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading users...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem', color: '#333' }}>Verify Users</h1>
      {users.length ? (
        users.map((user) => (
          <div key={user.email} style={{ backgroundColor: '#fff', border: '1px solid #e1e1e1', borderRadius: '8px', padding: '15px', marginBottom: '20px', transition: 'box-shadow 0.3s' }}>
            <p style={{ margin: '5px 0', fontSize: '1.1rem' }}><strong>Name:</strong> {user.name}</p>
            <p style={{ margin: '5px 0', fontSize: '1.1rem' }}><strong>Email:</strong> {user.email}</p>
            
            {user.rationcard && (
              <img
                src={`http://localhost:8080/uploads/${user.rationcard}`}
                alt="Ration Card"
                onClick={() => openModal(`http://localhost:8080/uploads/${user.rationcard}`)}
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px', borderRadius: '4px', cursor: 'pointer' }}
              />
            )}
            <button 
              onClick={() => handleVerify(user.email)} 
              disabled={user.verified} // Disable if user is already verified
              style={{
                marginTop: '10px',
                backgroundColor: user.verified ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 15px',
                cursor: user.verified ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => { if (!user.verified) e.target.style.backgroundColor = '#218838'; }}
              onMouseLeave={(e) => { if (!user.verified) e.target.style.backgroundColor = '#28a745'; }}
            >
              {user.verified ? 'Verified' : 'Verify User'}
            </button>
          </div>
        ))
      ) : (
        <p>No users to verify</p>
      )}
      {message && <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{message}</p>}

      {/* Modal for displaying the enlarged image */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }} onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged Ration Card" style={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: '8px' }} />
            <button onClick={closeModal} style={{
              marginTop: '15px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: '#333',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVerify;
