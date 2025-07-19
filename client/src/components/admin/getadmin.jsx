import React from 'react'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/getadmin.css';
function GetAdmin() {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('http://localhost:8050/api/getadmins');
        setAdminData(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    fetchAdminData();
  }, []);
      const handleDelete = async (adminId) => {
      try {
        await axios.delete(`http://localhost:8050/api/deleteadmin/${adminId}`);
        setAdminData(adminData.filter(admin => admin._id !== adminId));
      } catch (error) {
        console.error('Error deleting admin:', error);
      }
    };

  return (
       <div className="admin-list-container">
      {/* Logo */}
      <div className="logo-wrapper">
        <img src="/images/logo.jpg" alt="MYFora Logo" className="logo-image" />
        <h1 className="app-name">MYFora</h1>
      </div>

      <h2>Admin List</h2>

      {adminData ? (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Admin ID</th>
                <th>Admin Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminData.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin._id}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(admin._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading admin data...</p>
      )}

      <Link to="/admin" className="back-btn">← Back to Dashboard</Link>
    </div>
  )
}

export default GetAdmin;
