import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, X, ArrowLeft, Search, Plus, Trash2 } from "lucide-react";
import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";

export default function UserDashboard() {
  const navigate = useNavigate();
  const api = new ApiService();

  const [openModal, setOpenModal] = useState(false);

  // 🔥 NEW STATE
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.apiget(ServerUrl.API_ADMIN_USERS);

      console.log("USERS RESPONSE:", res);

      // ✅ Adjust based on backend response
      setUsers(res?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-4 items-start">
            <ArrowLeft
              size={30}
              className="text-gray-600 mt-3 cursor-pointer"
            />

            <div>
              <h1 className="text-[34px] font-semibold text-[#1F2937]">
                User management
              </h1>

              <p className="text-gray-500 text-[15px]">
                Manage all system users and their permissions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg mr-5
              text-white text-sm font-medium
              bg-gradient-to-r from-[#0E145E] to-[#B37BD6]
              shadow-md hover:opacity-90 transition"
            >
              <Plus size={16} />
              Add New User
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Admin</span>

              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#0E145E] to-[#B37BD6] text-white flex items-center justify-center font-semibold">
                A
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-3 bg-[#F8F9FC] border border-gray-200 rounded-lg px-4 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name..."
              className="bg-transparent outline-none text-sm w-full text-gray-700"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="text-sm text-gray-500 bg-[#FAFAFC]">
              <tr>
                <th className="text-left px-6 py-4">User</th>
                <th className="text-left px-6 py-4">Role</th>
                <th className="text-center px-6 py-4">Total Docs</th>
                <th className="text-center px-6 py-4">This Month</th>
                <th className="text-left px-6 py-4">Date</th>
                <th className="text-center px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {/* 🔥 LOADING */}
              {loading && (
                <tr>
                  <td colSpan="6" className="text-center py-6">
                    Loading users...
                  </td>
                </tr>
              )}

              {/* 🔥 EMPTY */}
              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6">
                    No users found
                  </td>
                </tr>
              )}

              {/* 🔥 DATA */}
              {users.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  {/* USER */}
                  <td
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => navigate(`user-details/${user._id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0E145E] to-[#B37BD6] text-white flex items-center justify-center font-semibold">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
                      {user.role || "user"}
                    </span>
                  </td>

                  {/* TOTAL */}
                  <td className="text-center">{user.totalDocs || 0}</td>

                  {/* MONTH */}
                  <td className="text-center">{user.monthDocs || 0}</td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* DELETE */}
                  <td className="text-center">
                    <button className="text-red-500 p-2 hover:bg-red-50 rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL (UNCHANGED) */}
      {openModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] rounded-xl shadow-xl p-6 relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-red-100"
            >
              <X size={14} className="text-red-500" />
            </button>

            <h2 className="text-lg font-semibold mb-6">Add New User</h2>

            <div className="flex items-center gap-3 mb-4">
              <User size={18} />
              <input
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder="Name"
              />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Mail size={18} />
              <input
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder="Email"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button className="px-5 py-2 text-white rounded bg-gradient-to-r from-[#0E145E] to-[#B37BD6]">
                Send request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}