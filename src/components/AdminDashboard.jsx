import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear stored admin data (e.g., token, admin ID)
    localStorage.removeItem('adminId'); // Adjust this as per your storage logic
    alert('Logged out successfully!'); // Optional alert
    navigate('/HomePage'); // Redirect to the homepage
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      {/* Vertical Navbar */}
      <nav style={{
        backgroundColor: '#4CAF50',
        height: '100vh',
        padding: '20px',
        width: '200px',
        backgroundImage: 'url(sadhya.png)', // Add your image URL here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Link style={linkStyle} to="/AddProducts">Add Products</Link>
          </li>
          <li>
            <Link style={linkStyle} to="/AdminAddDiet">Add Diet Plan</Link>
          </li>
          <li>
            <Link style={linkStyle} to="/AddBPLProducts">Add BPL Products</Link>
          </li>
          <li>
            <Link style={linkStyle} to="/AdminVerify">BPL Verify</Link>
          </li>
          <li>
            <Link style={linkStyle} to="/ProductManagement">Delete Products</Link>
          </li>

          <li>
            <Link style={linkStyle} to="/ProductSalesAnalysis">Product Sales</Link>
          </li>
          <li>
            <Link style={linkStyle} to="/PaymentHistory">User Orders</Link>
          </li>
          <li>
            <Link style={linkStyle} to="/ViewBPLOrders">View BPL Orders</Link>
          </li>
          <li>
            <Link style={linkStyle} to="/AdminFeedbackViewer">View Feedback</Link>
          </li>
          <li>
            <button style={logoutButtonStyle} onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        padding: '20px',
        backgroundColor: '#f4f4f4',
        height: '100vh',
        backgroundImage: 'url(your-background-image-url)', // Add your image URL here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.9, // Optional to make the background less overwhelming
      }}>
        <h1 style={{ color: '#333', margin: '0 0 20px' }}>Welcome Admin</h1>
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

// Inline styles
const linkStyle = {
  color: 'white',
  display: 'block',
  fontSize: '18px',
  margin: '10px 0',
  textDecoration: 'none',
  padding: '10px',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};

const logoutButtonStyle = {
  backgroundColor: '#f44336',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '20px',
  padding: '10px',
  width: '100%',
  transition: 'background-color 0.3s',
};

// Change background color on hover for links
const handleMouseEnter = (event) => {
  event.target.style.backgroundColor = '#45a049'; // Darker green on hover
};

const handleMouseLeave = (event) => {
  event.target.style.backgroundColor = 'transparent'; // Reset to transparent
};

export default AdminDashboard;
