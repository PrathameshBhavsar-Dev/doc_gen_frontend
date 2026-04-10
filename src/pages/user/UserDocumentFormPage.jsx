import React, { useState } from "react";
import { companies } from "../../components/constant/publicData/mockData"; // adjust path
import { FiEye } from "react-icons/fi";
const fields = [
  { name: "company", label: "Company", type: "select", required: true },
  { name: "fullName", label: "Full Name", type: "text", required: true },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
    required: true,
  },
  { name: "mobile", label: "Mobile No", type: "text", required: true },
  { name: "email", label: "Email ID", type: "email", required: true },
  { name: "pan", label: "PAN No", type: "text", required: true },
  { name: "dob", label: "Date of Birth", type: "date", required: true },

  {
    name: "currentAddress",
    label: "Current Address",
    type: "text",
    span: 2,
    required: true,
  },
  {
    name: "permanentAddress",
    label: "Permanent Address",
    type: "text",
    span: 2,
    required: true,
  },

  { name: "offerDate", label: "Offer Date", type: "date", required: true },
  { name: "joiningDate", label: "Joining Date", type: "date", required: true },

  { name: "joiningCTC", label: "Joining CTC", type: "text", required: true },
  { name: "currentCTC", label: "Current CTC", type: "text" },

  {
    name: "joiningDesignation",
    label: "Joining Designation",
    type: "text",
    required: true,
  },
  { name: "currentDesignation", label: "Current Designation", type: "text" },

  { name: "resignationDate", label: "Resignation Date", type: "date" },
  { name: "relievingDate", label: "Relieving Date", type: "date" },

  { name: "bankName", label: "Bank Name", type: "text", required: true },
  { name: "accountNo", label: "Account No", type: "text", required: true },
];

const UserDocumentFormPage = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const renderField = (field) => {
    const baseClass =
      "w-full h-[40px] px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#1E293B] placeholder:text-[#94A3B8] outline-none transition-all duration-200 ease-in-out shadow-sm focus:border-[#6366F1] focus:bg-white focus:ring-4 focus:ring-[#6366F1]/10";

    if (field.type === "select") {
      return (
        <div className="relative">
          <select
            className={`
          w-full h-[44px] px-3 pr-10
          rounded-xl 
          bg-[#F8FAFC] 
          border border-[#E2E8F0]
          text-sm text-[#1E293B]
          appearance-none
          outline-none
          transition-all duration-200 ease-in-out
          shadow-sm
          focus:border-[#6366F1] 
          focus:bg-white 
          focus:ring-4 focus:ring-[#6366F1]/10
          hover:border-[#CBD5F5]
          cursor-pointer
        `}
            onChange={(e) => handleChange(field.name, e.target.value)}
          >
            <option value="">Select {field.label}</option>

            {field.name === "company"
              ? companies.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))
              : field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
          </select>

          {/* Custom Dropdown Arrow */}
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-[#64748B]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      );
    }

    return (
      <input
        type={field.type}
        className={baseClass}
        placeholder={`Enter ${field.label}`}
        onChange={(e) => handleChange(field.name, e.target.value)}
      />
    );
  };
  return (
    <div className="bg-white w-full  overflow-x-hidden ">
      <div className="rounded-2xl p-1 sm:p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] max-w-[1400px] mx-auto">
        {/* Header */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#1E293B] mb-6">
          User Profile Form
        </h2>

        {/* Form Grid */}
        <div
          className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-x-4 sm:gap-x-6 
        gap-y-4 sm:gap-y-5
      "
        >
          {fields.map((field) => (
            <div
              key={field.name}
              className={`flex flex-col gap-1 
              ${field.span === 2 ? "sm:col-span-2 lg:col-span-2" : ""}
            `}
            >
              <label className="text-xs font-medium text-[#475569]">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              {renderField(field)}
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-start">
          <button
            className="
            flex items-center gap-2 
            px-5 py-2.5 
            rounded-lg 
            bg-gradient-to-r from-[#1C1D68] to-[#B37BD6]
            text-white text-sm font-medium
            shadow-md hover:shadow-lg
            transition-all duration-300
            hover:scale-105
          "
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDocumentFormPage;
