import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/user/login";
import AdminLogin from "./components/admin/adminlogin";
import Register from "./components/user/register";
import AdminRegister from "./components/admin/adminregister";
import Getusers from "./components/admin/getusers";
import NotApprovedUsers from "./components/admin/notapproval";
import AdminDashboard from "./components/admin/admindashboard";
import GetAdmin from "./components/admin/getadmin";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import Home from "./components/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/register"
          element={
            <AdminProtectedRoute>
              <AdminRegister />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/getuser"
          element={
            <AdminProtectedRoute>
              <Getusers />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/approveuser"
          element={
            <AdminProtectedRoute>
              <NotApprovedUsers />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/getadmin"
          element={
            <AdminProtectedRoute>
              <GetAdmin />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
