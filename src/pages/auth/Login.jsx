import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/contexts/AuthContext";
import SilkBackground from "../../components/common/silkBackground";
import logo from "../../assets/logos/logo.png";
import google from "../../assets/logos/google.png";
import ROUTES from "../../core/constants/routes.constant";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const result = await login({ email, password });

      console.log("Login result:", result);

      if (result.success) {
        const role = result.user.role;

        console.log("Navigating to:", role);

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } else {
        setError(result.error || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 bg-gray-50">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

        {/* LEFT SIDE */}
        <div className="relative rounded-3xl overflow-hidden min-h-150 text-white flex flex-col justify-between p-10 bg-[#07061a]">
          <div className="absolute inset-0">
            <SilkBackground />
          </div>
          <div className="absolute inset-0 bg-black/30" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3 text-lg font-semibold">
            <div className="w-7 h-7 rounded-md">
              <img src={logo} alt="Doc Gen Logo" />
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

            {/* Google Button */}
            <button className="w-full bg-gray-200 hover:bg-gray-300 transition rounded-lg py-2.5 text-sm font-medium mb-6 flex items-center justify-center gap-2 cursor-pointer">
              <img src={google} alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <hr className="flex-1 border-gray-300" />
              <span className="text-xs text-gray-400">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm text-gray-900 mb-1">
                Enter your email address
              </label>
              <input
                type="email"
                placeholder="Username or email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="block text-sm text-gray-900 mb-1">
                Enter your Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-6">
              <button className="text-sm text-purple-600 hover:underline cursor-pointer">
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-900 to-purple-500 text-white rounded-lg py-2.5 font-medium hover:opacity-90 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;