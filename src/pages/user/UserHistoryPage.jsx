import React from "react";
import { Search, Download, Eye } from "lucide-react";
import profile from "../../assets/images/profile.png";
import company_icon from "../../assets/images/companies_icon.png";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
const tableData = [
  {
    name: "Rahul Sharma",
    id: "EMP001",
    company: "Nimbja Security",
    generatedBy: "Aditi Khade",
    date: "Feb 15, 2026",
    status: "Completed",
  },
  {
    name: "Amit Kumar",
    id: "EMP003",
    company: "Quick Management",
    generatedBy: "Aditi Khade",
    date: "Feb 16, 2026",
    status: "Pending",
  },
  {
    name: "Vikram Singh",
    id: "EMP005",
    company: "Cubeage Tech",
    generatedBy: "Aditi Khade",
    date: "Feb 18, 2026",
    status: "Completed",
  },
  {
    name: "Anita Desai",
    id: "EMP006",
    company: "Newage Cloud",
    generatedBy: "Aditi Khade",
    date: "Feb 18, 2026",
    status: "Completed",
  },
  {
    name: "Priya Patel",
    id: "EMP007",
    company: "Penta Software",
    generatedBy: "Aditi Khade",
    date: "Feb 18, 2026",
    status: "Completed",
  },
  {
    name: "Amit Kumar",
    id: "EMP008",
    company: "Quick Managemant",
    generatedBy: "Aditi Khade",
    date: "Feb 18, 2026",
    status: "Completed",
  },
  {
    name: "Sneha Reddy",
    id: "EMP009",
    company: "Cubeage Tech",
    generatedBy: "Aditi Khade",
    date: "Feb 18, 2026",
    status: "Completed",
  },
  {
    name: "Vikram Singh",
    id: "EMP010",
    company: "Smart Software",
    generatedBy: "Aditi Khade",
    date: "Feb 18, 2026",
    status: "Completed",
  },
  {
    name: "Anita Desai",
    id: "EMP011",
    company: "Neweage Cloud",
    generatedBy: "Aditi Khade",
    date: "Feb 18, 2026",
    status: "Completed",
  },
  {
    name: "Vikram Singh",
    id: "EMP012",
    company: "Cubeage Tech",
    generatedBy: "Aditi Khade",
    date: "Feb 18, 2026",
    status: "Completed",
  },
  {
    name: "Amit Kumar",
    id: "EMP013",
    company: "Penta Software",
    generatedBy: "Aditi Khade",
    date: "Feb 18, 2026",
    status: "Completed",
  },
];

const CustomDropdown = ({ label, options }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-sm font-medium text-[#344054] mb-2">
        {label}
      </label>

      {/* Selected Box */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full h-11 bg-[#F9FAFB] border border-gray-200 
                   rounded-xl px-4 flex items-center justify-between
                   cursor-pointer hover:border-[#6D5DF6]
                   transition-all duration-200"
      >
        <span className="text-sm text-gray-600">{selected}</span>

        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown List */}
      <div
        className={`absolute left-0 right-0 mt-2 bg-white rounded-xl 
                    shadow-lg border border-gray-100 overflow-hidden
                    transition-all duration-200 z-50
                    ${
                      open
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
      >
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              setSelected(option);
              setOpen(false);
            }}
            className="px-4 py-3 text-sm text-gray-600 
                       hover:bg-[#F3F4FF] cursor-pointer 
                       transition"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

const ModernSelect = ({ label, options }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <label className="block text-sm font-medium text-[#344054] mb-2">
        {label}
      </label>

      {/* Select Box */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full h-12 bg-[#F9FAFB] border border-gray-200 rounded-xl
                   px-4 flex items-center justify-between
                   cursor-pointer transition-all duration-200
                   hover:border-[#6D5DF6]
                   focus-within:ring-2 focus-within:ring-[#6D5DF6]"
      >
        <span className="text-sm text-gray-700">{selected}</span>

        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown List */}
      <div
        className={`absolute left-0 right-0 mt-2 bg-white rounded-xl
                    shadow-xl border border-gray-100 overflow-hidden
                    transition-all duration-200 z-50
                    ${
                      open
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
      >
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              setSelected(option);
              setOpen(false);
            }}
            className={`px-4 py-3 text-sm flex items-center justify-between
                        cursor-pointer transition
                        ${
                          selected === option
                            ? "bg-[#F3F4FF] text-[#6D5DF6]"
                            : "hover:bg-[#F9FAFB] text-gray-600"
                        }`}
          >
            {option}
            {selected === option && <Check size={16} />}
          </div>
        ))}
      </div>
    </div>
  );
};
const UserHistoryPage = () => {
  return (
    <div className=" min-h-screen font-inter">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-[#1D293D]">
          <i class="fa-solid fa-arrow-left"></i> Document History
        </h1>

        <button
          className="bg-gradient-to-r from-[#21206C] to-[#B27AD5] 
                           text-white text-sm px-4 py-2 rounded-lg 
                           flex items-center gap-2 shadow-md hover:opacity-90 transition"
        >
          <Download size={16} />
          Export All
        </button>
      </div>

      {/* FILTER SECTION */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by employee name, ID, or document type..."
            className="w-full pl-11 pr-4 h-11 bg-[#F9FAFB] border border-gray-200 rounded-xl 
                 text-sm text-gray-600 placeholder-gray-400
                 focus:outline-none focus:ring-2 focus:ring-[#6D5DF6]"
          />
        </div>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Document Type */}
          <div>
            <label className="block text-sm font-semibold text-[#344054] mb-2">
              Document Type
            </label>

            <div className="relative group">
              <select
                className="appearance-none w-full h-12 
                   bg-white
                   border border-[#E4E7EC] 
                   rounded-xl 
                   px-4 pr-11
                   text-sm text-[#344054]
                   shadow-sm
                   transition-all duration-200 ease-in-out
                   hover:border-[#6D5DF6]
                   focus:outline-none 
                   focus:ring-2 focus:ring-[#6D5DF6]/20
                   focus:border-[#6D5DF6]"
              >
                <option value="">Select Document Type</option>
                <option value="salary">Salary Slip</option>
                <option value="offer">Offer Letter</option>
                <option value="experience">Experience Letter</option>
                <option value="relieving">Relieving Letter</option>
                <option value="others">Others</option>
              </select>

              {/* Animated Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400 transition-transform duration-200 group-focus-within:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-semibold text-[#344054] mb-2">
              Company
            </label>

            <div className="relative group">
              <select
                className="appearance-none w-full h-12 
                   bg-white
                   border border-[#E4E7EC] 
                   rounded-xl 
                   px-4 pr-11
                   text-sm text-[#344054]
                   shadow-sm
                   transition-all duration-200 ease-in-out
                   hover:border-[#6D5DF6]
                   focus:outline-none 
                   focus:ring-2 focus:ring-[#6D5DF6]/20
                   focus:border-[#6D5DF6]"
              >
                <option value="">Select Company</option>
                <option value="nimbja">Nimbja Security</option>
                <option value="penta">Penta Software</option>
                <option value="cubeage">Cubeage Tech</option>
                <option value="quick">Quick Management</option>
                <option value="smart">Smart Software</option>
                <option value="newage">Newage Cloud</option>
              </select>

              {/* Animated Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400 transition-transform duration-200 group-focus-within:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            {/* TABLE HEAD */}
            <thead className="bg-[#f0f4ff] text-[#344054] text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Employee Name</th>
                <th className="px-6 py-4">Employee ID</th>
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">Generated By</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Payment Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-gray-100">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  {/* EMPLOYEE COLUMN */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {/* Profile Icon */}
                      <div
                        className="w-10 h-10 rounded-xl bg-gradient-to-r 
                          from-[#393B8B] to-[#AD78D2] 
                          flex items-center justify-center shadow-sm"
                      >
                        <img
                          src={profile}
                          alt=""
                          className="w-5 h-5 object-contain"
                        />
                      </div>

                      {/* Name + File Size */}
                      <div>
                        <p className="font-medium text-[#1D293D] text-sm">
                          {row.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">245 KB</p>
                      </div>
                    </div>
                  </td>

                  {/* EMPLOYEE ID */}
                  <td className="px-6 py-5 text-gray-600 font-medium">
                    {row.id}
                  </td>

                  {/* COMPANY COLUMN */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-gray-600">
                      <img
                        src={company_icon}
                        alt=""
                        className="w-4 h-4 object-contain opacity-70"
                      />
                      <span className="text-sm">{row.company}</span>
                    </div>
                  </td>

                  {/* GENERATED BY */}
                  <td className="px-6 py-5 text-gray-600 text-sm">
                    {row.generatedBy}
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-5 text-gray-500 text-sm">
                    {row.date}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium
          ${
            row.status === "Completed"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
                    >
                      {row.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5 text-center">
                    <button
                      className="w-8 h-8 flex items-center justify-center 
                           rounded-full bg-[#EEF2FF] 
                           hover:bg-[#E0E7FF] transition"
                    >
                      <Eye size={15} className="text-[#6D5DF6]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserHistoryPage;
