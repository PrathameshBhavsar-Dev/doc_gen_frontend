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
  { label: "Dashboard", path: ROUTES.USER_DASHBOARD, icon: <LayoutDashboard size={18} /> },
  { label: "History", path: ROUTES.USER_HISTORY, icon: <History size={18} /> },
  { label: "Profile", path: ROUTES.USER_PROFILE, icon: <User size={18} /> },
  { label: "Settings", path: ROUTES.USER_SETTINGS, icon: <Settings size={18} /> },
];

const UserSidebar = ({ collapsed, setCollapsed }) => {
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
      className={`h-screen bg-white shadow-lg flex flex-col p-4 transition-all duration-300
      ${collapsed ? "items-center" : ""}`}
    >
      {/* 🔹 Top Toggle + Logo Section */}
<div
  className={`w-full flex items-center mb-6 ${
    collapsed ? "justify-center" : "justify-between"
  }`}
>
  {/* Logo + Text */}
  <div
    className="flex items-center gap-3 cursor-pointer"
    onClick={() => setCollapsed(!collapsed)}
  >
    {!collapsed && (
      <>
    <img
      src={ContainerIcon}
      alt="Logo"
      className="w-10 h-10 shrink-0"
    />

    
      <div className="leading-tight">
        <h2 className="text-xl font-bold text-[#0E145EC7] whitespace-nowrap">
          Doc Gen
        </h2>
        <p className="text-xs text-[#62748E] whitespace-nowrap">
          Document Generator
        </p>
      </div>
      </>
    )}
  </div>

  {/* Toggle Button */}
  <button
    onClick={() => setCollapsed(!collapsed)}
    className="hidden lg:block p-2 rounded-md hover:bg-gray-100"
  >
    <PanelLeft size={20} />
  </button>
</div>

      
      {/* Generate Button */}
<div className="relative mb-6 w-full">
  <div
    ref={buttonRef}
    onClick={handleToggle}
    className={`block rounded-xl cursor-pointer transition-all duration-300
      ${collapsed ? "mx-auto w-12 h-12 flex items-center justify-center" : ""}
    `}
    style={{
      background: "linear-gradient(to left, #0E145E, #B37BD6)",
      padding: collapsed ? "0" : "2px",
      borderRadius: "14px",
    }}
  >
    <span
      className={`flex items-center gap-2 w-full h-full
        ${collapsed ? "justify-center" : "px-4 py-3 justify-center"}
      `}
      style={{
        borderRadius: "12px",
        backgroundColor: "#fafaf7",
      }}
    >
      <Plus
        size={18}
        className={`text-[#3b2f8f] transition-transform duration-300 ${
          showDropdown ? "rotate-45" : ""
        }`}
      />

      {/* 👇 Only hide text when collapsed */}
      {!collapsed && (
        <span className="font-bold text-[#3b2f8f] text-base tracking-wide">
          Generate Document
        </span>
      )}
    </span>
  </div>

  {isVisible && (
  <div
    ref={dropdownRef}
    className={`absolute z-50 ${
      collapsed
        ? "top-5 left-16 w-20"
        : "top-13 left-0 w-full"
    }`}
  >
    <GenerateDocDropDown
      onClose={handleToggle}
      compact={collapsed}   // 👈 THIS controls everything 
    />
  </div>
)}
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
              ${
                isActive
                  ? "bg-gradient-to-r from-[#0E145E] to-[#B37BD6] text-white"
                  : "text-gray-600 hover:bg-purple-50"
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

export default UserSidebar;