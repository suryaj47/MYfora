import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './styles/register.css'; 

function Register() {
    const [name,setname] = useState("");
    const [phoneno,setphone] = useState("");
    const [email,setemail] = useState("");
    const [photo,setphoto] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8050/api/register", {
                name,
                phoneno,
                email,
                photo
            });
            console.log(response.data);
            alert("Registration successful");
        
            navigate("/login");
            
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className="register-container">
      <div className="logo-wrapper">
        <img src="/images/logo.jpg" alt="MYFora Logo" className="logo-image" />
        <h2 className="app-name">MYFora</h2>
      </div>

      <h1 className="form-title">Register</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={(e) => setname(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" onChange={(e) => setphone(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" onChange={(e) => setemail(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo link:</label>
          <input type="text" id="photo" name="photo" onChange={(e) => setphoto(e.target.value)} required />
        </div>

        <button type="submit" className="register-button">Register</button>
        <p className="form-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
        <Link to="/" className="back-button">Back</Link>
    </div>
  )
}

export default Register 
