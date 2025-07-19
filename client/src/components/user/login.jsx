import React from "react";
import axios from "axios";
import { useState } from "react";
import MessageBoard from "./messageboard";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/login.css';


function Login() {
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
      .post("http://localhost:8050/api/authenticate", {
        email,
        password,
      })
      .then((response) => {
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  useEffect(() => {
    if (loggedIn) {
      axios
        .post(`http://localhost:8050/api/getuserbyemail/${email}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [loggedIn, email]);

  if (loggedIn && userData) {
    return <MessageBoard name={userData.name} photo={userData.photo} />;
  }

  return (
    <>
    <div className="logo-wrapper">
  <img src="/images/logo.jpg" alt="MYFora Logo" className="logo-image" />
  <h2 className="app-name">MYFora</h2>
</div>

      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>

        <Link to="/" className="back-button">
          Back
        </Link>
      </div>
    </>
  );
}

export default Login;
