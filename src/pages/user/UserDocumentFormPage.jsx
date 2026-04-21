import React, { useState, useMemo, useEffect } from "react";
import {
  companies,
  documentTypes,
} from "../../components/constant/publicData/mockData";
import { FiEye } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { FiZap } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../core/constants/routes.constant";

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
  { name: "employeeName", label: "Full Name", type: "text", required: true },
  { name: "id", label: "Employee ID", type: "text", required: true },

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
    required: false,
  },

  { name: "offerDate", label: "Offer Date", type: "date", required: true },
  { name: "joiningDate", label: "Joining Date", type: "date", required: true },

  { name: "joiningCTC", label: "Joining CTC", type: "text", required: true },
  { name: "salary", label: "Current CTC", type: "text", required: true },

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

  { name: "bankName", label: "Bank Name", type: "text", required: true },
  { name: "accountNo", label: "Account No", type: "text", required: true },
  {
    name: "offerType",
    label: "PF Type",
    type: "select",
    options: ["withPF", "withoutPF"],
    required: true,
  },
];

const UserDocumentFormPage = () => {
  const [formData, setFormData] = useState({});
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [salarySlipMonths, setSalarySlipMonths] = useState([]); // NEW: Track month range
  const ALL_DOC_ID = "ALL_DOCS";
  const [errors, setErrors] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();

  /* ---------------- HANDLE INPUT ---------------- */
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  /* ---------------- GENERATE MONTHS BETWEEN RANGE ---------------- */
  const generateMonthsArray = (start, end) => {
    if (!start || !end) return [];

    const months = [];
    let current = new Date(start + "-01");
    const last = new Date(end + "-01");

    if (current > last) return [];

    while (current <= last) {
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, "0");

      months.push({
        value: `${year}-${month}`,
        label: current.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
      });

      current.setMonth(current.getMonth() + 1);
    }

    return months;
  };

  /* ---------------- HANDLE SALARY SLIP MONTH CHANGE ---------------- */
  const handleSalaryMonthChange = (field, value) => {
    handleChange(field, value);

    const startMonth =
      field === "salarySlipStartMonth" ? value : formData.salarySlipStartMonth;
    const endMonth =
      field === "salarySlipEndMonth" ? value : formData.salarySlipEndMonth;

    if (startMonth && endMonth) {
      const months = generateMonthsArray(startMonth, endMonth);
      setSalarySlipMonths(months);
    } else {
      setSalarySlipMonths([]);
    }
  };

  useEffect(() => {
    const months = generateMonthsArray(
      formData.salarySlipStartMonth,
      formData.salarySlipEndMonth,
    );

    const initialData = {};
    months.forEach((month) => {
      initialData[month.value] = "";
    });

    setFormData((prev) => ({
      ...prev,
      salaryWorkdays: initialData,
    }));
  }, [formData.salarySlipStartMonth, formData.salarySlipEndMonth]);

  const getWorkingDays = (monthStr) => {
    const [year, month] = monthStr.split("-");

    const date = new Date(year, month - 1, 1);
    let workingDays = 0;

    while (date.getMonth() === month - 1) {
      const day = date.getDay();

      // 0 = Sunday, 6 = Saturday
      if (day !== 0 && day !== 6) {
        workingDays++;
      }

      date.setDate(date.getDate() + 1);
    }

    return workingDays;
  };

  useEffect(() => {
    if (!salarySlipMonths.length) return;

    setFormData((prev) => {
      const existing = prev.salaryWorkdays || {};
      const updated = { ...existing };

      salarySlipMonths.forEach((month) => {
        if (!updated[month.value]) {
          updated[month.value] = getWorkingDays(month.value); // 👈 dynamic
        }
      });

      return {
        ...prev,
        salaryWorkdays: updated,
      };
    });
  }, [salarySlipMonths]);

  /* ---------------- DOCUMENT SELECT ---------------- */
  const handleDocSelect = (doc) => {
    if (doc.id === ALL_DOC_ID) {
      const isAllSelected = selectedDocs.find((d) => d.id === ALL_DOC_ID);

      if (isAllSelected) {
        setSelectedDocs([]);
        setSalarySlipMonths([]); // Reset salary months when deselecting all
      } else {
        setSelectedDocs([{ id: ALL_DOC_ID, name: "All Documents" }]);
      }
      return;
    }

    let updatedDocs = selectedDocs.filter((d) => d.id !== ALL_DOC_ID);

    const exists = updatedDocs.find((d) => d.id === doc.id);

    if (exists) {
      updatedDocs = updatedDocs.filter((d) => d.id !== doc.id);

      // Reset salary months if salary slip is deselected
      if (doc.name === "Salary Slip") {
        setSalarySlipMonths([]);
        setFormData((prev) => {
          const newData = { ...prev };
          delete newData.salarySlipStartMonth;
          delete newData.salarySlipEndMonth;
          return newData;
        });
      }
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
  const basicFieldNames = useMemo(() => basicFields.map((f) => f.name), []);

  const normalizeFieldName = (name) => {
    const map = {
      employeeName: "employeeName",
      employeeEmail: "employeeEmail",
      employeePhone: "mobile",
      employeeNumber: "mobile",
      address: "currentAddress",
      designation: "joiningDesignation",
      position: "joiningDesignation",
      mode: "bankName",
      gender: "mrms",
      doj: "joiningDate",
      totalSalary: "salary",
      salary: "salary",
      currentSalary: "salary",
      newCTC: "salary",
      stipend: "salary",
      stipend: "currentCTC",

      employeeId: "id",
    };
    return map[name] || name;
  };

  const getFilteredFieldsByDoc = (doc) => {
    return doc.fields.filter((field) => {
      const normalized = normalizeFieldName(field.name);

      // ❌ Skip if already part of basic fields
      if (basicFieldNames.includes(normalized)) {
        return false;
      }

      return true;
    });
  };

  const [showGeneratePopup, setShowGeneratePopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);

  const handleSave = () => {
    let newErrors = {};

    basicFields.forEach((field) => {
      const error = validateField(field.name, formData[field.name]);
      if (error) newErrors[field.name] = error;
    });

    const docsToCheck = selectedDocs.find((d) => d.id === ALL_DOC_ID)
      ? filteredDocuments
      : selectedDocs;

    docsToCheck.forEach((doc) => {
      const filteredFields = getFilteredFieldsByDoc(doc);

      filteredFields.forEach((field) => {
        if (field.required && shouldShowField(field)) {
          const error = validateField(field.name, formData[field.name]);
          if (error) newErrors[field.name] = error;
        }
      });
    });

    // const normalizedData = {
    //   ...formData,
    //   technologies: normalizeArray(formData.technologies),
    // };

    // const payload = {
    //   employee: normalizedData,
    //   documents: selectedDocs,
    // };

    // console.log("FINAL PAYLOAD:", payload);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // ✅ CREATE PAYLOAD HERE
    let payload = { ...formData };

    // ✅ HANDLE MULTIPLE DOCS
    const docsToProcess = selectedDocs.find((d) => d.id === ALL_DOC_ID)
      ? filteredDocuments
      : selectedDocs;

    docsToProcess.forEach((doc) => {
      const docKey = normalizeDocName(doc.name); // e.g. appointment_letter

      const salaryFieldMap = {
        offer_letter: "salary",
        salaryslip_letter: "totalSalary",
        appointment_letter: "salary",

        increment_letter: "newCTC",
        internshipcertificate_letter: "stipend",
        fullandfinal_letter: "totalSalary",
        confirmation_letter: "totalSalary",
      };

      const targetKey = salaryFieldMap[docKey];

      if (targetKey && targetKey !== "salary") {
        payload[targetKey] = formData.salary;
      }
      const designationFieldMap = {
        salaryslip_letter: "designation",

        offer_letter: "position",
        appointment_letter: "position",
        increment_letter: "designation",
        experience_letter: "designation",
        relieving_letter: "designation",
        internshipcertificate_letter: "designation",
        completion_certificate: "designation",
        fullandfinal_letter: "designation",
        confirmation_letter: "designation",
      };
      // ✅ DESIGNATION MAPPING
      const designationKey = designationFieldMap[docKey];

      if (designationKey && designationKey !== "joiningDesignation") {
        payload[designationKey] = formData.joiningDesignation;
      }
    });

    console.log("FINAL PAYLOAD:", payload);

    // ✅ store payload temporarily
    setFormData(payload);

    // ✅ show popup instead of navigating
    setShowGeneratePopup(true);
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
          required={field.required}
          value={formData[field.name] || ""}
          onChange={(e) => {
            handleChange(field.name, e.target.value);

            if (field.name === "company") {
              const companyObj = companies.find(
                (c) => c.name === e.target.value,
              );
              setSelectedCompany(companyObj); // ✅ THIS IS THE FIX
            }
          }}
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
          required={field.required}
          value={formData[field.name] || ""}
          onChange={(e) => handleChange(field.name, e.target.value)}
        />
      );
    }

    return (
      <input
        type={field.type}
        className={baseClass}
        placeholder={`Enter ${field.label}`}
        required={field.required}
        value={formData[field.name] || ""}
        onChange={(e) => handleChange(field.name, e.target.value)}
      />
    );
  };

  const docsToRender = selectedDocs.find((d) => d.id === ALL_DOC_ID)
    ? filteredDocuments
    : selectedDocs;

  const validateField = (name, value) => {
    if (!value) return "Please fill the required fields";

    switch (name) {
      case "fullName":
        if (!/^[A-Za-z\s]+$/.test(value)) return "Only alphabets allowed";
        break;

      case "mobile":
        if (!/^[6-9]\d{9}$/.test(value))
          return "Enter valid 10-digit mobile number";
        break;

      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter valid email address";
        break;

      case "pan":
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value))
          return "Enter valid PAN (ABCDE1234F)";
        break;

      case "accountNo":
        if (!/^\d{9,18}$/.test(value))
          return "Account number must be 9-18 digits";
        break;

      case "joiningCTC":
      case "salary":
        if (isNaN(value) || Number(value) <= 0) return "Enter valid amount";
        break;

      case "dob":
        if (new Date(value) > new Date()) return "DOB cannot be future date";
        break;

      case "joiningDate":
      case "offerDate":
        if (isNaN(new Date(value))) return "Invalid date";
        break;

      default:
        break;
    }

    return "";
  };

  const normalizeDocName = (name) => name?.toLowerCase().replace(/\s+/g, "_");

  /* ---------------- CHECK IF SALARY SLIP IS SELECTED ---------------- */
  const isSalarySlipSelected = () => {
    return selectedDocs.some(
      (d) => normalizeDocName(d.name) === "salary_slip" || d.id === ALL_DOC_ID,
    );
  };

  const salaryFieldMap = {
    offer_letter: "salary",
    appointment_letter: "totalSalary",
    increment_letter: "salary",
    experience_letter: "salary",
  };
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="max-w-[1350px] mx-auto">
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
            <div className="flex items-center gap-2">
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

              <h2 className="text-xl font-semibold text-[#1E293B] tracking-tight">
                User Profile Form
              </h2>
            </div>
          </div>

          {/* ---------------- BASIC DETAILS ---------------- */}
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {basicFields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-[#475569]">
                    {field.label}
                    {field.required && <span className="text-red-500"> *</span>}
                  </label>

                  {renderField(field)}

                  {errors[field.name] && (
                    <p className="text-red-500 text-[11px] mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- SALARY SLIP MONTH SELECTOR ---------------- */}
          {isSalarySlipSelected() && (
            <div className="mb-8 p-5 rounded-2xl bg-[#F8FAFF]/70 border border-dashed border-[#C7D2FE]">
              <h3 className="text-sm font-semibold text-[#362b97] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4927af]"></span>
                Salary Slip Period
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-[#475569]">
                    Start Month <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="month"
                    className="w-full h-[40px] px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm outline-none focus:border-[#6366F1] focus:ring-[#6366F1]/20 focus:ring-2"
                    value={formData.salarySlipStartMonth || ""}
                    onChange={(e) =>
                      handleSalaryMonthChange(
                        "salarySlipStartMonth",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-[#475569]">
                    End Month <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="month"
                    className="w-full h-[40px] px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm outline-none focus:border-[#6366F1] focus:ring-[#6366F1]/20 focus:ring-2"
                    value={formData.salarySlipEndMonth || ""}
                    min={formData.salarySlipStartMonth || ""}
                    onChange={(e) =>
                      handleSalaryMonthChange(
                        "salarySlipEndMonth",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>

              {/* DYNAMIC MONTH FIELDS */}
              {salarySlipMonths.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-xs font-semibold text-[#475569] mb-3">
                    Workdays per Month
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {salarySlipMonths.map((month) => (
                      <div key={month.value} className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-[#475569]">
                          {month.label} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          className="w-full h-[40px] px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm outline-none focus:border-[#6366F1] focus:ring-[#6366F1]/20 focus:ring-2"
                          placeholder="Enter workdays"
                          min="1"
                          max="31"
                          value={String(
                            formData.salaryWorkdays?.[month.value] ?? "",
                          )}
                          onChange={(e) => {
                            const val = e.target.value;
                            console.log("Typing:", month.value, val);

                            setFormData((prev) => {
                              const updated = {
                                ...prev,
                                salaryWorkdays: {
                                  ...(prev.salaryWorkdays || {}),
                                  [month.value]: val,
                                },
                              };

                              console.log(
                                "Updated State:",
                                updated.salaryWorkdays,
                              );
                              return updated;
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---------------- DOCUMENT FIELDS ---------------- */}
          {selectedDocs.length > 0 && (
            <div className="mt-10 p-5 rounded-2xl bg-[#F8FAFF]/70 border border-dashed border-[#C7D2FE] transition-all duration-300">
              <div className="text-xs bg-gradient-to-r from-[#0E145E] to-[#B37BD6] bg-clip-text text-transparent font-medium mb-4">
                Document Details
              </div>

              {docsToRender.map((doc) => {
                // Skip Salary Slip as we handle it separately above
                if (doc.name === "Salary Slip") return null;

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

                    <h3 className="text-sm font-semibold text-[#362b97] mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4927af]"></span>
                      {doc.name}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {filteredFields.map((field) =>
                        shouldShowField(field) ? (
                          <div key={field.name} className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-[#475569]">
                              {field.label}
                              {field.required && (
                                <span className="text-red-500"> *</span>
                              )}
                            </label>

                            {renderField(field)}

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

      {/* POPUPS - keeping your existing ones */}
      {showGeneratePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/[0.04] backdrop-blur-[2px]"></div>
          <div className="relative z-10 w-full max-w-md">
            <div className="relative rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6">
              <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#0E145E] to-[#B37BD6] rounded-l-2xl"></div>

              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#EEF2FF]">
                  <FiZap className="text-[16px] text-[#0E145E]" />
                </div>

                <div>
                  <h3 className="text-[15px] font-semibold text-[#1E293B]">
                    Generate Documents
                  </h3>
                  <p className="text-[13px] text-[#64748B] mt-1">
                    Profile saved successfully. Generate selected documents now?
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={() => setShowGeneratePopup(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:bg-[#F1F5F9] hover:shadow-[0_6px_14px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.97]"
                >
                  Later
                </button>

                <button
                  onClick={() => {
                    console.log("Generate Document:", {
                      formData,
                      selectedDocs,
                      salarySlipMonths,
                      selectedCompany, // 👈 check this
                    });

                    if (!selectedCompany) {
                      alert("Please select a company");
                      return;
                    }

                    navigate(ROUTES.DOCUMENT_PREVIEW, {
                      state: {
                        formData,
                        selectedDocs,
                        salarySlipMonths,
                        companyData: selectedCompany, // ✅ FIX
                      },
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0E145E] to-[#B37BD6] text-white text-sm font-medium shadow-[0_6px_18px_rgba(99,102,241,0.25)] hover:shadow-[0_10px_25px_rgba(99,102,241,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSavePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/[0.04] backdrop-blur-[2px]"></div>
          <div className="relative z-10 w-full max-w-md">
            <div className="relative rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6">
              <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#0E145E] to-[#B37BD6] rounded-l-2xl"></div>

              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#EEF2FF]">
                  <FiCheck className="text-[16px] text-[#0E145E]" />
                </div>

                <div>
                  <h3 className="text-[15px] font-semibold text-[#1E293B]">
                    Save Profile
                  </h3>
                  <p className="text-[13px] text-[#64748B] mt-1">
                    Do you want to save the profile details?
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={() => setShowSavePopup(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:bg-[#F1F5F9] hover:shadow-[0_6px_14px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.97]"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setShowSavePopup(false);
                    console.log("Profile Saved:", formData);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0E145E] to-[#B37BD6] text-white text-sm font-medium shadow-[0_6px_18px_rgba(99,102,241,0.25)] hover:shadow-[0_10px_25px_rgba(99,102,241,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDocumentFormPage;
