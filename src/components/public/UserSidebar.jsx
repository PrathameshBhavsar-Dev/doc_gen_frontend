import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
import { useAuth } from "../../core/contexts/AuthContext";

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
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleToggle = () => {
    if (showDropdown) {
      setShowDropdown(false);
      setTimeout(() => setIsVisible(false), 250);
    } else {
      setIsVisible(true);
      setTimeout(() => setShowDropdown(true), 10);
    }
  };

  const handleLogout = async () => {
    await logout();

    // redirect after logout
    navigate("/login", { replace: true });
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
      className={`
        h-screen bg-white border-r border-gray-100 shadow-sm
        flex flex-col p-4
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-20 items-center" : "w-64"}
      `}
    >
      {/* ── LOGO + TOGGLE ── */}
      <div
        className={`w-full flex items-center mb-8 ${collapsed ? "justify-center" : "justify-between"
          }`}
      >
        {/* Logo — hidden when collapsed */}
        {!collapsed && (
          <div className="flex items-center gap-3 cursor-pointer overflow-hidden">
            <img
              src={ContainerIcon}
              alt="Logo"
              className="w-9 h-9 shrink-0"
            />
            <div className="leading-tight">
              <h2 className="text-lg font-bold text-[#0E145E] whitespace-nowrap">
                Doc Gen
              </h2>
              <p className="text-[11px] text-[#62748E] whitespace-nowrap">
                Document Generator
              </p>
            </div>
          </div>
        )}

        {/* Toggle button — always visible */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100
               text-gray-400 hover:text-gray-700 transition-all duration-200"
        >
          <PanelLeft size={18} className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* ── GENERATE BUTTON ── */}
      <div className="relative mb-6 w-full">
        <div
          ref={buttonRef}
          onClick={handleToggle}
          className="cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(to left, #0E145E, #B37BD6)",
            padding: "2px",
            borderRadius: "14px",
          }}
        >
          <span
            className={`flex items-center gap-2 w-full h-full
              ${collapsed ? "justify-center px-0 py-3" : "px-4 py-3 justify-center"}
            `}
            style={{
              borderRadius: "12px",
              backgroundColor: "#fafaf7",
            }}
          >
            <Plus
              size={18}
              className={`text-[#3b2f8f] transition-transform duration-300
                ${showDropdown ? "rotate-45" : "rotate-0"}
              `}
            />

            <span
              className={`font-bold text-[#3b2f8f] text-sm tracking-wide
                transition-all duration-300 overflow-hidden whitespace-nowrap
                ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
              `}
            >
              Generate Document
            </span>
          </span>
        </div>

        {/* Dropdown */}
        {isVisible && (
          <div
            ref={dropdownRef}
            className={`
              absolute z-50
              transition-all duration-250 ease-out
              ${showDropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
              ${collapsed ? "top-5 left-16 w-20" : "top-14 left-0 w-full"}
            `}
          >
            <GenerateDocDropDown
              onClose={handleToggle}
              compact={collapsed}
            />
          </div>
        )}
      </div>

      {/* ── NAV LINKS ── */}
      <nav className="flex flex-col gap-2 w-full">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 rounded-xl
               transition-all duration-200 font-medium text-sm
               ${collapsed ? "justify-center py-2 px-4" : "px-4"}
               ${isActive
                ? "bg-gradient-to-r from-[#0E145E] to-[#B37BD6] text-white shadow-md shadow-[#B37BD6]"
                : "text-gray-500 hover:bg-purple-50 hover:text-[#0E145E]"
              }`
            }
          >
            <span className="shrink-0">{item.icon}</span>

            <span
              className={`transition-all duration-300 overflow-hidden whitespace-nowrap
                ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
              `}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* ── LOGOUT ── */}
      <div className="mt-auto w-full">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 py-2.5 rounded-xl w-full
    text-red-400 hover:bg-red-50 hover:text-red-500
    transition-all duration-200 font-medium text-sm
    ${collapsed ? "justify-center px-0" : "px-4"}
  `}
        >
          <LogOut size={16} className="shrink-0" />
          <span
            className={`transition-all duration-300 overflow-hidden whitespace-nowrap
      ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
    `}
          >
            Logout
          </span>
        </button>

        <p
          className={`text-center text-[10px] text-black mt-4
            transition-all duration-300 overflow-hidden
            ${collapsed ? "opacity-0 h-0" : "opacity-100 h-auto"}
          `}
        >
          © 2026 Doc Gen
        </p>
      </div>
    </div>
  );
};

export default UserSidebar;