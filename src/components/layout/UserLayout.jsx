


import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../public/UserNavbar";
import UserSidebar from "../public/UserSidebar";

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen">

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      {/* Desktop Sidebar */}
<div
  className={`hidden lg:block transition-all duration-300
  ${collapsed ? "w-20" : "w-64"}
  bg-white`}
>
  <UserSidebar
    collapsed={collapsed}
    setCollapsed={setCollapsed}
  />
</div>

{/* Mobile Sidebar */}
<div
  className={`fixed lg:hidden z-50 h-full transition-all duration-300
  ${mobileOpen ? "left-0" : "-left-64"}
  w-64 bg-white`}
>
  <UserSidebar
    collapsed={false}
    setCollapsed={setCollapsed}
  />
</div>

      {/* Content */}
      <div className="flex-1 flex flex-col w-full">
        <UserNavbar setMobileOpen={setMobileOpen} />

        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default UserLayout;