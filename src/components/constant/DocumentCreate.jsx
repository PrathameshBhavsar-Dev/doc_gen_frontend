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
    <MdKeyboardArrowDown
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4"
    />
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

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

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
    updateDocumentData(field, value);
    if (field === "internshipType" && value === "unpaid") {
      updateDocumentData("stipend", "");
    }
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
      if (field.type === "email") rules[field.name].email = true;
      if (field.type === "date" || field.type === "month") rules[field.name].date = true;
      if (field.type === "number") rules[field.name].number = true;
    });

    const errors = validateForm(documentData, rules);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateDocumentForm()) {
      navigate(ROUTES.DOCUMENT_PREVIEW, { state: { fromCreate: true } });
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
          <FieldLabel label={field.label} required={isRequired} htmlFor={field.name} />
          <SelectWrapper>
            <select
              id={field.name}
              name={field.name}
              value={documentData[field.name] || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className={selectClass(hasError)}
            >
              <option value="" disabled>Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </SelectWrapper>
          {hasError && <FieldError message={formErrors[field.name]} />}
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div key={field.name} className="col-span-1 md:col-span-2 lg:col-span-3">
          <FieldLabel label={field.label} required={isRequired} htmlFor={field.name} />
          <textarea
            id={field.name}
            name={field.name}
            rows={3}
            value={documentData[field.name] ?? ""}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            className={`${inputClass(hasError)} resize-none`}
          />
          {hasError && <FieldError message={formErrors[field.name]} />}
        </div>
      );
    }

    // text, number, date, month, email
    return (
      <div key={field.name}>
        <FieldLabel label={field.label} required={isRequired} htmlFor={field.name} />
        <input
          id={field.name}
          name={field.name}
          type={field.type}
          value={documentData[field.name] ?? ""}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
          className={inputClass(hasError)}
        />
        {hasError && <FieldError message={formErrors[field.name]} />}
      </div>
    );
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── HEADER ── */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-gray-500 hover:text-gray-900 transition"
          >
            <IoArrowBack className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            {selectedDocType?.name || "Create Document"}
          </h1>
        </div>

        {/* ── MAIN CARD ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">

          {/* Company Dropdown */}
          <div className="mb-8">
            <FieldLabel label="Company" required htmlFor="company" />
            <SelectWrapper>
              <select
                id="company"
                value={selectedCompany?.id || ""}
                onChange={(e) => handleCompanyChange(e.target.value)}
                className={selectClass(false)}
                style={{ maxWidth: "320px" }}
              >
                <option value="" disabled>Select Company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </SelectWrapper>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-8" />

          {/* Validation Error Banner */}
          {Object.keys(formErrors).length > 0 && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200
                            text-red-600 rounded-lg px-4 py-3 mb-6 text-sm">
              <BiSolidError className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Please fill in all required fields before previewing.</span>
            </div>
          )}

          {/* Form Fields */}
          {selectedCompany ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                {selectedDocType?.fields?.length > 0 ? (
                  selectedDocType.fields.map(
                    (field) => shouldShowField(field) && renderField(field)
                  )
                ) : (
                  <div className="col-span-3 flex items-center justify-center py-10 text-gray-400">
                    <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin mr-2" />
                    <span className="text-sm">Loading fields...</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.USER_DASHBOARD)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                             border border-gray-300 text-gray-600 text-sm font-medium
                             hover:bg-gray-50 transition"
                >
                  <MdOutlineCancel className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                             bg-gray-200 text-gray-700 text-sm font-medium
                             hover:bg-gray-300 transition"
                >
                  <MdOutlinePreview className="w-4 h-4" />
                  Preview Document
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <RiBuilding2Line className="w-10 h-10 mb-3 text-gray-300" />
              <p className="text-sm font-medium text-gray-500">No company selected</p>
              <p className="text-xs text-gray-400 mt-1">
                Select a company above to fill in the form.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentCreate;