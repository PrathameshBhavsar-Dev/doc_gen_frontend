import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../public/UserNavbar";
import UserSidebar from "../public/UserSidebar";

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative z-50
          h-screen
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${collapsed ? "w-20" : "w-64"}
          flex-shrink-0
        `}
      >
        <UserSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main Content */}
      <div
        className="
          flex flex-1 flex-col
          min-w-0
          overflow-hidden
        "
      >
        <UserNavbar setMobileOpen={setMobileOpen} />

        <main
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden
            p-3 sm:p-6 md:p-10
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
