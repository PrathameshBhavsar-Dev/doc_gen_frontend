import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ROUTES from "../../core/constants/routes.constant";
import ContainerIcon from "../../assets/logos/Container.png";
import {
  LayoutDashboard,
  History,
  Settings,
  LogOut,
  PanelLeft,
  Menu,
  X,
  Users,        // ← add this
  Building2,    // ← add this
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", path: ROUTES.ADMIN_DASHBOARD, icon: <LayoutDashboard size={18} /> },
  { label: "User management", path: ROUTES.ADMIN_USER_MANAGEMENT, icon: <Users size={18} /> },
  { label: "Company management", path: ROUTES.ADMIN_COMPANY_MANAGEMENT, icon: <Building2 size={18} /> },
  { label: "History", path: ROUTES.ADMIN_HISTORY, icon: <History size={18} /> },
  { label: "Settings", path: ROUTES.ADMIN_SETTINGS, icon: <Settings size={18} /> },
];

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Delay hiding text so it fades out before width shrinks
  const [showLabels, setShowLabels] = useState(!collapsed);

  useEffect(() => {
    if (collapsed) {
      // Hide labels immediately when collapsing
      setShowLabels(false);
    } else {
      // Show labels only after width has expanded
      const timer = setTimeout(() => setShowLabels(true), 150);
      return () => clearTimeout(timer);
    }
  }, [collapsed]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
            onClick={() => setMobileOpen(false)}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 rounded-xl transition-all font-semibold
              ${collapsed ? "justify-center px-0" : "px-4"}
              ${isActive
                ? "bg-[#FFFEF8] text-black"
                : "text-white hover:bg-[#B37BD6]"
              }`
            }
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300
                ${showLabels ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0"}`}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto w-full">
        <button
          className={`flex items-center py-3 rounded-xl bg-red-100 text-red-500 w-full
            transition-all duration-200 hover:bg-red-200
            ${collapsed ? "justify-center px-6" : "px-4 gap-3"}`}
        >
          <LogOut size={16} className="flex-shrink-0" />
          <span
            className={`whitespace-nowrap overflow-hidden transition-all duration-300
              ${showLabels ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0"}`}
          >
            Logout
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${showLabels ? "max-h-10 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="flex justify-center py-4 text-xs text-[#62748E] whitespace-nowrap">
          © 2026 Doc Gen
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-white shadow-md"
      >
        <Menu size={20} />
      </button>

      {/* Mobile backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 z-50 h-screen w-[240px] shadow-xl
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-white p-1 rounded hover:bg-white/10 z-10"
        >
          <X size={20} />
        </button>
        {sidebarInner}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block h-screen flex-shrink-0">
        {sidebarInner}
      </div>
    </>
  );
};

export default AdminSidebar;