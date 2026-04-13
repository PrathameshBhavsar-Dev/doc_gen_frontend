import React, { useState } from "react";
import {
  ArrowLeft,
  Database,
  Shield,
  Trash2,
  Download,
  Lock,
  Globe,
} from "lucide-react";

const UserSettingPage = () => {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const users = ["Aditi Khade", "Abhijeet Talegaonkar"
, "Sagar Solanke", "Aditya Telgote"];

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-16 py-6">
      {/* Header */}
      <div className="flex items-start sm:items-center gap-3 mb-8">
        <ArrowLeft className="w-5 h-5 text-gray-700 cursor-pointer mt-1 sm:mt-0" />
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Responsive Container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ================= Data & Privacy ================= */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Database className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800 text-base sm:text-lg">
                  Data & Privacy
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Manage your data
                </p>
              </div>
            </div>

            {/* Export Data */}
            <div className="flex items-center justify-between bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <div className="flex items-center gap-3">
                <Download className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Export Data
                  </p>
                  <p className="text-xs text-gray-400">
                    Download all your data
                  </p>
                </div>
              </div>
              <span className="text-gray-400 text-lg">›</span>
            </div>

            {/* Remove Account */}
            <div
              onClick={() => setOpenRemoveModal(true)}
              className="flex items-center justify-between bg-red-50 p-3 sm:p-4 rounded-xl hover:bg-red-100 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Trash2 className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-600">
                    Remove Account
                  </p>
                  <p className="text-xs text-red-400">Remove users</p>
                </div>
              </div>
              <span className="text-red-400 text-lg">›</span>
            </div>
          </div>

          {/* ================= Security ================= */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 p-5 sm:p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800 text-base sm:text-lg">
                  Security
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Manage security settings
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-gray-600" />
                <p className="text-sm font-medium text-gray-700">
                  Change Password
                </p>
              </div>
              <span className="text-gray-400 text-lg">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= REMOVE USER MODAL ================= */}
      {openRemoveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white w-[400px] rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">
              <span className="text-[#10155F]">Remove U</span>
              <span className="bg-gradient-to-r from-[#10155F] to-[#B37BD6] bg-clip-text text-transparent">
                ser (04)
              </span>
            </h2>
            <div className="space-y-3">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-red-50 p-3 rounded-xl"
                >
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    {user}
                  </div>

                  {/* Toggle */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-red-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                  </label>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setOpenRemoveModal(false)}
                className="text-sm text-gray-500 hover:text-black cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettingPage;
