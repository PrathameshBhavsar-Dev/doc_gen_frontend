import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/contexts/AuthContext";
import ROUTES from "../../core/constants/routes.constant";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAdminLogin = () => {
    login({
      token: "dummy-admin-token",
      user: {
        role: "admin",
      },
    });

    navigate(ROUTES.ADMIN_DASHBOARD);
  };

  const handleUserLogin = () => {
    login({
      token: "dummy-user-token",
      user: {
        role: "user",
      },
    });

    navigate(ROUTES.USER_DASHBOARD);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <button onClick={handleAdminLogin}>Admin</button>
      <button onClick={handleUserLogin}>User</button>
    </div>
  );
};

export default Login;