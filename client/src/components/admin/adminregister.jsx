import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './styles/register.css';

function AdminRegister() {
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://myfora.onrender.com/api/addadmin", {
                name,
                email,
                password
            });
            console.log(response.data);
            alert("Registration successful");
        
            navigate("/login");
            
        } catch (error) {
            console.error(error);
        }
    }

  return (
   <div className="register-admin-container">
         
        {/* Logo + App Name */}
      

      <div className="register-card">
          <div className="logo-wrapper">
          <img src="/images/logo.jpg" alt="MYFora Logo" className="logo-image" />
          <h2 className="app-name">MYFora</h2>
        </div>
        <h2>Register New Admin</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn">Register</button>
            <Link to="/admin" className="back-btn">Back to Dashboard</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminRegister;
