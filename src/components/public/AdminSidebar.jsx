import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ROUTES from "../../core/constants/routes.constant";
import ContainerIcon from "../../assets/logos/Container.png";
import { useAuth } from "../../core/contexts/AuthContext";
import {
  LayoutDashboard,
  History,
  Settings,
  LogOut,
  PanelLeft,
  Menu,
  X,
  Users,
  Building2,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", path: ROUTES.ADMIN_DASHBOARD, icon: <LayoutDashboard size={18} /> },
  { label: "User management", path: ROUTES.ADMIN_USER_MANAGEMENT, icon: <Users size={18} /> },
  { label: "Company management", path: ROUTES.ADMIN_COMPANY_MANAGEMENT, icon: <Building2 size={18} /> },
  { label: "History", path: ROUTES.ADMIN_HISTORY, icon: <History size={18} /> },
  { label: "Settings", path: ROUTES.ADMIN_SETTINGS, icon: <Settings size={18} /> },
];

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();          // ✅ FIXED
  const { logout } = useAuth();            // ✅ FIXED

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLabels, setShowLabels] = useState(!collapsed);

  // ✅ Logout handler
  const handleLogout = () => {
    logout();                              // clear state + localStorage
    navigate("/login", { replace: true }); // redirect
  };

  useEffect(() => {
    if (collapsed) {
      setShowLabels(false);
    } else {
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

  const sidebarInner = (
    <div className="h-full flex flex-col p-4 overflow-hidden">

      {/* Top */}
      <div className={`flex items-center mb-6 ${collapsed ? "justify-center" : "justify-between"}`}>
        <div className={`flex items-center gap-3 ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
          <img src={ContainerIcon} alt="Logo" className="w-10 h-10" />
          <div>
            <h2 className="text-xl font-bold text-[#FFFEF8]">Doc Gen</h2>
            <p className="text-xs text-[#FFFEF8]">Document Generator</p>
          </div>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white p-2 hover:bg-white/10"
        >
          <PanelLeft
            size={20}
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center py-3 rounded-xl font-semibold
              ${collapsed ? "justify-center px-6" : "px-4 gap-3"}
              ${isActive ? "bg-[#FFFEF8] text-black" : "text-white hover:bg-white/15"}`
            }
          >
            {item.icon}
            <span className={`${showLabels ? "opacity-100" : "opacity-0 w-0"}`}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className={`flex items-center py-3 rounded-xl bg-red-100 text-red-500 w-full hover:bg-red-200
          ${collapsed ? "justify-center px-6" : "px-4 gap-3"}`}
        >
          <LogOut size={16} />
          <span className={`${showLabels ? "opacity-100" : "opacity-0 w-0"}`}>
            Logout
          </span>
        </button>
      </div>

      <p className="text-center text-xs mt-4 text-[#62748E]">
        © 2026 Doc Gen
      </p>
    </div>
  );

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 text-white"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 ${mobileOpen ? "block" : "hidden"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-screen w-[240px] bg-black
        transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"} transition`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          <X size={20} />
        </button>
        {sidebarInner}
      </div>

      {/* Desktop */}
      <div className="hidden lg:block h-screen">
        {sidebarInner}
      </div>
    </>
  );
};

export default AdminSidebar;