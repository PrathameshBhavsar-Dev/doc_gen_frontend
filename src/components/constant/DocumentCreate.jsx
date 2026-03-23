import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// React Icons
import { IoArrowBack } from "react-icons/io5";
import { MdOutlinePreview, MdOutlineCancel } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdWarningAmber } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import { useCompany } from "../../core/contexts/CompanyContext";
import { useDocument } from "../../core/contexts/DocumentContext";
import { useAuth } from "../../core/contexts/AuthContext";
import { validateForm } from "../../utils/validationUtils";
import ROUTES from "../../core/constants/routes.constant";
import axios from "axios";
import API from "../../core/constants/serverURL.constant"; // adjust path
import ApiService from "../../core/services/api.service";

/* ========================= */
/*     Reusable Field Label  */
/* ========================= */
const FieldLabel = ({ label, required, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide"
  >
    {label}
    {required && <span className="text-red-500 ml-0.5">*</span>}
  </label>
);

/* ========================= */
/*     Input Class Helper    */
/* ========================= */

const inputClass = (hasError) =>
  `w-full rounded-lg border px-3 py-2.5 text-sm text-gray-800 bg-white
   focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition
   placeholder:text-gray-400
   ${hasError ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-gray-400"}`;

const selectClass = (hasError) =>
  `w-full rounded-lg border px-3 py-2.5 text-sm text-gray-800 bg-white
   focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition
   appearance-none cursor-pointer
   ${hasError ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-gray-400"}`;

/* ========================= */
/*     Field Error Message   */
/* ========================= */
const FieldError = ({ message }) => (
  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
    <MdWarningAmber className="w-3.5 h-3.5 shrink-0" />
    {message}
  </p>
);

/* ========================= */
/*     Select Wrapper        */
/* ========================= */
const SelectWrapper = ({ children }) => (
  <div className="relative">
    {children}
    <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
  </div>
);

/* ========================= */
/*         Main Form         */
/* ========================= */
const DocumentCreate = () => {
  const { selectedCompany, selectCompany, companies } = useCompany();
  const {
    selectedDocType,
    selectDocumentType,
    documentTypes,
    documentData,
    updateDocumentData,
    resetOnCompanyChange,
  } = useDocument();

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formErrors, setFormErrors] = useState({});
  const navStateApplied = useRef(false);
  const [logoError, setLogoError] = useState(false);

  /* ================= AUTH CHECK ================= */
  // useEffect(() => {
  //   if (!user) navigate("/login");
  // }, [user]);

  /* ================= READ NAVIGATION STATE ================= */
  useEffect(() => {
    if (navStateApplied.current) return;
    if (!location.state) return;
    if (!companies.length || !documentTypes.length) return;

    const { companyId, documentType } = location.state;
    if (companyId) selectCompany(Number(companyId));
    if (documentType) selectDocumentType(Number(documentType));

    navStateApplied.current = true;
  }, [companies.length, documentTypes.length]);

  /* ================= SAFE REDIRECT ================= */
  useEffect(() => {
    if (location.state) return;
    if (!companies.length || !documentTypes.length) return;
    if (!selectedCompany || !selectedDocType) {
      navigate(ROUTES.USER_DASHBOARD, { replace: true });
    }
  }, [selectedCompany, selectedDocType]);

  /* ================= COMPANY CHANGE ================= */
  const handleCompanyChange = (companyId) => {
    setLogoError(false); // ✅ add this line
    const currentDocTypeId = selectedDocType?.id;
    selectCompany(Number(companyId));
    resetOnCompanyChange();
    setFormErrors({});
    if (currentDocTypeId) selectDocumentType(currentDocTypeId);
  };

  /* ================= FIELD VISIBILITY ================= */
  const shouldShowField = (field) => {
    if (!field.dependsOn) return true;
    return documentData[field.dependsOn.field] === field.dependsOn.value;
  };

  /* ================= INPUT HANDLER ================= */
  const handleInputChange = (field, value) => {
    // Phone number validation (10 digits only)

    if (field === "employeePhone") {
      // allow only digits
      value = value.replace(/\D/g, "");

      // restrict to 10 digits
      if (value.length > 10) {
        value = value.slice(0, 10);
      }

      // store with 91 prefix
      updateDocumentData(field, value ? `91${value}` : "");
      return;
    }

    // Email cleanup
    if (field === "employeeEmail") {
      value = value.trim();
    }

    updateDocumentData(field, value);

    if (field === "internshipType" && value === "unpaid") {
      updateDocumentData("stipend", "");
    }

    // Clear field error when user edits
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };
  /* ================= VALIDATION ================= */
  const validateDocumentForm = () => {
    if (!selectedDocType) return true;

    const rules = {};

    selectedDocType.fields.forEach((field) => {
      if (!shouldShowField(field)) return;

      rules[field.name] = rules[field.name] || {};
      const isRequired = field.required === true || field.require === true;

      if (isRequired) {
        rules[field.name].required = true;
        rules[field.name].message = `${field.label} is required`;
      }

      if (field.type === "date" || field.type === "month")
        rules[field.name].date = true;

      if (field.type === "number") rules[field.name].number = true;
    });

    const errors = validateForm(documentData, rules);

    /* ================= CUSTOM VALIDATIONS ================= */

    selectedDocType.fields.forEach((field) => {
      const value = documentData[field.name];

      // Email validation
      if (field.name === "employeeEmail" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
          errors[field.name] = "Enter a valid email address";
        }
      }

      // Phone validation
      if (field.name === "employeePhone" && value) {
        const phoneRegex = /^91[6-9]\d{9}$/;

        if (!phoneRegex.test(value)) {
          errors[field.name] = "Enter a valid 10 digit mobile number";
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const apiService = new ApiService();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateDocumentForm()) return;

    try {
      const docTypeKey = selectedDocType?.template?.replace(/-/g, "_");

      if (!docTypeKey) {
        throw new Error("Document type key missing");
      }

      const apiUrl = API.generateDoc(docTypeKey);

      // ✅ FINAL CORRECT PAYLOAD
      const payload = {
        company: selectedCompany?.name,
        issuedTo: user?.id,

        title: documentData.mrms,
        employeeName: documentData.employeeName,
        email: documentData.employeeEmail,

        position: documentData.position,
        department: documentData.department || "IT",
        employmentType: documentData.employmentType || "Full-time",

        joiningDate: documentData.joiningDate,
        salary: Number(documentData.salary),

        location: documentData.location || "Pune",

        offerValidTill:
          documentData.offerValidTill || documentData.joiningDate,

        offerType: documentData.offerType,
        issueDate: documentData.issueDate,
      };

      console.log("FINAL PAYLOAD:", JSON.stringify(payload, null, 2));
      console.log("Fields received:", {
        company: payload.company,
        issuedTo: payload.issuedTo,
        title: payload.title,
        employeeName: payload.employeeName,
        email: payload.email,
        position: payload.position,
        department: payload.department,
        employmentType: payload.employmentType,
        joiningDate: payload.joiningDate,
        salary: payload.salary,
        location: payload.location,
        offerValidTill: payload.offerValidTill,
        offerType: payload.offerType,
        issueDate: payload.issueDate,
      });

      const res = await apiService.apipost(apiUrl, payload);

      const documentId = res?.data?._id;

      navigate(`/document/preview`, {
        state: {
          documentData,
          selectedDocType,
          selectedCompany
        }
      });
      
    } catch (error) {
      console.error("❌ FULL ERROR:", error.response?.data || error);
    }
  };

  /* ================= LOADING GUARD ================= */
  if (!companies.length || !documentTypes.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin" />
          <p className="text-sm">Loading document setup...</p>
        </div>
      </div>
    );
  }

  /* ================= RENDER FIELD ================= */
  const renderField = (field) => {
    const hasError = !!formErrors[field.name];
    const isRequired = field.required || field.require;

    if (field.type === "select") {
      return (
        <div key={field.name}>
          <FieldLabel
            label={field.label}
            required={isRequired}
            htmlFor={field.name}
          />
          <SelectWrapper>
            <select
              id={field.name}
              name={field.name}
              value={documentData[field.name] || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className={selectClass(hasError)}
            >
              <option value="" disabled>
                Select {field.label}
              </option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </SelectWrapper>
          {hasError && <FieldError message={formErrors[field.name]} />}
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div
          key={field.name}
          className="col-span-1 md:col-span-2 lg:col-span-3"
        >
          <FieldLabel
            label={field.label}
            required={isRequired}
            htmlFor={field.name}
          />
          <textarea
            id={field.name}
            name={field.name}
            rows={3}
            value={documentData[field.name] ?? ""}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder={
              field.placeholder || `Enter ${field.label.toLowerCase()}`
            }
            className={`${inputClass(hasError)} resize-none`}
          />
          {hasError && <FieldError message={formErrors[field.name]} />}
        </div>
      );
    }

    // text, number, date, month, email
    return (
      <div key={field.name}>
        <FieldLabel
          label={field.label}
          required={isRequired}
          htmlFor={field.name}
        />
        {field.name === "employeePhone" ? (
          <div
            className={`
      flex w-full rounded-lg border overflow-hidden
      ${hasError ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-gray-400"}
      focus-within:ring-2 focus-within:ring-violet-400
    `}
          >
            {/* +91 */}
            <span className="flex items-center px-3 bg-gray-100 text-sm text-gray-600 border-r border-gray-300">
              +91
            </span>

            <input
              id={field.name}
              name={field.name}
              type="tel"
              value={(documentData[field.name] || "").replace(/^91/, "")}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              placeholder="Enter phone number"
              maxLength={10}
              className="w-full px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none"
            />
          </div>
        ) : (
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={documentData[field.name] ?? ""}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder={
              field.placeholder || `Enter ${field.label.toLowerCase()}`
            }
            className={inputClass(hasError)}
          />
        )}

        {hasError && <FieldError message={formErrors[field.name]} />}
      </div>
    );
  };

  /* ================= UI ================= */
  // UserDocumentFormPage (return section) - full replacement

  return (
    <div className="">
      <div className="max-w-6xl ">
        {/* ── HEADER ── */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-700 hover:text-gray-900 transition"
          >
            <IoArrowBack className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            {selectedDocType?.name || "Create Document"}
          </h1>
        </div>

        {/* ── COMPANY DROPDOWN ── */}
        <div className="mb-8">
          <FieldLabel label="Company" required htmlFor="company" />

          <div
            className="flex items-center gap-3"
            style={{ maxWidth: "320px" }}
          >
            {/* Logo */}
            {selectedCompany && (
              <div
                className="w-9 h-9
                            flex items-center justify-center overflow-hidden shrink-0 bg-white"
              >
                {selectedCompany.logo && !logoError ? (
                  <img
                    src={selectedCompany.logo}
                    alt={selectedCompany.name}
                    className="object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="text-sm font-bold text-indigo-700">
                    {selectedCompany.name.charAt(0)}
                  </span>
                )}
              </div>
            )}

            <SelectWrapper>
              <select
                id="company"
                value={selectedCompany?.id || ""}
                onChange={(e) => handleCompanyChange(e.target.value)}
                className={selectClass(false)}
                style={{ width: "280px" }}
              >
                <option value="" disabled>
                  Select Company
                </option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </SelectWrapper>

          </div>
        </div>

        {/* ── VALIDATION BANNER ── */}
        {Object.keys(formErrors).length > 0 && (
          <div
            className="flex items-start gap-2 bg-red-50 border border-red-200
                        text-red-600 rounded-lg px-4 py-3 mb-6 text-sm"
          >
            <BiSolidError className="w-4 h-4 mt-0.5 shrink-0" />
            <span>Please fill in all required fields before previewing.</span>
          </div>
        )}

        {/* ── FORM FIELDS ── */}
        {selectedCompany ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-6">
              {selectedDocType?.fields?.length > 0 ? (
                selectedDocType.fields.map(
                  (field) => shouldShowField(field) && renderField(field)
                )
              ) : (
                <div className="col-span-5 flex items-center justify-center py-10 text-gray-400">
                  <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin mr-2" />
                  <span className="text-sm">Loading fields...</span>
                </div>
              )}
            </div>

            {/* ── ACTIONS ── */}
            <div className="flex items-center gap-4 mt-10">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg
                         bg-gray-200 text-gray-700 text-sm font-medium
                         hover:bg-gray-300 transition"
              >
                <MdOutlinePreview className="w-4 h-4" />
                Preview Document
              </button>

              <button
                type="button"
                onClick={() => navigate(ROUTES.USER_DASHBOARD)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                         border border-gray-300 text-gray-500 text-sm font-medium
                         hover:bg-gray-50 transition"
              >
                <MdOutlineCancel className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <RiBuilding2Line className="w-10 h-10 mb-3" />
            <p className="text-sm font-medium text-gray-400">No company selected</p>
            <p className="text-xs text-gray-300 mt-1">
              Select a company above to fill in the form.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCreate;
