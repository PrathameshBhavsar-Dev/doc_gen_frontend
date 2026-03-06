import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../public/AdminNavbar";
import AdminSidebar from "../public/AdminSidebar";

const AdminLayout = () => {

  return (
    <>
      <div className="flex h-screen">

        {/* Sidebar wrapper controls width */}
        <div className="w-64 shrink-0">
          <AdminSidebar />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <AdminNavbar />
          <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
            <Outlet />
          </div>
        </div>

      </div>
    </>
  );
};

export default AdminLayout;