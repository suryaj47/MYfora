import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AdminDashboard from "./admindashboard";
import { Link } from "react-router-dom";


import "./styles/adminlogin.css"; 

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login component rendered");
    console.log("Email:", email);
    console.log("Password:", password);
    axios
      .post("http://localhost:8050/api/loginadmin", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("adminToken", response.data.token); // or just 'true'

         setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };
  useEffect(() => {
    if (loggedIn) {
      axios
        .post(`http://localhost:8050/api/getadminbyemail/${email}`)
        .then((response) => {
          setUserData(response.data);

        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [loggedIn, email]);
if (loggedIn && userData?.name) {
  return <AdminDashboard name={`Admin${userData.name}`} photo={userData.photo} />;
}

  return (
       <div className="admin-wrapper">
      <div className="admin-box">
        <div className="admin-logo">
          <img src="/images/logo.jpg" alt="MYFora Logo" />
          <h2>MYFora</h2>
        </div>

        <h3>Admin Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>  );
}

export default AdminLogin;
