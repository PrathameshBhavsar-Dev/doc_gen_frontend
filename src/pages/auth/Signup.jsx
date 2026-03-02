// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../core/contexts/AuthContext";
// import ROUTES from "../../core/constants/routes.constant";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleAdminLogin = () => {
//     login({
//       token: "dummy-admin-token",
//       user: {
//         role: "admin",
//       },
//     });

//     navigate(ROUTES.ADMIN_DASHBOARD);
//   };

//   const handleUserLogin = () => {
//     login({
//       token: "dummy-user-token",
//       user: {
//         role: "user",
//       },
//     });

//     navigate(ROUTES.USER_DASHBOARD);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: "20px",
//         justifyContent: "center",
//         marginTop: "50px",
//       }}
//     >
//       <button onClick={handleAdminLogin}>Admin</button>
//       <button onClick={handleUserLogin}>User</button>
//     </div>
//   );
// };

// export default Login;


import React from "react";

import SilkBackground from "../../components/silkBackground";
import logo from "../../assets/logos/logo.png";
import google from "../../assets/logos/google.png";
const Login = () => {
  return (
    // <div className="min-h-screen  flex items-center justify-center p-6">
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 bg-gray-50">
      {/* <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* LEFT SIDE */}
        <div className="relative rounded-3xl overflow-hidden min-h-[600px] text-white flex flex-col justify-between p-10 bg-[#07061a]">
          {/* Silk Shader Background */}
          <div className="absolute inset-0">
            <SilkBackground />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3 text-lg font-semibold">
            <div className="w-7 h-7  rounded-md">
              <img src={logo}></img>
            </div>
            Doc Gen
          </div>

          {/* Bottom Text */}
          <div className="relative z-10">
  <p className="text-xs sm:text-sm opacity-80 mb-2 sm:mb-3">
    Professional Document Suite
  </p>

  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug sm:leading-relaxed">
    Create official company documents in minutes with our smart
    document generator.
  </h2>
</div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <p className="text-sm text-gray-600 mb-2">
              Welcome to{" "}
              <span className="text-purple-600 font-medium">Doc Gen</span>
            </p>

            <h1 className="text-3xl font-bold mb-6 mt-7">Sign in</h1>

            <button className="w-full bg-gray-200 hover:bg-gray-300 transition rounded-lg py-2.5 text-sm font-medium mb-6 flex items-center justify-center gap-2 cursor-pointer">
              <span className="text-red-500 text-lg">
                <img src={google}></img>
              </span>
              Sign in with Google
            </button>

            <div className="mb-4">
              <label className="block text-sm text-gray-900 mb-1">
                Enter your email address
              </label>
              <input
                type="email"
                placeholder="Username or email address"
                className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm text-gray-900 mb-1">
                Enter your Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="text-right mb-6 ">
              <button className="text-sm text-purple-600 hover:underline cursor-pointer">
                Forgot Password
              </button>
            </div>

            <button className="w-full bg-gradient-to-r from-indigo-900 to-purple-500 text-white rounded-lg py-2.5 font-medium hover:opacity-90 transition cursor-pointer">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
