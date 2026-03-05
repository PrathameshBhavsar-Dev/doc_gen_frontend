import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../public/UserNavbar";
import UserSidebar from "../public/UserSidebar";

const UserLayout = () => {
  return (
    <>
      <div className="flex h-screen">

        {/* Sidebar wrapper controls width */}
        <div className="w-64 shrink-0">
          <UserSidebar />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <UserNavbar />
          <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
            <Outlet />
          </div>
        </div>

      </div>
    </>
  );
};

export default UserLayout;