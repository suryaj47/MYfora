import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/getuser.css'; // Assuming you have a CSS file for styling

function Getusers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    axios.get('https://myfora.onrender.com/api/getusers')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <>
    <div className="user-list-container">
        <div className="logo-wrapper">
    <img src="/images/logo.jpg" alt="MYFora Logo" className="logo-image" />
    <h1 className="app-name">MYFora</h1>
  </div>
      <h2>Users List</h2>

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Approval</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map((user, index) => (
              <tr key={user._id || index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneno}</td>
                <td>
                  <span className={user.approval ? "badge approved" : "badge not-approved"}>
                    {user.approval ? "Approved" : "Not Approved"}
                  </span>
                </td>
                <td>
                  <img src={user.photo} alt="profile" className="user-photo" />
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Link to="/admin" className="back-btn">← Back to Dashboard</Link>
    </div>
    </>
  );
}

export default Getusers;
