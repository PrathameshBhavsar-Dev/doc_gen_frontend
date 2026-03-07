// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import UserNavbar from "../public/UserNavbar";
// import UserSidebar from "../public/UserSidebar";

// const UserLayout = () => {

//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div className="flex h-screen">

//       {/* Sidebar wrapper controls width */}
//       <div
//         className={`transition-[width] duration-300 shrink-0
//         ${collapsed ? "w-20" : "w-64"}`}
//       >
//         <UserSidebar
//           collapsed={collapsed}
//           setCollapsed={setCollapsed}
//         />
//       </div>

//       {/* Content */}
//       <div className="flex-1 flex flex-col">

//         <UserNavbar />

//         <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
//           <Outlet />
//         </div>

//       </div>

//     </div>
//   );
// };

// export default UserLayout;


import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../public/UserNavbar";
import UserSidebar from "../public/UserSidebar";

const UserLayout = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen">

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:relative z-50
        transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        ${collapsed ? "w-20" : "w-64"}
        `}
      >
        <UserSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <UserNavbar setMobileOpen={setMobileOpen} />

        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default UserLayout;