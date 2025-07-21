import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/approve.css';

function NotApprovedUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users not approved
  useEffect(() => {
    axios.get('https://myfora.onrender.com/api/getnotapproval')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching not approved users:", error);
        setLoading(false);
      });
  }, []);


const handleAccept = (userId) => {
  // Generate random password (8 characters)
  const randomPassword = Math.random().toString(36).slice(-8);


  axios.put(`https://myfora.onrender.com/api/update/${userId}`, {
    password: randomPassword
  })
    .then(response => {
      alert(`User approved. Password set`);
      window.location.reload(); // Reload the page to reflect changes
    })
    .catch(error => {
      console.error("Error approving user:", error);
      alert("Failed to approve user");
    });
};




 const handleReject = (userId) => {
  axios.delete(`https://myfora.onrender.com/api/delete/${userId}`)
    .then(response => {
      alert("User deleted");
      // Optionally remove the user from the current list
      setUsers(prev => prev.filter(user => user._id !== userId));
    })
    .catch(error => {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    });
};



  if (loading) {
    return <p>Loading not approved users...</p>;
  }

  return (
     <div className="unapproved-users-container">

      {/* Logo */}
      <div className="logo-wrapper">
        <img src="/images/logo.jpg" alt="MYFora Logo" className="logo-image" />
        <h1 className="app-name">MYFora</h1>
      </div>

      <h2>Not Approved Users</h2>

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map((user, index) => (
              <tr key={user._id || index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneno}</td>
                <td><img src={user.photo} alt="profile" className="user-photo" /></td>
                <td>
                  <button className="accept-btn" onClick={() => handleAccept(user._id)}>Accept</button>
                  <button className="reject-btn" onClick={() => handleReject(user._id)}>Reject</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6">No unapproved users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Link to="/admin" className="back-btn">← Back to Dashboard</Link>
    </div>
  );
}

export default NotApprovedUsers;
