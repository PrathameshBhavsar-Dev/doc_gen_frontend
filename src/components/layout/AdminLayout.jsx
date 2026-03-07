import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../public/AdminSidebar";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#0E145E] to-[#B37BD6]">

      {/* Sidebar — hidden on mobile (drawer handles it), visible on desktop */}
      <div className={`hidden lg:block shrink-0 transition-all duration-300 ${collapsed ? "w-[72px]" : "w-[240px]"}`}>
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* On mobile, sidebar still needs to render for the drawer + hamburger button */}
      <div className="lg:hidden">
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Content — full width on mobile, remaining space on desktop */}
      <div className="m-4 flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6 bg-gray-100 rounded-2xl overflow-y-auto">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AdminLayout;