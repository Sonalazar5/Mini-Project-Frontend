import React from 'react';
import './Navbar.css'; // Ensure you create a Navbar.css file for additional styling

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-xxl bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand logo" href="#">
            <h1 className="sadhya-logo">
              <i>SADHYA</i>
            </h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-white" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active text-white" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/About">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/AdminLogin">
                  Admin Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
