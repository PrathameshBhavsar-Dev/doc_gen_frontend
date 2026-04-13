import React from "react";
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
        
        {/* Responsive Grid */}
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

            {/* Delete Account */}
            {/* <div className="flex items-center justify-between bg-red-50 p-3 sm:p-4 rounded-xl hover:bg-red-100 transition cursor-pointer">
              <div className="flex items-center gap-3">
                <Trash2 className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-600">
                    Delete Account
                  </p>
                  <p className="text-xs text-red-400">
                    Permanently delete data
                  </p>
                </div>
              </div>
              <span className="text-red-400 text-lg">›</span>
            </div> */}
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

          {/* ================= Preferences ================= */}
          {/* <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 p-5 sm:p-6 space-y-5 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800 text-base sm:text-lg">
                  Preferences
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Customize your experience
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600">Language</label>
              <select className="w-full border border-gray-300 rounded-xl p-2 sm:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </div>
          </div> */}

        </div>
      </div>
    </div>

  )
}

export default UserSettingPage