// components/AdminProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("adminToken"); // or a login state/context

  return isAdminLoggedIn ? children : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
