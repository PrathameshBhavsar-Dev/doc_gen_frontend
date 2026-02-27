import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../public/AdminNavbar";
import AdminSidebar from "../public/AdminSidebar";

const AdminLayout = () => {

  return (
    <div>
        <AdminNavbar />
        <AdminSidebar />
        {/* ---------- CONTENT ---------- */}
        <div
          className={`
            w-full transition-all duration-300
            px-5 pt-16 pb-5
          `}
        >
          <Outlet />
        </div>
    </div>
  );
};

export default AdminLayout;