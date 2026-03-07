import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../public/AdminSidebar";

const AdminLayout = () => {

  return (
    <>
      <div className="flex h-screen bg-gradient-to-r from-[#0E145E] to-[#B37BD6]">

        {/* Sidebar wrapper controls width */}
        <div className="w-64 shrink-0">
          <AdminSidebar />
        </div>

        {/* Content */}
        <div className="m-4 flex-1 flex flex-col">
          <div className="flex-1 p-6 bg-gray-100 rounded-2xl overflow-y-auto">
            <Outlet />
          </div>
        </div>

      </div>
    </>
  );
};

export default AdminLayout;