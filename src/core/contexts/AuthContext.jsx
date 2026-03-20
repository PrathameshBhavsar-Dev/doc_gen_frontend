import React, { createContext, useContext, useState, useEffect } from "react";
import ApiService from "../services/api.service";

const AuthContext = createContext(null);
const apiService = new ApiService();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ renamed

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

  // ================= REGISTER =================
  const register = async (userData) => {
    try {
      const response = await apiService.apipost("/users/register", userData);

      if (response.success) {
        return { success: true, data: response.data };
      }

      return { success: false, error: response.message };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Registration failed",
      };
    }
  };

  // ================= LOGIN =================
  const login = async (credentials) => {
    try {
      const response = await apiService.apipost("/users/login", credentials);

      if (response.success && response.data) {
        const userData = response.data;

        // ✅ persist user
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        return { success: true, user: userData };
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
  const logout = () => {
    // ❌ DO NOT depend on backend for logout (you are not using JWT)
    // Just clear state

    localStorage.removeItem("user");
    setUser(null);

    return { success: true };
  };

  // ================= UPDATE PROFILE =================
  const updateProfile = async (updateData) => {
    try {
      if (!user) throw new Error("No user logged in");

      const response = await apiService.apiput(
        `/users/profile/${user._id}`,
        updateData
      );

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

  // ================= CONTEXT VALUE =================
  const value = {
    user,
    isLoading,                 // ✅ matches ProtectedRoute
    isLoggedIn: !!user,        // ✅ matches ProtectedRoute
    isAdmin: user?.role === "admin",

    register,
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

// ================= CUSTOM HOOK =================
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default AuthContext;