import React from "react";

const UserNavbar = () => {
  const user = {
    name: "Admin",
  };

  return (
    <div className="w-full bg-white shadow-md">
      <div className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side (future breadcrumb / page title) */}
        <div className="flex items-center">{/* Reserved space */}</div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Name (hidden on very small devices) */}
          <span className="hidden sm:block text-sm text-gray-600 font-medium">
            {user.name}
          </span>

          {/* Avatar */}
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full 
          bg-gradient-to-b from-[#0E145E] to-[#B37BD6] 
          text-white flex items-center justify-center 
          text-xs sm:text-sm font-semibold shadow-md"
          >
            {user.name.charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
