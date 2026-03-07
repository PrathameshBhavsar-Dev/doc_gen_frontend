import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ROUTES from "../../core/constants/routes.constant";
import {
  LayoutDashboard,
  History,
  User,
  Settings,
  LogOut,
  Plus,
  PanelLeft,
} from "lucide-react";
import ContainerIcon from "../../assets/logos/Container.png";
import GenerateDocDropDown from "../common/GenerateDocDropDown";

const menuItems = [
  { label: "Dashboard", path: ROUTES.ADMIN_DASHBOARD, icon: <LayoutDashboard size={18} /> },
  { label: "User management", path: ROUTES.ADMIN_USER_MANAGEMENT, icon: <History size={18} /> },
  { label: "Company management", path: ROUTES.ADMIN_COMPANY_MANAGEMENT, icon: <History size={18} /> },
  { label: "History", path: ROUTES.ADMIN_HISTORY, icon: <History size={18} /> },
  { label: "Settings", path: ROUTES.ADMIN_SETTINGS, icon: <Settings size={18} /> },
];

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleToggle = () => {
    if (showDropdown) {
      setShowDropdown(false);
      setTimeout(() => setIsVisible(false), 250);
    } else {
      setIsVisible(true);
      setTimeout(() => setShowDropdown(true), 10);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
        setTimeout(() => setIsVisible(false), 250);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`h-screen flex flex-col p-4 transition-all duration-300
      ${collapsed ? "items-center" : ""}`}
    >
      {/* 🔹 Top Toggle + Logo Section */}
      <div
        className={`w-full flex items-center mb-6 ${collapsed ? "justify-center" : "justify-between"
          }`}
      >
        {/* Logo + Text */}
        {!collapsed && (
          <div className="flex items-center gap-3">
            <img
              src={ContainerIcon}
              alt="Logo"
              className="w-10 h-10"
            />
            <div>
              <h2 className="text-xl font-bold text-[#0E145EC7]">
                Doc Gen
              </h2>
              <p className="text-xs text-[#62748E]">
                Document Generator
              </p>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block p-2 rounded-md hover:bg-gray-100"
        >
          <PanelLeft size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 w-full">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 rounded-xl transition-all font-semibold
              ${collapsed ? "justify-center px-0" : "px-4"}
              ${isActive
                ? "bg-[#FFFEF8] text-black"
                : "text-white hover:bg-[#B37BD6]"
              }`
            }
          >
            {item.icon}
            {!collapsed && item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto w-full">
        <button
          className={`flex items-center gap-3 py-3 rounded-xl bg-red-100 text-red-500 w-full
          ${collapsed ? "justify-center px-0" : "px-4"}`}
        >
          <LogOut size={16} />
          {!collapsed && "Logout"}
        </button>
      </div>

      {!collapsed && (
        <p className="flex justify-center py-4 text-xs text-[#62748E]">
          © 2026 Doc Gen
        </p>
      )}
    </div>
  );
};

export default AdminSidebar;