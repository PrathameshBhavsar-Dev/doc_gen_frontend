import { Menu } from "lucide-react";
import { useAuth } from "../../core/contexts/AuthContext"; // ✅ ADD THIS

const UserNavbar = ({ setMobileOpen }) => {
  const { user } = useAuth(); // ✅ GET USER FROM CONTEXT

  return (
    <div className="w-full bg-white shadow-md">
      <div className="h-12 xs:h-14 sm:h-16 flex items-center justify-between px-2 xs:px-3 sm:px-6 md:px-7 lg:px-8">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-1 xs:gap-2 sm:gap-3">
          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-1 xs:p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-3 md:gap-4">
          {/* 🔥 Dynamic Name */}
          <span className="hidden xs:block text-xs sm:text-sm md:text-base text-gray-600 font-medium truncate">
            {user?.name || "User"}
          </span>

          {/* 🔥 Avatar */}
          <div
            className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex-shrink-0
            bg-gradient-to-b from-[#0E145E] to-[#B37BD6] 
            text-white flex items-center justify-center 
            text-[10px] xs:text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
          >
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
