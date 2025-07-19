import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import AdminMessageBoard from "./adminmessageboard";
import "./styles/admindashboard.css";

import { MdPersonAdd, MdPeople, MdVerifiedUser, MdAdminPanelSettings, MdLogout } from 'react-icons/md';

function AdminDashboard({ name , photo }) {
    const navigate = useNavigate();
    const handlelogout = () => {
  
  localStorage.removeItem("adminToken");
  navigate("/");
};
  return (
   <div className="admin-dashboard-container">

      {/* Header */}
      <div className="admin-topbar">
        <h1>Admin Dashboard</h1>
        <button className="logout-button" onClick={handlelogout}>
          <MdLogout size={20} style={{ marginRight: '6px' }} />
          Logout
        </button>
      </div>

      <p className="admin-welcome">Welcome back, <strong>{name}</strong></p>

      {/* Dashboard Cards */}
      <div className="admin-grid">
        <Link to="/admin/register" className="admin-card">
          <MdPersonAdd size={36} />
          <p>Register Admin</p>
        </Link>
        <Link to="/admin/getuser" className="admin-card">
          <MdPeople size={36} />
          <p>View Users</p>
        </Link>
        <Link to="/admin/approveuser" className="admin-card">
          <MdVerifiedUser size={36} />
          <p>Approve Users</p>
        </Link>
        <Link to="/admin/getadmin" className="admin-card">
          <MdAdminPanelSettings size={36} />
          <p>View Admins</p>
        </Link>
      </div>

      {/* Message Board */}
      <div className="admin-messageboard">
        <h2>Admin Message Board</h2>
        <AdminMessageBoard name={name} photo={photo} />
      </div>
    </div>
  )
}

export default AdminDashboard
