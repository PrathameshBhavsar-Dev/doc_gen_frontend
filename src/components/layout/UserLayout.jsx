// // import React, { useState, useEffect } from "react";
// // import { Outlet } from "react-router-dom";
// // import UserNavbar from "../public/UserNavbar";
// // import UserSidebar from "../public/UserSidebar";

// // const UserLayout = () => {
// //   const [collapsed, setCollapsed] = useState(false);
// //   const [isMobile, setIsMobile] = useState(false);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       if (window.innerWidth >= 1024) {
// //         setCollapsed(false);   // Desktop → open
// //         setIsMobile(false);
// //       } else {
// //         setCollapsed(true);    // Mobile/Tablet → closed
// //         setIsMobile(true);
// //       }
// //     };

// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   return (
// //     <div className="flex h-screen overflow-hidden">

// //       {/* Mobile Overlay */}
// //       {isMobile && !collapsed && (
// //         <div
// //           className="fixed inset-0 bg-black/40 z-40"
// //           onClick={() => setCollapsed(true)}
// //         />
// //       )}

// //       {/* Sidebar */}
// //       <div
// //         className={`
// //           ${isMobile ? "fixed z-50" : "relative"}
// //           h-screen transition-all duration-300
// //           ${collapsed ? "w-0 lg:w-20" : "w-64"}
// //         `}
// //       >
// //         <UserSidebar
// //           collapsed={collapsed}
// //           setCollapsed={setCollapsed}
// //           isMobile={isMobile}
// //         />
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 flex flex-col">
// //         <UserNavbar />
// //         <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
// //           <Outlet />
// //         </div>
// //       </div>

// //     </div>
// //   );
// // };

// // export default UserLayout;


// import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import UserNavbar from "../public/UserNavbar";
// import UserSidebar from "../public/UserSidebar";

// const UserLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setCollapsed(false); // Desktop open
//       } else {
//         setCollapsed(true); // Tablet & Mobile collapsed (icons visible)
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="flex h-screen">

//       {/* Sidebar */}
//       <div
//         className={`transition-all duration-300 shrink-0
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

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../public/UserNavbar";
import UserSidebar from "../public/UserSidebar";

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCollapsed(false); // Desktop open
      } else {
        setCollapsed(true); // Mobile collapsed
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div
        className={`transition-all duration-300 shrink-0
        ${collapsed ? "w-20" : "w-64"}`}
      >
        <UserSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <UserNavbar />
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default UserLayout;