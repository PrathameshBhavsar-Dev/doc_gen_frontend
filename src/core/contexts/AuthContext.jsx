import React, { createContext, useContext, useState, useEffect } from "react";
import { springApi } from "../services/springApi";
import ServerUrlV2 from "../constants/ServerUrlV2"; // same path your other files use

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing stored user:", error);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ================= LOGIN =================
  const login = async (credentials) => {
    try {
      const response = await springApi.apipost(ServerUrlV2.LOGIN, credentials);

      if (response.success) {
        const { user, accessToken } = response.data; // nested under data now

        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        return { success: true, user };
      }

      return { success: false, error: response.message };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Invalid email or password",
      };
    }
  };

  // ================= LOGOUT =================
  const logout = async () => {
    try {
      await springApi.apipost(ServerUrlV2.LOGOUT); // clears the refresh cookie
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  // ================= UPDATE PROFILE (logged-in user only) =================
  const updateProfile = async (updateData) => {
    try {
      if (!user) throw new Error("No user logged in");

      const response = await springApi.apiput(ServerUrlV2.PROFILE, updateData);

      if (response.success && response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        return { success: true, data: response.data };
      }

      return { success: false, error: response.message };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Update failed",
      };
    }
  };

  const value = {
    user,
    isLoading,
    isLoggedIn: !!user,
    isAdmin: user?.role === "admin",
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthContext;