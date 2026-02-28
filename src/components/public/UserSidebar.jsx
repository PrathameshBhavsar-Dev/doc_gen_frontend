import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ROUTES from "../../core/constants/routes.constant";
import { LayoutDashboard, History, User, Settings, LogOut, Plus } from "lucide-react";
import ContainerIcon from "../../assets/logos/Container.png";
import GenerateDocDropDown from "../common/GenerateDocDropDown";

const menuItems = [
  { label: "Dashboard", path: ROUTES.USER_DASHBOARD, icon: <LayoutDashboard size={18} /> },
  { label: "History", path: ROUTES.USER_HISTORY, icon: <History size={18} /> },
  { label: "Profile", path: ROUTES.USER_PROFILE, icon: <User size={18} /> },
  { label: "Settings", path: ROUTES.USER_SETTINGS, icon: <Settings size={18} /> },
];

const UserSidebar = () => {
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

  // Close dropdown when clicking outside
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
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col p-4 relative">

      {/* Logo */}
      <div className="mb-6 flex items-center gap-3">
        <img src={ContainerIcon} alt="Doc Gen Logo" className="w-20 h-20" />
        <div>
          <h2 className="text-xl font-bold text-[#0E145EC7]">Doc Gen</h2>
          <p className="text-xs text-[#62748E]">Document Generator</p>
        </div>
      </div>

      {/* Generate Button */}
      <div className="relative mb-6">
        <div
          ref={buttonRef}
          onClick={handleToggle}
          className="block rounded-xl transition-all cursor-pointer"
          style={{
            background: "linear-gradient(to left, #0E145E, #B37BD6)",
            padding: "2px",
            borderRadius: "14px",
          }}
        >
          <span
            className="flex items-center justify-center gap-2 w-full h-full px-4 py-3 hover:bg-purple-50 transition-all"
            style={{ borderRadius: "12px", backgroundColor: "#fafaf7" }}
          >
            <Plus
              size={18}
              className={`text-[#3b2f8f] transition-transform duration-300 ${showDropdown ? "rotate-45" : "rotate-0"}`}
            />
            <span className="font-bold text-[#3b2f8f] text-base tracking-wide">
              Generate Document
            </span>
          </span>
        </div>

        {/* Dropdown with slide down/up animation */}
        {isVisible && (
          <div
            ref={dropdownRef}
            className="absolute top-15 z-50 overflow-hidden"
            style={{
              animation: showDropdown
                ? "slideDown 0.25s ease-out forwards"
                : "slideUp 0.25s ease-in forwards",
            }}
          >
            <GenerateDocDropDown onClose={handleToggle} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-semibold active:scale-95 active:brightness-90 ${
                isActive
                  ? "bg-gradient-to-r from-[#0E145E] to-[#B37BD6] text-white shadow-lg scale-100"
                  : "text-gray-600 hover:bg-purple-50 hover:scale-[1.02]"
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
        <button className="flex px-4 py-3 w-54 rounded-xl items-center bg-red-100 gap-2 text-red-500 hover:text-red-600">
          <LogOut size={16} />
          Logout
        </button>
      </div>

      <div>
        <p className="flex justify-center py-4 text-xs text-[#62748E]">© 2026 Doc Gen</p>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); max-height: 0; }
          to   { opacity: 1; transform: translateY(0);     max-height: 600px; }
        }
        @keyframes slideUp {
          from { opacity: 1; transform: translateY(0);     max-height: 600px; }
          to   { opacity: 0; transform: translateY(-10px); max-height: 0; }
        }
      `}</style>
    </div>
  );
};

export default UserSidebar;