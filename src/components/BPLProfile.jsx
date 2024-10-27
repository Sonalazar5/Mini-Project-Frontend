import React, { useEffect, useState } from 'react';

const BPLProfile = () => {
  const [userName, setUserName] = useState(''); // Default to an empty string initially

  const handleLogout = () => {
    sessionStorage.clear();
    alert('Logged out successfully!');
    window.location.href = '/HomePage';
  };

  useEffect(() => {
    const name = sessionStorage.getItem('name') || 'User'; // Fallback to 'User' if name is not available
    setUserName(name);
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div 
      className="d-flex"
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/Sadhya1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
      }}
    >
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: '10px', 
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
        padding: '40px', 
        textAlign: 'center',
        flex: '1',
        marginRight: '20px',
      }}>
        <h2 className="text-success" style={{ marginBottom: '20px', fontFamily: 'cursive' }}>
          Welcome {userName}!
        </h2>
        <p style={{ color: '#555', fontSize: '16px' }}>
          Here you can view your orders, browse products, and manage your cart.
        </p>

        {/* Navigation Links */}
        <div style={{ marginTop: '30px' }}>
          <a className="btn btn-primary mx-2" href="/BplProducts">Products</a>
          
          <a className="btn btn-info mx-2" href="/BPLDietPlan">Diet Plan</a>
          
          
          <a 
            className="btn btn-danger mx-2" 
            href="#" 
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default BPLProfile;
