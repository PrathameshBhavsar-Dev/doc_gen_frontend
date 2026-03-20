import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../core/contexts/AuthContext";
import ROUTES from "../core/constants/routes.constant";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // ✅ Wait until auth loads
  if (loading) return <div>Loading...</div>;

  // ❌ Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // ❌ Role mismatch
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    }
    if (user.role === "user") {
      return <Navigate to={ROUTES.USER_DASHBOARD} replace />;
    }

    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // ✅ Allowed
  return <Outlet />;
};

export default ProtectedRoute;