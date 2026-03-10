import React from "react";
import { Routes, Route } from "react-router-dom";

import UserDashboard from "../../components/admin/userManagement/UserDashboard";
import UserDetails from "../../components/admin/userManagement/UserDetails";

const AdminUserManagementPage = () => {
  return (
    <Routes>
      <Route index element={<UserDashboard />} />
      <Route path="user-details/:id" element={<UserDetails />} />
    </Routes>
  );
};

export default AdminUserManagementPage;
