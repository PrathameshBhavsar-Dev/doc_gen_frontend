import React from "react";
import { NavLink } from "react-router-dom";
import ROUTES from "../../core/constants/routes.constant";
import { LayoutDashboard, History, User, Settings, LogOut, Plus } from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    path: ROUTES.USER_DASHBOARD,
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "History",
    path: ROUTES.USER_HISTORY,
    icon: <History size={18} />,
  },
  {
    label: "Profile",
    path: ROUTES.USER_PROFILE,
    icon: <User size={18} />,
  },
  {
    label: "Settings",
    path: ROUTES.USER_SETTINGS,
    icon: <Settings size={18} />,
  },
];

const UserSidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col p-4">

      {/* Logo */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-purple-600">Doc Gen</h2>
        <p className="text-xs text-gray-400">Document Generator</p>
      </div>

      {/* Generate Button */}
      <NavLink
        to={ROUTES.USER_FORM}
        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-purple-700 transition"
      >
        <Plus size={16} />
        Generate Document
      </NavLink>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-purple-100"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout Bottom */}
      <div className="mt-auto">
        <button className="flex items-center gap-2 text-red-500 hover:text-red-600">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;