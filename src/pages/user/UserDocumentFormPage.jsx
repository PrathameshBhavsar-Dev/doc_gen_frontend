import React, { useState } from "react";
import {
  companies,
  documentTypes,
} from "../../components/constant/publicData/mockData";
import { FiEye } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/* ---------------- BASIC FIELDS ---------------- */
const basicFields = [
  { name: "company", label: "Company", type: "select", required: true },
  {
    name: "mrms",
    label: "Identity",
    type: "select",
    options: ["Mr.", "Mrs.", "Miss.", "Mx."],
    required: true,
  },
  { name: "fullName", label: "Full Name", type: "text", required: true },

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
  { name: "currentCTC", label: "Current CTC", type: "text", required: true },

  {
    name: "joiningDesignation",
    label: "Joining Designation",
    type: "text",
    required: true,
  },
  {
    name: "currentDesignation",
    label: "Current Designation",
    type: "text",
    required: true,
  },
  { name: "department", label: "Department", type: "text", required: true },
  {
    name: "resignationDate",
    label: "Resignation Date",
    type: "date",
    required: true,
  },
  {
    name: "relievingDate",
    label: "Relieving Date",
    type: "date",
    required: true,
  },

  { name: "bankName", label: "Bank Name", type: "text", required: true },
  { name: "accountNo", label: "Account No", type: "text", required: true },
];

const UserDocumentFormPage = () => {
  const [formData, setFormData] = useState({});
  const [selectedDocs, setSelectedDocs] = useState([]);
  const ALL_DOC_ID = "ALL_DOCS";
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  /* ---------------- HANDLE INPUT ---------------- */
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

    // ✅ remove error when user fixes input
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  /* ---------------- DOCUMENT SELECT ---------------- */
  const handleDocSelect = (doc) => {
    // If ALL selected
    if (doc.id === ALL_DOC_ID) {
      const isAllSelected = selectedDocs.find((d) => d.id === ALL_DOC_ID);

      if (isAllSelected) {
        setSelectedDocs([]); // unselect all
      } else {
        setSelectedDocs([{ id: ALL_DOC_ID, name: "All Documents" }]);
      }
      return;
    }

    // If selecting individual doc → remove ALL_DOC
    let updatedDocs = selectedDocs.filter((d) => d.id !== ALL_DOC_ID);

    const exists = updatedDocs.find((d) => d.id === doc.id);

    if (exists) {
      updatedDocs = updatedDocs.filter((d) => d.id !== doc.id);
    } else {
      updatedDocs.push(doc);
    }

    setSelectedDocs(updatedDocs);
  };

  /* ---------------- CONDITIONAL FIELD ---------------- */
  const shouldShowField = (field) => {
    if (!field.dependsOn) return true;
    return formData[field.dependsOn.field] === field.dependsOn.value;
  };

  /* ---------------- FILTER DOCUMENTS ---------------- */
  const excludedDocIds = [6, 8, 9, 10, 13, 14, 15];

  const filteredDocuments = documentTypes.filter(
    (doc) => !excludedDocIds.includes(doc.id),
  );

  /* ---------------- REMOVE DUPLICATE FIELDS ---------------- */

  // basic field names
  const basicFieldNames = basicFields.map((f) => f.name);

  // normalize names (based on YOUR mock data)
  const normalizeFieldName = (name) => {
    const map = {
      employeeName: "fullName",
      employeeEmail: "email",
      employeePhone: "mobile",
      employeeNumber: "mobile",
      address: "currentAddress",
      designation: "joiningDesignation",
      position: "joiningDesignation",
      mode: "bankName",
      gender: "mrms",
      dateofresignation: "resignationDate",
      doj: "joiningDate",
      lastWorkingDay: "relievingDate",
    };
    return map[name] || name;
  };

  const getFilteredFieldsByDoc = (doc) => {
    return doc.fields.filter((field) => {
      const normalized = normalizeFieldName(field.name);
      return !basicFieldNames.includes(normalized);
    });
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const handleSave = () => {
    let newErrors = {};

    // ✅ Basic fields validation
    basicFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = "Please fill all the required fields";
      }
    });

    // ✅ Document fields validation
    const docsToCheck = selectedDocs.find((d) => d.id === ALL_DOC_ID)
      ? filteredDocuments
      : selectedDocs;

    docsToCheck.forEach((doc) => {
      const filteredFields = getFilteredFieldsByDoc(doc);

      filteredFields.forEach((field) => {
        if (field.required && shouldShowField(field) && !formData[field.name]) {
          newErrors[field.name] = "Please fill all the required fields";
        }
      });
    });

    setErrors(newErrors);

    // ❌ Stop if errors exist
    if (Object.keys(newErrors).length > 0) return;

    // ✅ Continue
    if (selectedDocs.length > 0) {
      setShowConfirm(true);
    } else {
      console.log("Profile Saved:", formData);
    }
  };
  /* ---------------- FIELD RENDER ---------------- */
  const renderField = (field) => {
    const baseClass = `
  w-full h-[40px] px-3 rounded-xl 
  bg-[#F8FAFC] border text-sm outline-none 
  ${
    errors[field.name]
      ? "border-red-500 focus:ring-red-300"
      : "border-[#E2E8F0] focus:border-[#6366F1] focus:ring-[#6366F1]/20"
  }
  focus:ring-2
`;

    if (field.type === "select") {
      return (
        <select
          className={baseClass}
          required={field.required} // ✅ ADDED
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
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          className={`${baseClass} h-[80px]`}
          placeholder={`Enter ${field.label}`}
          required={field.required} // ✅ ADDED
          onChange={(e) => handleChange(field.name, e.target.value)}
        />
      );
    }

    return (
      <input
        type={field.type}
        className={baseClass}
        placeholder={`Enter ${field.label}`}
        required={field.required} // ✅ ADDED
        onChange={(e) => handleChange(field.name, e.target.value)}
      />
    );
  };
  const docsToRender = selectedDocs.find((d) => d.id === ALL_DOC_ID)
    ? filteredDocuments // show ALL documents
    : selectedDocs; // normal selected ones

  return (
    <div className="min-h-screen w-full  overflow-x-hidden">
      <div className="max-w-[1350px] mx-auto ">
        {/* ---------------- DOCUMENT SELECTOR ---------------- */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#475569] mb-2">
            Select Document Type
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {/* -------- ALL DOCUMENTS CARD -------- */}
            {(() => {
              const isActive = selectedDocs.find((d) => d.id === ALL_DOC_ID);

              return (
                <div
                  onClick={() =>
                    handleDocSelect({ id: ALL_DOC_ID, name: "All Documents" })
                  }
                  className={`
            cursor-pointer rounded-xl p-3 border 
            transition-all duration-200 ease-in-out
            shadow-[0_2px_8px_rgba(0,0,0,0.04)]
            hover:shadow-[0_6px_14px_rgba(99,102,241,0.12)]
            hover:-translate-y-[2px]
            active:scale-[0.97]
            group
            ${
              isActive
                ? "bg-gradient-to-br from-[#0E145E] to-[#B37BD6] text-white border-transparent"
                : "bg-white border-[#E2E8F0]"
            }
          `}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-lg mb-2 ${
                      isActive
                        ? "bg-white/20"
                        : "bg-[#EEF2FF] group-hover:bg-[#E0E7FF]"
                    }`}
                  >
                    📄
                  </div>

                  <p className="text-[14px] font-medium leading-tight">
                    All Documents
                  </p>

                  <p className="text-[10px] mt-0.5 opacity-70">
                    Click to select all
                  </p>
                </div>
              );
            })()}

            {/* -------- EXISTING DOCUMENTS -------- */}
            {filteredDocuments.map((doc) => {
              const isActive = selectedDocs.find((d) => d.id === doc.id);

              return (
                <div
                  key={doc.id}
                  onClick={() => handleDocSelect(doc)}
                  className={`
            cursor-pointer rounded-xl p-3 border 
            transition-all duration-200 ease-in-out
            shadow-[0_2px_8px_rgba(0,0,0,0.04)]
            hover:shadow-[0_6px_14px_rgba(99,102,241,0.12)]
            hover:-translate-y-[2px]
            active:scale-[0.97]
            group
            ${
              isActive
                ? "bg-gradient-to-br from-[#0E145E] to-[#B37BD6] text-white border-transparent"
                : "bg-white border-[#E2E8F0]"
            }
          `}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-lg mb-2 ${
                      isActive
                        ? "bg-white/20"
                        : "bg-[#EEF2FF] group-hover:bg-[#E0E7FF]"
                    }`}
                  >
                    <FiEye
                      className={`text-sm ${
                        isActive ? "text-white" : "text-[#6366F1]"
                      }`}
                    />
                  </div>

                  <p className="text-[14px] font-medium leading-tight">
                    {doc.name}
                  </p>

                  <p className="text-[10px] mt-0.5 opacity-70">
                    Click to select
                  </p>

                  <p className="text-[10px] mt-0.5 opacity-70">
                    {isActive ? "Selected" : ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------------- FORM ---------------- */}
        <div className="rounded-3xl p-6 bg-white/80 backdrop-blur-md border border-[#E2E8F0]/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300">
          {/* HEADER */}
          <div className="mb-6 flex items-center justify-between">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-2">
              {/* BACK BUTTON */}
              <button
                onClick={() => navigate(-1)}
                className="
        w-9 h-9 flex items-center justify-center
        rounded-xl
        bg-[#F8FAFC]
        border border-[#E2E8F0]
        hover:bg-[#F1F5F9]
        transition-all duration-200
      "
              >
                <FiArrowLeft className="text-[16px] text-[#334155]" />
              </button>

              {/* TITLE */}
              <h2 className="text-xl font-semibold text-[#1E293B] tracking-tight">
                User Profile Form
              </h2>
            </div>
          </div>

          {/* ---------------- BASIC DETAILS ---------------- */}
          <div className="mb-8">
            {/* <h3 className="text-sm font-semibold text-[#6366F1] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6366F1]"></span>
              Basic Details
            </h3> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {basicFields.map((field) => (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-[#475569]">
                    {field.label}
                    {field.required && <span className="text-red-500"> *</span>}
                  </label>

                  {renderField(field)}

                  {/* ✅ ERROR MESSAGE */}
                  {errors[field.name] && (
                    <p className="text-red-500 text-[11px] mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- DOCUMENT FIELDS ---------------- */}
          {selectedDocs.length > 0 && (
            <div className="mt-10 p-5 rounded-2xl bg-[#F8FAFF]/70 border border-dashed border-[#C7D2FE] transition-all duration-300">
              <div className="text-xs bg-gradient-to-r from-[#0E145E] to-[#B37BD6] bg-clip-text text-transparent font-medium mb-4">
                Document Details
              </div>

              {docsToRender.map((doc) => {
                const filteredFields = getFilteredFieldsByDoc(doc);
                if (filteredFields.length === 0) return null;

                return (
                  <div
                    key={doc.id}
                    className="
  mb-8 p-5 rounded-2xl 
  bg-gradient-to-r from-[#EEF2FF]/70 via-[#F8FAFF] to-[#FAF5FF]/70
  border border-[#E2E8F0]/60
  relative
  transition-all duration-300
  hover:shadow-[0_8px_25px_rgba(99,102,241,0.12)]
"
                  >
                    <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-[#0E145E] to-[#B37BD6] rounded-l-2xl"></div>
                    {/* Document Title */}
                    <h3 className="text-sm font-semibold text-[#362b97] mb-4 flex items-center gap-2">
                      {" "}
                      <span className="w-2 h-2 rounded-full bg-[#4927af]"></span>
                      {doc.name}
                    </h3>

                    {/* Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {filteredFields.map((field) =>
                        shouldShowField(field) ? (
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-[#475569]">
                              {field.label}
                              {field.required && (
                                <span className="text-red-500"> *</span>
                              )}
                            </label>

                            {renderField(field)}

                            {/* ✅ ERROR MESSAGE */}
                            {errors[field.name] && (
                              <p className="text-red-500 text-[11px] mt-1">
                                {errors[field.name]}
                              </p>
                            )}
                          </div>
                        ) : null,
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ---------------- BUTTON ---------------- */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className="
    px-6 py-2.5 
    rounded-xl 
    bg-gradient-to-r from-[#0E145E] to-[#B37BD6]
    text-white text-sm font-medium
    shadow-[0_6px_18px_rgba(99,102,241,0.25)]
    hover:shadow-[0_10px_25px_rgba(99,102,241,0.35)]
    transition-all duration-300
    hover:scale-[1.03]
    active:scale-[0.97]
  "
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

          {/* Modal */}
          <div
            className="
        relative z-10 
        w-full max-w-md 
        rounded-2xl 
        bg-white 
        p-6 sm:p-7 
        shadow-[0_20px_50px_rgba(0,0,0,0.15)]
        animate-fadeIn
      "
          >
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-semibold text-[#1E293B] mb-2">
              Generate Document?
            </h3>

            {/* Description */}
            <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
              Your profile has been saved successfully. Do you want to generate
              the selected document now?
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              {/* Cancel */}
              <button
                onClick={() => setShowConfirm(false)}
                className="
            w-full sm:w-auto
            px-4 py-2.5 
            rounded-lg 
            border border-[#E2E8F0] 
            text-sm text-[#475569]
            hover:bg-[#F8FAFC]
            transition-all
          "
              >
                Cancel
              </button>

              {/* Generate */}
              <button
                onClick={() => {
                  setShowConfirm(false);
                  console.log(
                    "Generate Document with:",
                    formData,
                    selectedDocs,
                  );
                }}
                className="
            w-full sm:w-auto
            px-4 py-2.5 
            rounded-lg 
            bg-gradient-to-r from-[#6366F1] to-[#A78BFA]
            text-white text-sm font-medium
            shadow-md
            hover:shadow-lg
            transition-all duration-300
          "
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDocumentFormPage;
