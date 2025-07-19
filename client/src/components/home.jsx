import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaUserShield } from 'react-icons/fa';
import './home.css';

function Home() {
  return (
    <> 
          <div className="logo-wrapper">
        <img src="/images/logo.jpg" alt="MYFora Logo" className="logo-image" />
        <h2 className="app-name">MYFora</h2>
      </div>
       <div className="home-container">
      <h1 className="home-title">Welcome to <span className="app-highlight">MYFora</span></h1>
      
      <div className="home-grid">
        {/* Left Side - User */}
        <div className="home-card user-card">
          <FaUserAlt className="home-icon" />
          <h2>For Users</h2>
          <Link to="/login" className="home-button">User Login</Link>
        </div>

        {/* Right Side - Admin */}
        <div className="home-card admin-card">
          <FaUserShield className="home-icon" />
          <h2>For Admins</h2>
          <Link to="/admin/login" className="home-button">Admin Login</Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
