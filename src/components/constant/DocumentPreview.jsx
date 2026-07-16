import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Snackbar, Alert } from "@mui/material";
import {
  Download,
  Edit,
  ArrowBack,
  Description,
  ContentCopy,
} from "@mui/icons-material";
import { useAuth } from "../../core/contexts/AuthContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { generatePDF } from "../../utils/pdfUtils";
import ROUTES from "../../core/constants/routes.constant";
import ApiService from "../../core/services/api.service";
import API from "../../core/constants/serverURL.constant";
import {
  buildPayload,
  normalizeTemplateKey,
} from "../../utils/documentPayloadBuilder";
import { FiFileText } from "react-icons/fi";
// Templates
import ExperienceLetterTemplate from "../documents/ExperienceLetter/ExperienceLetterTemplate";
import RelievingLetterTemplate from "../documents/RelievingLetter/RelievingLetteTemplate";
import InternshipLetterTemplate from "../documents/InternshipLetter/InternshipLetterTemplate";
import CertificationLetterTemplate from "../documents/InternshipComplitionCertificate/CertificationLetterTemplate";
import SalarySlipLetterTemplate from "../documents/SalarySlip/SalarySlipTemplate";
import IncrementTemplate from "../documents/IncrementLetter/IncrementTemplate";
import OfferTemplate from "../documents/OfferLetter/OfferLetterTemplate";
import AppointmentLetterTemplate from "../documents/AppointmentLeter/AppointmentLetterTemplate";
import ConfirmationLetterTemplate from "../documents/ConfirmationLetter/ConfirmationLetterTemplate";
import FullandfinalLetterTemplate from "../documents/FullAndFinalLetter/FullandFinalLetterTemplate";

/* ─── CSS string (defined outside component so it never changes reference) ─── */
const DP_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Sora:wght@400;500;600;700&display=swap');

  :root {
    --p900: #1A0533; --p800: #2D0A5C; --p700: #3D1278;
    --p600: #5B21B6; --p500: #7C3AED; --p400: #8B5CF6;
    --p300: #A78BFA; --p200: #C4B5FD; --p100: #EDE9FE; --p50: #F5F3FF;
    --white: #FFFFFF; --text: #1A0533; --text2: #6B5E8A;
    --border: rgba(124,58,237,0.14);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .dp-root {
    min-height: 100vh;
    background: #F5F3FF;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }
  .dp-root::before {
    content: '';
    position: fixed; top: -180px; left: -100px;
    width: 520px; height: 520px;
    background: radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 68%);
    pointer-events: none; z-index: 0;
  }
  .dp-root::after {
    content: '';
    position: fixed; bottom: -120px; right: -80px;
    width: 440px; height: 440px;
    background: radial-gradient(circle, rgba(61,18,120,0.09) 0%, transparent 68%);
    pointer-events: none; z-index: 0;
  }

  /* ── Topbar ── */
  .dp-topbar {
    position: sticky; top: 0; z-index: 100;
    height: 62px;
    background: rgba(26,5,51,0.96);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(167,139,250,0.14);
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 0 28px; gap: 16px;
  }
  .dp-topbar::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg,
      transparent 0%, rgba(139,92,246,0.7) 25%,
      rgba(196,181,253,1) 50%, rgba(139,92,246,0.7) 75%, transparent 100%);
    background-size: 200% 100%;
    animation: tb-shimmer 3.5s linear infinite;
  }
  @keyframes tb-shimmer {
    from { background-position: -200% 0; }
    to   { background-position:  200% 0; }
  }

  .dp-topbar-left  { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
  .dp-topbar-right { display: flex; align-items: center; gap: 8px;  flex-shrink: 0; }

  .dp-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
  .dp-logo-mark {
    width: 30px; height: 30px;
    background: linear-gradient(135deg, var(--p400), var(--p700));
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-weight: 700; font-size: 13px; color: #fff;
  }
  .dp-logo-name {
    font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.88); letter-spacing: 0.01em;
  }
  .dp-vdivider { width: 1px; height: 22px; background: rgba(167,139,250,0.2); flex-shrink: 0; }

  .dp-crumb {
    display: flex; align-items: center; gap: 7px;
    background: rgba(124,58,237,0.14);
    border: 1px solid rgba(139,92,246,0.28);
    border-radius: 20px; padding: 4px 14px 4px 7px; min-width: 0;
  }
  .dp-crumb-icon {
    width: 20px; height: 20px;
    background: linear-gradient(135deg, var(--p400), var(--p600));
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .dp-crumb-text {
    font-size: 12px; font-weight: 500; color: var(--p200);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* ── Buttons ── */
  .dp-btn {
    display: inline-flex; align-items: center; gap: 6px;
    border-radius: 8px; padding: 7px 16px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.18s; border: none; outline: none;
  }
  .dp-btn:disabled { opacity: 0.42; cursor: not-allowed !important; transform: none !important; }

  .dp-btn-ghost {
    background: transparent;
    border: 1px solid rgba(167,139,250,0.28);
    color: rgba(255,255,255,0.62);
  }
  .dp-btn-ghost:hover:not(:disabled) {
    background: rgba(124,58,237,0.14); color: #fff;
    border-color: rgba(167,139,250,0.5);
  }

  .dp-btn-sec {
    background: rgba(124,58,237,0.16);
    border: 1px solid rgba(139,92,246,0.3);
    color: var(--p200);
  }
  .dp-btn-sec:hover:not(:disabled) { background: rgba(124,58,237,0.28); color: #fff; }

  .dp-btn-pri {
    background: linear-gradient(135deg, var(--p500) 0%, var(--p700) 100%);
    color: #fff;
    box-shadow: 0 2px 14px rgba(124,58,237,0.38);
  }
  .dp-btn-pri:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(124,58,237,0.52);
    background: linear-gradient(135deg, var(--p400) 0%, var(--p600) 100%);
  }

  /* ── Layout ── */
  .dp-layout {
    display: flex; gap: 22px;
    max-width: 1300px; margin: 0 auto;
    padding: 28px 28px 80px;
    position: relative; z-index: 1;
  }

  /* ── Sidebar ── */
  .dp-sidebar {
    width: 224px;
    flex-shrink: 0;

    display: flex;
    flex-direction: column;
    gap: 10px;

    position: sticky;
    top: 90px;               /* below your 62px topbar */
    align-self: flex-start;
    overflow-y: hidden;
  }

  .dp-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 14px; padding: 16px;
    box-shadow: 0 1px 4px rgba(124,58,237,0.05);
    transition: box-shadow 0.2s;
  }
  .dp-card:hover { box-shadow: 0 4px 18px rgba(124,58,237,0.1); }

  .dp-card-label {
    font-size: 9.5px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--p400); margin-bottom: 9px;
  }
  .dp-card-val  { font-size: 13px; font-weight: 500; color: var(--text); line-height: 1.45; }
  .dp-card-sub  { font-size: 11.5px; color: var(--text2); margin-top: 3px; }

  .dp-status-pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: linear-gradient(135deg, rgba(124,58,237,0.08), rgba(91,33,182,0.05));
    border: 1px solid rgba(124,58,237,0.2);
    border-radius: 20px; padding: 5px 12px;
    font-size: 11.5px; font-weight: 600; color: var(--p600);
  }
  .dp-status-dot {
    width: 6px; height: 6px;
    background: var(--p500); border-radius: 50%;
    animation: dp-pulse 2s ease-in-out infinite;
  }
  @keyframes dp-pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:.4; transform:scale(.8); }
  }

  .dp-zoom-row { display: flex; align-items: center; gap: 6px; }
  .dp-zoom-btn {
    width: 28px; height: 28px; border-radius: 7px;
    background: var(--p100); border: 1px solid rgba(124,58,237,0.18);
    color: var(--p600); font-size: 16px; line-height: 1;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: background 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .dp-zoom-btn:hover { background: var(--p200); }
  .dp-zoom-val {
    flex: 1; text-align: center;
    font-size: 12px; font-weight: 600; color: var(--p600);
    font-family: 'Sora', sans-serif;
  }

  .dp-qa-btn {
    width: 100%; display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: 9px;
    background: transparent; border: 1px solid var(--border);
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-size: 12.5px; font-weight: 500; color: var(--text2);
    transition: all 0.17s; margin-bottom: 6px;
  }
  .dp-qa-btn:last-child { margin-bottom: 0; }
  .dp-qa-btn:hover:not(:disabled) {
    background: var(--p100); border-color: rgba(124,58,237,0.28); color: var(--p700);
  }
  .dp-qa-btn:disabled { opacity: 0.42; cursor: not-allowed; }
  .dp-qa-icon {
    width: 26px; height: 26px;
    background: linear-gradient(135deg, var(--p500), var(--p700));
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }

  /* ── Stage ── */
  .dp-stage { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; }

  .dp-stage-header {
    width: 100%; display: flex; align-items: center;
    justify-content: space-between; margin-bottom: 20px;
  }
  .dp-stage-title {
    font-family: 'Sora', sans-serif; font-size: 18px;
    font-weight: 600; color: var(--text);
  }
  .dp-stage-meta { font-size: 12px; color: var(--text2); display: flex; align-items: center; gap: 7px; }
  .dp-meta-sep  { width: 4px; height: 4px; background: var(--p300); border-radius: 50%; }

  .dp-page-wrap {
    transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
    transform-origin: top center;
  }

  .dp-a4 {
    width: 210mm; min-height: 297mm;
    background: #fff; border-radius: 3px; overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(124,58,237,0.08),
      0 4px 16px rgba(124,58,237,0.10),
      0 20px 48px rgba(0,0,0,0.12),
      0 48px 96px rgba(0,0,0,0.06);
  }

  .dp-page-ind { margin-top: 16px; display: flex; align-items: center; gap: 8px; }
  .dp-page-ind-text { font-size: 11px; color: var(--text2); font-weight: 500; }
  .dp-pip { width: 5px; height: 5px; border-radius: 50%; background: #C4B5FD; transition: all 0.2s; }
  .dp-pip.active { width: 16px; border-radius: 3px; background: var(--p500); }

  /* ── Error ── */
  .dp-error {
    margin: 12px 28px 0;
    background: #FEF2F2; border: 1px solid #FECACA;
    border-radius: 10px; padding: 10px 16px;
    font-size: 13px; color: #B91C1C;
    display: flex; align-items: center; gap: 8px;
    position: relative; z-index: 1;
  }

  /* ── Overlay ── */
  .dp-overlay {
    position: fixed; inset: 0;
    background: rgba(26,5,51,0.72);
    backdrop-filter: blur(7px);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999;
  }
  .dp-overlay-card {
    background: var(--white); border-radius: 18px;
    padding: 38px 48px;
    display: flex; flex-direction: column; align-items: center; gap: 16px;
    box-shadow: 0 28px 80px rgba(124,58,237,0.28);
    border: 1px solid var(--border);
  }
  .dp-overlay-ring {
    width: 46px; height: 46px; border-radius: 50%;
    border: 3px solid var(--p100); border-top-color: var(--p500);
    animation: dp-spin 0.72s linear infinite;
  }
  @keyframes dp-spin { to { transform: rotate(360deg); } }
  .dp-overlay-title {
    font-family: 'Sora', sans-serif; font-size: 15px;
    font-weight: 600; color: var(--text);
  }
  .dp-overlay-sub { font-size: 12px; color: var(--text2); }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .dp-layout { flex-direction: column; padding: 20px 14px 60px; }
    .dp-sidebar { width: 100%; flex-direction: row; flex-wrap: wrap; gap: 8px; }
    .dp-card    { flex: 1; min-width: 130px; }
    .dp-topbar  { padding: 0 14px; }
    .dp-a4      { width: 100%; min-height: unset; }
    .dp-logo-name { display: none; }
  }
`;

/* ─── Doc label map ─── */
const DOC_LABELS = {
  salaryslip_letter: "Salary Slip",
  internshipcertificate_letter: "Internship Certificate",
  offer_letter: "Offer Letter",
  completion_certificate: "Completion Certificate",
  increment_letter: "Increment Letter",
  appointment_letter: "Appointment Letter",
  experience_letter: "Experience Letter",
  relieving_letter: "Relieving Letter",
  fullandfinal_letter: "Full & Final Letter",
  confirmation_letter: "Confirmation Letter",
};

// ✅ Add this helper in DocumentPreview.jsx
const formatTitle = (title) => {
  const displayMap = {
    MR: "Mr.",
    MRS: "Mrs.",
    MISS: "Miss.",
    MX: "Mx.",
    Mr: "Mr.",
    Mrs: "Mrs.",
    Miss: "Miss.",
    Mx: "Mx.",
  };
  return displayMap[title] || title || "";
};

/* ═══════════════════════════════════════════════════════════ */
const DocumentPreview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state || {};
  const flowType = state.flowType || "DIRECT"; // default fallback

  const handleEdit = () => {
    if (!previewData) return;

    if (flowType === "PROFILE") {
      navigate(ROUTES.USER_FORM, {
        state: {
          employeeData: previewData,       // ✅ was: document (wrong key)
          isEditMode: true,                // ✅ was: isEdit (wrong key)
          userId: previewData?.employeeId, // ✅ was: missing entirely
          selectedDocs: selectedDocs,      // ✅ was: missing entirely
        },
      });
    } else {
      // ✅ DIRECT flow — completely unchanged
      navigate("/user/form", {
        state: {
          document: previewData,
          flowType: "DIRECT",
          isEdit: true,
        },
      });
    }
  };

  const previewData = state.previewData;
  const selectedDocsRaw = state.selectedDocs;

  const selectedDocs = Array.isArray(selectedDocsRaw)
    ? selectedDocsRaw
    : selectedDocsRaw
      ? [selectedDocsRaw]
      : [];
  const previewCompany = state.previewCompany;
  const salarySlipMonths = state.salarySlipMonths || [];

  const [activeDocId, setActiveDocId] = useState(null);
  const previewDocType =
    selectedDocs.length > 0
      ? selectedDocs.find((d) => d?.id === activeDocId) || selectedDocs[0]
      : null;
  const documentRef = useRef(null);
  const apiService = new ApiService();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSev, setSnackSev] = useState("success");
  const [zoom, setZoom] = useState(100);

  const getGenderFromTitle = (title) => {
    switch (title?.trim()) {
      case "Mr":
      case "Mr.":
        return "Male";

      case "Mrs":
      case "Mrs.":
      case "Miss":
      case "Miss.":
        return "Female";

      case "Mx":
      case "Mx.":
        return "Other";

      default:
        return "Other";
    }
  };

  const generateSalarySlipDocs = (formData, months) => {
    if (!months || months.length === 0) return [];

    return months.map((month) => ({
      ...formData,

      month: month.value,
      workdays: formData.salaryWorkdays?.[month.value] || 0,

      // ✅ FIX ALL MISSING FIELDS
      salaryType:
        formData.salaryType ||
        formData.offerType ||
        formData.pfType ||
        "withPF",
      doj: formData.joiningDate,
      gender: getGenderFromTitle(formData.mrms),
      totalSalary:
        formData.totalSalary ?? formData.newCTC ?? formData.salary ?? 0,
      mode: formData.bankName,
    }));
  };
  const key =
    normalizeTemplateKey(previewDocType?.template) ||
    normalizeTemplateKey(
      previewDocType?.name
        ?.toLowerCase()
        .replace(/&/g, "and")
        .replace(/\s+/g, "_"),
    );

  if (!key) {
    console.error("Invalid doc type:", previewDocType);
    return null; // don't crash UI
  }

  // ALWAYS rebuild fresh data
  const baseData = Array.isArray(previewData)
    ? previewData[0]?.data || {}
    : previewData;

  console.log("REACHED BASE DATA SECTION");
  let freshData = { ...baseData };



  freshData.panNo = freshData.panNo || freshData.pan;
  freshData.dateOfBirth = freshData.dateOfBirth || freshData.dob;

  freshData.pan = freshData.pan || freshData.panNo;

  freshData.dob = freshData.dob || freshData.dateOfBirth;

  // ✅ FORCE CTC FIX (CRITICAL)
  // ✅ DO NOT OVERRIDE MONTHLY SALARY
  if (freshData.totalSalary == null) {
    freshData.totalSalary = 0;
  }

  // ✅ Annual salary should remain untouched for
  // offer / appointment / confirmation / increment

  // ✅ Annual docs
  if (
    key === "offer_letter" ||
    key === "appointment_letter" ||
    key === "confirmation_letter"
  ) {
    freshData.salary = Number(freshData.annualCTC || freshData.salary || 0);

    // VERY IMPORTANT
    freshData.newCTC = Number(
      freshData.annualCTC || freshData.newCTC || freshData.salary || 0,
    );

    freshData.totalSalary = Number(
      freshData.annualCTC || freshData.salary || 0,
    );
  }

  // ✅ Increment uses newCTC
  if (key === "increment_letter") {
    freshData.newCTC = Number(
      freshData.annualCTC || freshData.newCTC || freshData.salary || freshData.currentCTC || 0,
    );
  }

  // ✅ Monthly docs only
  // ✅ Monthly docs only
  if (key === "salaryslip_letter") {
    freshData.totalSalary = Number(
      freshData.monthlyCTC || freshData.totalSalary || 0,
    );
  }

  if (key === "fullandfinal_letter") {
    const yearlySalary = Number(freshData.salary || freshData.annualCTC || 0);
    const monthlySalary = Math.round(yearlySalary / 12);
    freshData.totalSalary = Number(
      freshData.monthlyCTC || monthlySalary || freshData.totalSalary || 0
    );
  }

  if (key === "internshipcertificate_letter") {
    freshData.stipend = Number(freshData.stipend || freshData.monthlyCTC || 0);
  }

  // ✅ CRITICAL FIX: flatten nested doc data
  Object.keys(baseData).forEach((key) => {
    if (
      typeof baseData[key] === "object" &&
      baseData[key] !== null &&
      !Array.isArray(baseData[key])
    ) {
      Object.entries(baseData[key]).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") {
          if (!freshData[k]) {
            freshData[k] = v; // don't overwrite valid top-level values
          }
        }
      });
    }
  });
  // ✅ FIX required fields
  freshData.employeeId = freshData.employeeId || freshData.employeeNumber;

  freshData.issuedTo =
    freshData.employeeId || freshData.employeeNumber || freshData.employeeEmail;

  freshData.issuedBy = user?._id;
  freshData.title = formatTitle(freshData.mrms || freshData.title || freshData.identity);

  const docKeyName = normalizeTemplateKey(previewDocType?.template);

  const docIssueDate =
    freshData[`${docKeyName}_issueDate`] || freshData.issueDate;

  freshData.issueDate = docIssueDate || new Date().toISOString();

  freshData.totalSalary = Number(freshData.totalSalary || 0);
  freshData.newCTC = Number(freshData.newCTC || 0);
  freshData.salary = Number(freshData.salary || 0);
  // ✅ build payload
  let payload = buildPayload(key, freshData, user, previewCompany);

  // 🚨 FINAL GUARANTEE (MOST IMPORTANT LINE)
  payload.issuedTo = freshData.issuedTo;

  const isSalarySlip = key === "salaryslip_letter";

  let salarySlipDocs = [previewData];

  if (isSalarySlip) {
    if (salarySlipMonths.length > 0) {
      salarySlipDocs = generateSalarySlipDocs(previewData, salarySlipMonths);
    } else {
      salarySlipDocs = [previewData];
    }
  }

  useEffect(() => {
    if (!previewData || !user || !previewCompany) return;

    const baseData = Array.isArray(previewData)
      ? previewData[0]?.data || {}
      : previewData;

    let cleanedData = { ...baseData };

    // ✅ REQUIRED FIELD FIXES (CRITICAL)
    cleanedData.title = cleanedData.mrms; // 👈 required enum
    cleanedData.issuedTo =
      cleanedData.employeeId ||
      cleanedData.employeeNumber ||
      cleanedData.employeeEmail; // fallback
    //     cleanedData.issuedBy = user?._id; // 👈 REQUIRED

    // ✅ ensure issueDate
    if (!cleanedData.issueDate) {
      cleanedData.issueDate = new Date().toISOString();
    }

    // ✅ salary cleanup
    if (key !== "salaryslip_letter" && key !== "fullandfinal_letter") {
      delete cleanedData.totalSalary;
      delete cleanedData.salaryType;
      delete cleanedData.salarySlipMonths;
      delete cleanedData.salaryWorkdays;
    }

    // ✅ OPTIONAL FIELD MAPPING
    cleanedData.position =
      cleanedData.position ||
      cleanedData.designation ||
      cleanedData.joiningDesignation;

    // ✅ JOINING DATE NORMALIZATION
    cleanedData.doj =
      cleanedData.doj || cleanedData.joiningDate || cleanedData.dateOfJoining;

    cleanedData.joiningDate =
      cleanedData.joiningDate || cleanedData.doj || cleanedData.dateOfJoining;

    cleanedData.dateOfJoining =
      cleanedData.dateOfJoining || cleanedData.joiningDate || cleanedData.doj;

    // ✅ FINAL PAYLOAD
    let payload = null;

    if (key) {
      payload = buildPayload(key, cleanedData, user, previewCompany);
    }
    // console.log("🔥 FINAL PAYLOAD:", payload);
    // console.log(payload);
  }, [previewData, user, previewCompany, key]);

  useEffect(() => {
    if (selectedDocs.length > 0 && selectedDocs[0]?.id) {
      setActiveDocId(selectedDocs[0].id);
    }
  }, [selectedDocs]);

  /* ── ALWAYS inject/re-inject styles on every mount ── */
  useEffect(() => {
    // Remove any stale tag first, then re-add fresh
    const existing = document.getElementById("dp-v2-styles");
    if (existing) existing.remove();

    const styleTag = document.createElement("style");
    styleTag.id = "dp-v2-styles";
    styleTag.textContent = DP_STYLES;
    document.head.appendChild(styleTag);

    // Cleanup: remove when this component unmounts
    return () => {
      const tag = document.getElementById("dp-v2-styles");
      if (tag) tag.remove();
    };
  }, []); // runs on mount, cleans up on unmount

  const isNavigatingAway = useRef(false); // ✅ add this near top

  /* ── Auth guard ── */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!previewCompany || !previewDocType || !previewData)
      navigate(ROUTES.USER_DASHBOARD);
  }, [user, previewCompany, previewDocType, previewData, navigate]);

  /* ── Template renderer ── */
  const renderTemplate = () => {
    // ✅ ALWAYS MAKE IT ARRAY
    const docsArray =
      key === "salaryslip_letter"
        ? salarySlipDocs.map((doc) => ({
          docKey: "salaryslip_letter",
          data: doc,
        }))
        : Array.isArray(previewData)
          ? previewData
          : [{ docKey: previewDocType?.template, data: previewData }];

    return docsArray.map((doc, index) => {
      const p = {
        data: doc.docKey === "salaryslip_letter" ? doc.data : freshData,
        company: previewCompany,
      };
      const map = {
        salaryslip_letter: <SalarySlipLetterTemplate {...p} />,
        internshipcertificate_letter: <InternshipLetterTemplate {...p} />,
        offer_letter: <OfferTemplate {...p} />,
        completion_certificate: <CertificationLetterTemplate {...p} />,
        increment_letter: <IncrementTemplate {...p} />,
        appointment_letter: <AppointmentLetterTemplate {...p} />,
        experience_letter: <ExperienceLetterTemplate {...p} />,
        relieving_letter: <RelievingLetterTemplate {...p} />,
        fullandfinal_letter: <FullandfinalLetterTemplate {...p} />,
        confirmation_letter: <ConfirmationLetterTemplate {...p} />,
      };

      return (
        <div key={index}>
          {map[doc.docKey] || <div>Template not found</div>}
        </div>
      );
    });
  };

  const toast = (msg, sev = "success") => {
    setSnackMsg(msg);
    setSnackSev(sev);
    setSnackOpen(true);
  };

  // ✅ PF NORMALIZATION
  const normalizePfType = (value) => {
    if (!value) return "";

    const normalized = value.toString().toLowerCase();

    if (normalized === "with_pf" || normalized === "withpf") {
      return "withPF";
    }

    if (normalized === "without_pf" || normalized === "withoutpf") {
      return "withoutPF";
    }

    return value;
  };

  freshData.offerType = normalizePfType(freshData.offerType);

  freshData.incrementType = normalizePfType(
    freshData.incrementType || freshData.offerType,
  );

  freshData.appointmentType = normalizePfType(
    freshData.appointmentType || freshData.offerType,
  );

  freshData.salaryType = normalizePfType(
    freshData.salaryType || freshData.offerType,
  );

  freshData.pfType = normalizePfType(freshData.pfType || freshData.offerType);

  const handleDownloadPDF = async () => {
    setLoading(true);
    setLoadingLabel("Saving & generating PDF…");
    setError("");

    try {
      // =========================
      // NORMALIZE TEMPLATE KEY
      // =========================
      const key = normalizeTemplateKey(previewDocType?.template);

      if (!key) {
        throw new Error("Missing document template key");
      }

      // =========================
      // BASE DATA
      // =========================
      const baseData = Array.isArray(previewData)
        ? previewData[0]?.data || {}
        : previewData || {};

      // =========================
      // FLATTEN DOCUMENT DATA
      // =========================
      let freshData = { ...baseData };

      Object.keys(baseData).forEach((parentKey) => {
        if (
          typeof baseData[parentKey] === "object" &&
          baseData[parentKey] !== null &&
          !Array.isArray(baseData[parentKey])
        ) {
          Object.entries(baseData[parentKey]).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== "") {
              freshData[k] = v;
            }
          });
        }
      });

      // =========================
      // PF NORMALIZATION
      // =========================
      const normalizePfType = (value) => {
        if (!value) return "";
        const normalized = value.toString().trim().toLowerCase();
        if (normalized === "with_pf" || normalized === "withpf") return "withPF";
        if (normalized === "without_pf" || normalized === "withoutpf") return "withoutPF";
        return value;
      };

      // ✅ GENDER fix - derive from mrms/title
      const getGenderFromTitle = (title) => {
        const t = title?.toLowerCase()?.replace(".", "");
        if (t === "mr") return "Male";
        if (t === "mrs" || t === "miss") return "Female";
        if (t === "mx") return "Other";
        return "";
      };

      freshData.gender =
        freshData.gender ||
        getGenderFromTitle(freshData.mrms || freshData.title || freshData.identity) ||
        "";

      // ✅ MODE fix - bank name
      freshData.mode =
        freshData.mode ||
        freshData.bankName ||
        "";

      freshData.offerType = normalizePfType(freshData.offerType || freshData.pfType);
      freshData.incrementType = normalizePfType(freshData.incrementType || freshData.offerType);
      freshData.salaryType = normalizePfType(freshData.salaryType || freshData.offerType);
      freshData.appointmentType = normalizePfType(freshData.appointmentType || freshData.offerType);
      freshData.pfType = normalizePfType(freshData.pfType || freshData.offerType);

      // =========================
      // REQUIRED FIELD FIXES
      // =========================
      freshData.employeeId =
        freshData.employeeId ||
        freshData.employeeNumber ||
        freshData.employeeEmail ||
        "EMP001";

      freshData.issuedTo = freshData.employeeId;
      freshData.issuedBy = user?._id || "SYSTEM";

      // =========================
      // TITLE WITH DOT
      // =========================
      const formatTitle = (title) => {
        const displayMap = {
          MR: "Mr.", MRS: "Mrs.", MISS: "Miss.", MX: "Mx.",
          Mr: "Mr.", Mrs: "Mrs.", Miss: "Miss.", Mx: "Mx.",
        };
        return displayMap[title] || title || "";
      };
      freshData.title = formatTitle(
        freshData.mrms || freshData.title || freshData.identity
      );

      // =========================
      // DOJ FIXES
      // =========================
      freshData.doj =
        freshData.doj || freshData.joiningDate || freshData.dateOfJoining;
      freshData.joiningDate =
        freshData.joiningDate || freshData.doj || freshData.dateOfJoining;
      freshData.dateOfJoining =
        freshData.dateOfJoining || freshData.joiningDate || freshData.doj;

      // =========================
      // PAN / DOB FIXES
      // =========================
      freshData.pan = freshData.pan || freshData.panNo || "";
      freshData.panNo = freshData.panNo || freshData.pan || "";
      freshData.dob = freshData.dob || freshData.dateOfBirth || "";
      freshData.dateOfBirth = freshData.dateOfBirth || freshData.dob || "";

      // =========================
      // ISSUE DATE FIX
      // =========================
      if (!freshData.issueDate) {
        freshData.issueDate = new Date().toISOString().split("T")[0];
      }

      // =========================
      // SALARY FIXES
      // =========================
      const yearlySalary = Number(
        freshData.annualCTC ||
        freshData.salary ||
        freshData.currentCTC ||
        freshData.newCTC ||
        0
      );
      const monthlySalary = Math.round(yearlySalary / 12);

      console.log("=== PDF SALARY DEBUG ===");
      console.log("yearlySalary:", yearlySalary);
      console.log("freshData.annualCTC:", freshData.annualCTC);
      console.log("freshData.salary:", freshData.salary);
      console.log("freshData.currentCTC:", freshData.currentCTC);
      console.log("freshData.newCTC:", freshData.newCTC);
      console.log("freshData.monthlyCTC:", freshData.monthlyCTC);

      // ✅ Annual docs
      if (
        key === "offer_letter" ||
        key === "appointment_letter" ||
        key === "confirmation_letter"
      ) {
        freshData.salary = yearlySalary;
        freshData.newCTC = yearlySalary;
        freshData.totalSalary = yearlySalary;
      }

      // ✅ Increment letter
      if (key === "increment_letter") {
        freshData.newCTC = yearlySalary;
        freshData.salary = yearlySalary;
        freshData.annualCTC = yearlySalary;
      }

      // ✅ Monthly docs
      if (key === "salaryslip_letter") {
        freshData.totalSalary = Number(
          freshData.monthlyCTC || monthlySalary || 0
        );
      }

      if (key === "fullandfinal_letter") {
        freshData.totalSalary = Number(
          freshData.monthlyCTC || monthlySalary || 0
        );
        freshData.doj = freshData.doj || freshData.joiningDate || "";
      }

      // ✅ Internship
      if (key === "internshipcertificate_letter") {
        freshData.stipend = Number(
          freshData.stipend || freshData.monthlyCTC || 0
        );
      }

      // =========================
      // COMPLETION CERTIFICATE FIX
      // =========================
      if (key === "completion_certificate" && !freshData.trainingType) {
        freshData.trainingType = "General Training";
      }

      // =========================
      // BUILD PAYLOAD
      // =========================
      const payload = buildPayload(key, freshData, user, previewCompany);

      try {
      } catch (apiErr) {
        console.error("❌ API ERROR:", apiErr);
      }

      // =========================
      // TEMPLATE MAP
      // =========================
      const templateMap = {
        salaryslip_letter: SalarySlipLetterTemplate,
        internshipcertificate_letter: InternshipLetterTemplate,
        offer_letter: OfferTemplate,
        completion_certificate: CertificationLetterTemplate,
        increment_letter: IncrementTemplate,
        appointment_letter: AppointmentLetterTemplate,
        experience_letter: ExperienceLetterTemplate,
        relieving_letter: RelievingLetterTemplate,
        fullandfinal_letter: FullandfinalLetterTemplate,
        confirmation_letter: ConfirmationLetterTemplate,
      };

      // =========================
      // GET TEMPLATE
      // =========================
      const TemplateComponent = templateMap[key];

      if (!TemplateComponent) {
        throw new Error(`No template found for key: ${key}`);
      }

      // =========================
      // FILE NAME
      // =========================
      const filename = `${previewDocType?.name || "Document"}-${freshData?.employeeName || "User"
        }-${new Date().toISOString().slice(0, 10)}`;

      // =========================
      // GENERATE PDF
      // =========================
      // =========================
      // GENERATE PDF
      // =========================
      try {
        if (isSalarySlip && salarySlipDocs.length > 0) {
          // ✅ Generate one PDF with all salary slip months
          for (let i = 0; i < salarySlipDocs.length; i++) {
            const slipData = salarySlipDocs[i];

            const slipFreshData = {
              ...freshData,
              month: slipData.month,
              workdays: slipData.workdays,
              totalSalary: slipData.totalSalary ?? freshData.totalSalary,
              salaryType: slipData.salaryType || freshData.salaryType,
              doj: slipData.doj || freshData.doj,
              gender: slipData.gender || freshData.gender,
              mode: slipData.mode || freshData.mode,
            };

            const slipFilename = `${previewDocType?.name || "Salary_Slip"}-${freshData?.employeeName || "User"
              }-${slipData.month || new Date().toISOString().slice(0, 7)}`;

            await generatePDF(
              TemplateComponent,
              {
                data: slipFreshData,
                company: previewCompany,
              },
              slipFilename,
            );
          }
        } else {
          // ✅ All other docs — single PDF
          await generatePDF(
            TemplateComponent,
            {
              data: freshData,
              company: previewCompany,
            },
            filename,
          );
        }
      } catch (pdfError) {
        console.error("❌ PDF GENERATION FAILED:");
        console.error(pdfError);
        alert(pdfError.message || "PDF generation failed");
      }

      toast("PDF saved & downloaded ✓");
    } catch (err) {
      console.error("FULL DOWNLOAD ERROR:", err);
      console.error("BACKEND ERROR:", err?.response?.data);
      setError(err?.message || "Failed to generate PDF");
      toast("Export failed", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ── Download PDF (content only) ── */
  const handleDownloadPDFWord = async () => {
    if (!documentRef.current) return;
    setLoading(true);
    setLoadingLabel("Generating content-only PDF…");
    setError("");
    try {
      const content = documentRef.current.querySelector(".a4-content-only");
      if (!content) throw new Error("Missing .a4-content-only");
      const canvas = await html2canvas(content, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        ignoreElements: (el) => {
          const alt = el?.getAttribute?.("alt")?.toLowerCase() || "";
          return alt.includes("signature") || alt.includes("stamp");
        },
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const iw = 210,
        ph = 297;
      const ih = (canvas.height * iw) / canvas.width;
      let left = ih,
        pos = 0;
      pdf.addImage(imgData, "PNG", 0, pos, iw, ih);
      left -= ph;
      while (left > 0) {
        pos = -(ih - left);
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, pos, iw, ih);
        left -= ph;
      }
      pdf.save(`${previewDocType.name}-ContentOnly.pdf`);
      toast("Content-only PDF downloaded ✓");
    } catch (err) {
      console.error(err);
      setError("Failed to generate content-only PDF.");
      toast("Export failed", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!previewCompany || !previewDocType || !previewData) return null;

  const docLabel =
    DOC_LABELS[previewDocType?.template] || previewDocType?.name || "Document";

  console.log("previewData:", previewData);
  console.log("freshData:", freshData);

  return (
    <div className="dp-root">
      {/* ── Top Bar ── */}
      <header className="dp-topbar">
        <div className="dp-topbar-left">
          <a className="dp-logo" href="#">
            <div className="dp-logo-mark">D</div>
            <span className="dp-logo-name">Doc Gen</span>
          </a>

          <div className="dp-vdivider" />

          <button
            className="dp-btn dp-btn-ghost"
            onClick={() => {
              isNavigatingAway.current = true; // ✅ add this
              navigate("/document/create");
            }}
          >
            <ArrowBack sx={{ fontSize: 13 }} />
            Back
          </button>

          <div className="dp-crumb">
            <div className="dp-crumb-icon">
              <Description sx={{ fontSize: 11, color: "#fff" }} />
            </div>
            <span className="dp-crumb-text">{docLabel}</span>
          </div>
        </div>

        <div className="dp-topbar-right">
          <button
            className="dp-btn dp-btn-ghost"
            // Topbar Edit button
            onClick={() => {
              // console.log("flowType:", flowType);
              if (flowType === "PROFILE") {
                isNavigatingAway.current = true; // ✅ add this
                navigate(ROUTES.USER_FORM, {
                  state: {
                    employeeData: previewData,
                    isEditMode: true,
                    userId: previewData?._id || previewData?.id, // ✅ backend uses 'id'
                    selectedDocs: selectedDocs,
                  },
                });
              } else {
                isNavigatingAway.current = true; // ✅ add this
                navigate(ROUTES.DOCUMENT_CREATE);
              }
            }}
          >
            <Edit sx={{ fontSize: 13 }} /> Edit
          </button>
          <button
            className="dp-btn dp-btn-sec"
            onClick={handleDownloadPDFWord}
            disabled={loading}
          >
            <ContentCopy sx={{ fontSize: 13 }} /> Content PDF
          </button>
          <button
            className="dp-btn dp-btn-pri"
            onClick={handleDownloadPDF}
            disabled={loading}
          >
            <Download sx={{ fontSize: 13 }} /> Download PDF
          </button>
        </div>
      </header>

      {error && (
        <div className="dp-error">
          <span>⚠</span> {error}
        </div>
      )}

      {/* ── Layout ── */}
      <div className="dp-layout">
        {/* ── Sidebar ── */}
        <aside className="dp-sidebar">
          <div className="dp-card">
            <div className="dp-card-label">Documents</div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {selectedDocs.map((doc) => {
                const isActive = activeDocId === doc.id;

                return (
                  <button
                    key={doc.id}
                    onClick={() => setActiveDocId(doc.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      fontFamily: "DM Sans",
                      fontSize: "13px",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.18s",
                      border: isActive
                        ? "1px solid rgba(124,58,237,0.35)"
                        : "1px solid rgba(124,58,237,0.12)",
                      background: isActive
                        ? "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(91,33,182,0.08))"
                        : "transparent",
                      color: isActive ? "#5B21B6" : "#6B5E8A",
                    }}
                  >
                    {/* Icon circle (like your UI style) */}
                    {/* React Icon */}
                    <div
                      style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "8px",
                        background: isActive
                          ? "linear-gradient(135deg, #7C3AED, #5B21B6)"
                          : "#EDE9FE",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isActive ? "#fff" : "#5B21B6",
                        flexShrink: 0,
                      }}
                    >
                      <FiFileText size={14} />
                    </div>

                    {/* Text */}
                    <span style={{ flex: 1, textAlign: "left" }}>
                      {doc.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="dp-card">
            <div className="dp-card-label">Status</div>
            <div className="dp-status-pill">
              <span className="dp-status-dot" />
              Ready to export
            </div>
          </div>

          <div className="dp-card">
            <div className="dp-card-label">Document Type</div>
            <div className="dp-card-val">{docLabel}</div>
            <div className="dp-card-sub">{previewCompany?.name}</div>
          </div>

          {previewData?.employeeName && (
            <div className="dp-card">
              <div className="dp-card-label">Issued To</div>
              <div className="dp-card-val">{previewData.employeeName}</div>
              {previewData?.position && (
                <div className="dp-card-sub">{previewData.position}</div>
              )}
            </div>
          )}

          {previewData?.issueDate && (
            <div className="dp-card">
              <div className="dp-card-label">Issue Date</div>
              <div className="dp-card-val">
                {new Date(previewData.issueDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          )}

          <div className="dp-card">
            <div className="dp-card-label">Preview Zoom</div>
            <div className="dp-zoom-row">
              <button
                className="dp-zoom-btn"
                onClick={() => setZoom((z) => Math.max(50, z - 10))}
              >
                −
              </button>
              <span className="dp-zoom-val">{zoom}%</span>
              <button
                className="dp-zoom-btn"
                onClick={() => setZoom((z) => Math.min(150, z + 10))}
              >
                +
              </button>
            </div>
          </div>

          <div className="dp-card">
            <div className="dp-card-label">Quick Actions</div>
            <button
              className="dp-qa-btn"
              onClick={handleDownloadPDF}
              disabled={loading}
            >
              <div className="dp-qa-icon">
                <Download sx={{ fontSize: 13, color: "#fff" }} />
              </div>
              Download PDF
            </button>
            <button
              className="dp-qa-btn"
              onClick={handleDownloadPDFWord}
              disabled={loading}
            >
              <div className="dp-qa-icon">
                <ContentCopy sx={{ fontSize: 13, color: "#fff" }} />
              </div>
              Content Only
            </button>
            <button
              className="dp-qa-btn"
              // Topbar Edit button
              onClick={() => {
                // console.log("flowType:", flowType);
                if (flowType === "PROFILE") {
                  isNavigatingAway.current = true; // ✅ add this
                  navigate(ROUTES.USER_FORM, {
                    state: {
                      employeeData: previewData,
                      isEditMode: true,
                      userId: previewData?.employeeId,
                      selectedDocs: selectedDocs,
                    },
                  });
                } else {
                  isNavigatingAway.current = true; // ✅ add this
                  navigate(ROUTES.DOCUMENT_CREATE);
                }
              }}      >
              <div className="dp-qa-icon">
                <Edit sx={{ fontSize: 13, color: "#fff" }} />
              </div>
              Edit Document
            </button>
          </div>
        </aside>

        {/* ── Stage ── */}
        <main className="dp-stage">
          <div className="dp-stage-header">
            <div className="dp-stage-title">Document Preview</div>
            <div className="dp-stage-meta">
              A4 · 210 × 297 mm
              <span className="dp-meta-sep" />
              {previewCompany?.name}
            </div>
          </div>

          <div
            className="dp-page-wrap"
            style={{
              transform: `scale(${zoom / 100})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {isSalarySlip ? (
              salarySlipDocs.map((doc, index) => (
                <div
                  key={index}
                  className="dp-a4"
                  style={{ marginBottom: "20px" }}
                >
                  <SalarySlipLetterTemplate
                    data={doc}
                    company={previewCompany}
                  />
                </div>
              ))
            ) : (
              <div className="dp-a4" ref={documentRef}>
                {renderTemplate()}
              </div>
            )}

            <div className="dp-page-ind">
              <span className="dp-page-ind-text">Page 1</span>
              <span className="dp-pip active" />
              <span className="dp-pip" />
            </div>
          </div>
        </main>
      </div>

      {/* ── Loading overlay ── */}
      {loading && (
        <div className="dp-overlay">
          <div className="dp-overlay-card">
            <div className="dp-overlay-ring" />
            <div className="dp-overlay-title">{loadingLabel}</div>
            <div className="dp-overlay-sub">Please don't close this window</div>
          </div>
        </div>
      )}

      {/* ── Snackbar ── */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSev}
          variant="filled"
          sx={{
            borderRadius: "10px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            ...(snackSev === "success" && {
              background: "linear-gradient(135deg, #5B21B6, #7C3AED)",
            }),
          }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DocumentPreview;
