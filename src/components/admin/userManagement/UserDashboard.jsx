import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, X } from "lucide-react";
import { ArrowLeft, Search, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
const users = [
  {
    id: 1,
    name: "Aditi Khade",
    email: "aditi.khade@example.com",
    avatar: "A",
    total: 40,
    month: 12,
    date: "2/27/2026",
  },
  {
    id: 2,
    name: "Sagar Solanke",
    email: "sagar.solanke@example.com",
    avatar: "S",
    total: 50,
    month: 20,
    date: "2/26/2026",
  },
  {
    id: 3,
    name: "Abhijeet",
    email: "abhijeet.sir@example.com",
    avatar: "A",
    total: 70,
    month: 3,
    date: "2/25/2026",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    avatar: "S",
    total: 20,
    month: 10,
    date: "2/20/2026",
  },
];

export default function UserDashboard() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className=" min-h-screen  font-sans">
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
            {/* ADD USER */}
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

            {/* ADMIN */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Admin</span>

              <div
                className="w-9 h-9 rounded-full
                bg-gradient-to-r from-[#0E145E] to-[#B37BD6]
                text-white flex items-center justify-center font-semibold"
              >
                A
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH CARD */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div
            className="flex items-center gap-3 bg-[#F8F9FC]
            border border-gray-200 rounded-lg px-4 py-2"
          >
            <Search size={16} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search by employee name, ID, or document type..."
              className="bg-transparent outline-none text-sm w-full text-gray-700"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            {/* HEADER */}
            <thead className="text-sm text-gray-500 bg-[#FAFAFC]">
              <tr>
                <th className="text-left font-medium px-6 py-4">User</th>
                <th className="text-left font-medium px-6 py-4">Role</th>
                <th className="text-center font-medium px-6 py-4">
                  Total documents generated
                </th>
                <th className="text-center font-medium px-6 py-4">
                  Documents generated in month
                </th>
                <th className="text-left font-medium px-6 py-4">Date</th>
                <th className="text-center font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="text-sm">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  {/* USER */}
                  <td
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => navigate(`user-details/${user.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full
                        bg-gradient-to-r from-[#0E145E] to-[#B37BD6]
                        text-white flex items-center justify-center font-semibold"
                      >
                        {user.avatar}
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>

                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-4">
                    <span
                      className="px-3 py-1 text-xs rounded-full
                      bg-[#F3E8FF] text-[#8200DB] font-medium"
                    >
                      User
                    </span>
                  </td>

                  {/* TOTAL DOCS */}
                  <td className="px-6 py-4 text-gray-700 text-center">
                    {user.total}
                  </td>

                  {/* MONTH DOCS */}
                  <td className="px-6 py-4 text-gray-700 text-center">
                    {user.month}
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-gray-500">{user.date}</td>

                  {/* DELETE */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("delete user");
                      }}
                      className="text-red-500 p-2 rounded-md hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 bg-black/20  flex items-center justify-center z-50">
          {/* <div className="bg-white w-[420px] rounded-xl shadow-xl p-6 relative"> */}
          <div
            className="bg-white w-[420px] rounded-xl shadow-xl p-6 relative
animate-[modalPop_0.25s_ease-out]"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center
  rounded-full bg-red-100 hover:bg-red-200 transition"
            >
              <X size={14} className="text-red-500" />
            </button>

            {/* TITLE */}
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Add New User
            </h2>

            {/* NAME */}
            <div className="flex items-center gap-3 mb-4">
              <User size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Name"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#6A4DBF]"
              />
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-3 mb-6">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#6A4DBF]"
              />
            </div>
            {/* BUTTONS */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                className="flex items-center gap-2 px-5 py-2 text-sm text-white rounded-md
bg-gradient-to-r from-[#0E145E] to-[#B37BD6]
shadow-md hover:opacity-90"
              >
                <Plus size={16} />
                Send request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
