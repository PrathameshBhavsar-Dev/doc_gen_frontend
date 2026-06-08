import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { IoArrowBack } from "react-icons/io5";
import { MdOutlinePreview, MdOutlineCancel } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdWarningAmber, MdKeyboardArrowDown } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";

import { useCompany } from "../../core/contexts/CompanyContext";
import { useDocument } from "../../core/contexts/DocumentContext";
import { useAuth } from "../../core/contexts/AuthContext";
import { validateForm } from "../../utils/validationUtils";
import ROUTES from "../../core/constants/routes.constant";
import API from "../../core/constants/serverURL.constant";
import ApiService from "../../core/services/api.service";

const FieldLabel = ({ label, required, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide"
  >
    {label}
    {required && <span className="text-red-500 ml-0.5">*</span>}
  </label>
);

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

const FieldError = ({ message }) => (
  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
    <MdWarningAmber className="w-3.5 h-3.5 shrink-0" />
    {message}
  </p>
);

const SelectWrapper = ({ children }) => (
  <div className="relative">
    {children}
    <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
  </div>
);

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

  // ✅ Define these FIRST before any useEffect
  const editDocument = location.state?.document || null;
  const isEditMode = !!editDocument;

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const navStateApplied = useRef(false);
  const apiService = new ApiService();

  /* ================= PREFILL EDIT DATA ================= */
  useEffect(() => {
    if (!isEditMode) return;
    if (!companies.length || !documentTypes.length) return;
    if (navStateApplied.current) return;

    const doc = editDocument;

    // ✅ Match company by name
    const matchedCompany = companies.find((c) => {
      const docCompany = doc.company?.toLowerCase().trim();
      return (
        c.name.toLowerCase().trim() === docCompany ||
        c.shortName?.toLowerCase().trim() === docCompany ||
        c.name.toLowerCase().includes(docCompany) ||
        docCompany?.includes(c.name.toLowerCase())
      );
    });

    console.log("✅ Matched company:", matchedCompany?.name);
    if (matchedCompany) selectCompany(matchedCompany.id);

    // ✅ Normalize PascalCase documentType → snake_case
    const normalizedDocType = doc.documentType
      ?.replace(/([a-z])([A-Z])/g, "$1_$2")
      ?.replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
      ?.replace(/[\s\-]+/g, "_")
      ?.toLowerCase();

    console.log("🔑 normalizedDocType:", normalizedDocType);

    const matchedDocType = documentTypes.find((d) => {
      const t = d.template?.toLowerCase().replace(/-/g, "_");
      return t === normalizedDocType;
    });

    console.log("✅ matchedDocType:", matchedDocType?.name);
    if (matchedDocType) selectDocumentType(matchedDocType.id);

    // ✅ Prefill all form fields
    const fieldsToFill = {
      mrms: doc.title,
      employeeName: doc.employeeName,
      employeeId: doc.employeeId,
      employeeEmail: doc.employeeEmail,
      employeeNumber: doc.employeeNumber,
      employeePhone: doc.employeePhone,
      position: doc.position,
      department: doc.department,
      employmentType: doc.employmentType,
      joiningDate: doc.joiningDate?.split("T")[0],
      salary: doc.salary,
      location: doc.location,
      offerValidTill: doc.offerValidTill?.split("T")[0],
      offerType: doc.offerType,
      appointmentType: doc.appointmentType,
      incrementType: doc.incrementType,
      confirmationType: doc.confirmationType,
      salaryType: doc.salaryType,
      finalType: doc.finalType,
      internshipType: doc.internshipType,
      issueDate: doc.issueDate?.split("T")[0],
      designation: doc.designation,
      lastWorkingDay: doc.lastWorkingDay?.split("T")[0],
      relievingDate: doc.relievingDate?.split("T")[0],
      effectiveDate: doc.effectiveDate?.split("T")[0],
      newCTC: doc.newCTC,
      probationPeriod: doc.probationPeriod,
      workLocation: doc.workLocation,
      workHours: doc.workHours,
      reportingManager: doc.reportingManager,
      noticePeriod: doc.noticePeriod,
      handoverStatus: doc.handoverStatus,
      conduct: doc.conduct,
      startDate: doc.startDate?.split("T")[0],
      endDate: doc.endDate?.split("T")[0],
      stipend: doc.stipend,
      totalSalary: doc.totalSalary,
      address: doc.address,
      doj: doc.doj?.split("T")[0],
      dateofresignation: doc.dateofresignation?.split("T")[0],
      dateofleaving: doc.dateofleaving?.split("T")[0],
      leaveencashment: doc.leaveencashment,
      paiddays: doc.paiddays,
      workdays: doc.workdays,
      month: doc.month,
      offerDate: doc.offerDate?.split("T")[0],
    };

    Object.entries(fieldsToFill).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        updateDocumentData(key, String(value));
      }
    });

    navStateApplied.current = true;
  }, [companies.length, documentTypes.length]);

  /* ================= READ NAV STATE (create mode) ================= */
  useEffect(() => {
    if (isEditMode) return; // ✅ skip for edit mode
    if (navStateApplied.current) return;
    if (!location.state) return;
    if (!companies.length || !documentTypes.length) return;

    const { companyId, documentType } = location.state;
    if (companyId) selectCompany(Number(companyId));
    if (documentType) selectDocumentType(Number(documentType));

    navStateApplied.current = true;
  }, [companies.length, documentTypes.length]);

  /* ================= SAFE REDIRECT (create mode only) ================= */
  useEffect(() => {
    if (isEditMode) return; // ✅ skip redirect in edit mode
    if (location.state) return;
    if (!companies.length || !documentTypes.length) return;
    if (!selectedCompany || !selectedDocType) {
      navigate(ROUTES.USER_DASHBOARD, { replace: true });
    }
  }, [selectedCompany, selectedDocType]);

  /* ================= COMPANY CHANGE ================= */
  const handleCompanyChange = (companyId) => {
    setLogoError(false);
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
    if (field === "employeePhone") {
      value = value.replace(/\D/g, "").slice(0, 10);
      updateDocumentData(field, value ? `91${value}` : "");
      return;
    }
    if (field === "employeeEmail") value = value.trim();

    updateDocumentData(field, value);

    if (field === "internshipType" && value === "unpaid") {
      updateDocumentData("stipend", "");
    }

    if (formErrors[field]) {
      setFormErrors((prev) => {
        const c = { ...prev };
        delete c[field];
        return c;
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
      if (field.required === true || field.require === true) {
        rules[field.name].required = true;
        rules[field.name].message = `${field.label} is required`;
      }
      if (field.type === "date" || field.type === "month")
        rules[field.name].date = true;
      if (field.type === "number") rules[field.name].number = true;
    });

    const errors = validateForm(documentData, rules);

    selectedDocType.fields.forEach((field) => {
      const value = documentData[field.name];
      if (field.name === "employeeEmail" && value) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          errors[field.name] = "Enter a valid email address";
      }
      if (field.name === "employeePhone" && value) {
        if (!/^91[6-9]\d{9}$/.test(value))
          errors[field.name] = "Enter a valid 10 digit mobile number";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateDocumentForm()) return;

    const docTypeKey = selectedDocType?.template?.replace(/-/g, "_");
    if (!docTypeKey) {
      console.error("Document type key missing");
      return;
    }

    if (isEditMode) {
      // ✅ UPDATE mode
      setIsSubmitting(true);
      try {
        const updateUrl = API.updateDoc(docTypeKey, editDocument._id);

        const payload = {
          company: selectedCompany?.name,
          issuedTo: user?.id,
          title: documentData.mrms,
          employeeName: documentData.employeeName,
          employeeId: documentData.employeeId,
          employeeEmail: documentData.employeeEmail,
          employeeNumber: documentData.employeeNumber,
          employeePhone: documentData.employeePhone,
          position: documentData.position,
          department: documentData.department,
          employmentType: documentData.employmentType,
          joiningDate: documentData.joiningDate,
          salary: documentData.salary ? Number(documentData.salary) : undefined,
          location: documentData.location,
          offerValidTill: documentData.offerValidTill,
          offerType: documentData.offerType,
          appointmentType: documentData.appointmentType,
          incrementType: documentData.incrementType,
          confirmationType: documentData.confirmationType,
          salaryType: documentData.salaryType,
          finalType: documentData.finalType,
          internshipType: documentData.internshipType,
          issueDate: documentData.issueDate,
          designation: documentData.designation,
          lastWorkingDay: documentData.lastWorkingDay,
          relievingDate: documentData.relievingDate,
          effectiveDate: documentData.effectiveDate,
          newCTC: documentData.newCTC ? Number(documentData.newCTC) : undefined,
          probationPeriod: documentData.probationPeriod,
          workLocation: documentData.workLocation,
          workHours: documentData.workHours,
          reportingManager: documentData.reportingManager,
          noticePeriod: documentData.noticePeriod,
          handoverStatus: documentData.handoverStatus,
          conduct: documentData.conduct,
          startDate: documentData.startDate,
          endDate: documentData.endDate,
          stipend: documentData.stipend,
          totalSalary: documentData.totalSalary
            ? Number(documentData.totalSalary)
            : undefined,
          address: documentData.address,
          doj: documentData.doj,
          dateofresignation: documentData.dateofresignation,
          dateofleaving: documentData.dateofleaving,
          leaveencashment: documentData.leaveencashment,
          paiddays: documentData.paiddays,
          workdays: documentData.workdays,
          month: documentData.month,
          offerDate: documentData.offerDate,
        };

        // ✅ Remove empty/undefined fields
        const cleanPayload = Object.fromEntries(
          Object.entries(payload).filter(
            ([_, v]) => v !== undefined && v !== null && v !== "",
          ),
        );

        console.log("✅ UPDATE PAYLOAD:", cleanPayload);
        await apiService.apiput(updateUrl, cleanPayload);

        alert("Document updated successfully!");
        navigate(-1);
      } catch (error) {
        console.error("❌ Update failed:", error.response?.data || error);
        alert("Failed to update document. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // ✅ CREATE mode — go to preview
      if (!selectedDocType) {
        alert("Please select document type");
        return;
      }

      navigate(`/document/preview`, {
        state: {
          previewData: documentData,
          selectedDocs: [
            {
              id: selectedDocType.id,
              name: selectedDocType.name,
              template: selectedDocType.template,
            },
          ],
          previewCompany: selectedCompany,
        },
      });
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

    return (
      <div key={field.name}>
        <FieldLabel
          label={field.label}
          required={isRequired}
          htmlFor={field.name}
        />
        {field.name === "employeePhone" ? (
          <div
            className={`flex w-full rounded-lg border overflow-hidden
            ${hasError ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-gray-400"}
            focus-within:ring-2 focus-within:ring-violet-400`}
          >
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
  return (
    <div className="">
      <div className="max-w-6xl">
        {/* ── HEADER ── */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-700 hover:text-gray-900 transition"
          >
            <IoArrowBack className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            {isEditMode
              ? `Edit ${editDocument?.documentType || "Document"}`
              : selectedDocType?.name || "Create Document"}
          </h1>
          {/* ✅ Edit mode badge */}
          {isEditMode && (
            <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
              Editing
            </span>
          )}
        </div>

        {/* ── COMPANY DROPDOWN ── */}
        <div className="mb-8">
          <FieldLabel label="Company" required htmlFor="company" />
          <div
            className="flex items-center gap-3"
            style={{ maxWidth: "320px" }}
          >
            {selectedCompany && (
              <div className="w-9 h-9 flex items-center justify-center overflow-hidden shrink-0 bg-white">
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
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-6 text-sm">
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
                  (field) => shouldShowField(field) && renderField(field),
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
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg
                         bg-gray-200 text-gray-700 text-sm font-medium
                         hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
                ) : (
                  <MdOutlinePreview className="w-4 h-4" />
                )}
                {isEditMode
                  ? isSubmitting
                    ? "Updating..."
                    : "Update Document"
                  : "Preview Document"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                         border border-gray-300 text-gray-500 text-sm font-medium hover:bg-gray-50 transition"
              >
                <MdOutlineCancel className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <RiBuilding2Line className="w-10 h-10 mb-3" />
            <p className="text-sm font-medium text-gray-400">
              No company selected
            </p>
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
