import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Snackbar, Alert } from "@mui/material";
import { Download, Edit, ArrowBack, Description, ContentCopy } from "@mui/icons-material";
import { useAuth } from "../../core/contexts/AuthContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { generatePDF } from "../../utils/pdfUtils";
import ROUTES from "../../core/constants/routes.constant";
import ApiService from "../../core/services/api.service";
import API from "../../core/constants/serverURL.constant";

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
  .dp-sidebar { width: 224px; flex-shrink: 0; display: flex; flex-direction: column; gap: 10px; }

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
  internship_certificate: "Internship Certificate",
  offer_letter: "Offer Letter",
  completion_certificate: "Completion Certificate",
  increment_letter: "Increment Letter",
  appointment_letter: "Appointment Letter",
  experience_letter: "Experience Letter",
  relieving_letter: "Relieving Letter",
  fullandfinal_letter: "Full & Final Letter",
  confirmation_letter: "Confirmation Letter",
};

/* ═══════════════════════════════════════════════════════════ */
const DocumentPreview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const previewData = location.state?.documentData;
  const previewDocType = location.state?.selectedDocType;
  const previewCompany = location.state?.selectedCompany;

  const documentRef = useRef(null);
  const apiService = new ApiService();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSev, setSnackSev] = useState("success");
  const [zoom, setZoom] = useState(100);

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

  /* ── Auth guard ── */
  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    if (!previewCompany || !previewDocType || !previewData)
      navigate(ROUTES.USER_DASHBOARD);
  }, [user, previewCompany, previewDocType, previewData, navigate]);

  /* ── Template renderer ── */
  const renderTemplate = () => {
    const p = { data: previewData, company: previewCompany };
    const map = {
      salaryslip_letter: <SalarySlipLetterTemplate {...p} />,
      internship_certificate: <InternshipLetterTemplate {...p} />,
      offer_letter: <OfferTemplate {...p} />,
      completion_certificate: <CertificationLetterTemplate {...p} />,
      increment_letter: <IncrementTemplate {...p} />,
      appointment_letter: <AppointmentLetterTemplate {...p} />,
      experience_letter: <ExperienceLetterTemplate {...p} />,
      relieving_letter: <RelievingLetterTemplate {...p} />,
      fullandfinal_letter: <FullandfinalLetterTemplate {...p} />,
      confirmation_letter: <ConfirmationLetterTemplate {...p} />,
    };
    return map[previewDocType?.template] || (
      <Typography sx={{ p: 4, color: "#999" }}>Template not found</Typography>
    );
  };

  const toast = (msg, sev = "success") => {
    setSnackMsg(msg); setSnackSev(sev); setSnackOpen(true);
  };

  /* ── Download PDF (full) ── */
  const handleDownloadPDF = async () => {
    if (!documentRef.current) return;
    setLoading(true); setLoadingLabel("Saving & generating PDF…"); setError("");
    try {
      const key = previewDocType?.template?.replace(/-/g, "_");
      if (!key) throw new Error("Missing doc type key");

      const validSalaryTypes = ["withPF", "withoutPF"];

      function buildPayload(template, previewData, user, company) {
        const base = {
          company: company?.name,
          issuedTo: user?.id,
          employeeName: previewData.employeeName,
          employeeEmail: previewData.employeeEmail,
          employeeNumber: previewData.employeeNumber || "EMP001",
        };

        const validSalaryTypes = ["withPF", "withoutPF"];

        switch (template) {
          case "salaryslip_letter":
            return {
              ...base,
              title: previewData.mrms,

              designation: previewData.position || "Employee",
              totalSalary: Number(previewData.salary) || 0,
              doj: previewData.joiningDate || new Date(),
              salaryType: validSalaryTypes.includes(previewData.salaryType)
                ? previewData.salaryType
                : "withPF",

              department: previewData.department || "",
              pan: previewData.pan || "",
              gender: previewData.gender || "Other",
              workdays: previewData.workdays || 22,
              dob: previewData.dob || "1990-01-01",
              mode: previewData.mode || "Bank Transfer",
              accountNo: previewData.accountNo || "",
              month:
                previewData.month ||
                new Date().toLocaleString("default", { month: "long" }),
            };

          case "offer_letter":
            return {
              ...base,

              title: previewData.mrms,

              // ✅ FIX HERE
              position: previewData.position || previewData.designation,

              department: previewData.department || "General",
              employmentType: previewData.appointmentType || "Full-time",
              salary: Number(previewData.salary) || 0,
              location: previewData.location || "Pune",

              offerValidTill:
                previewData.offerValidTill ||
                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

              offerType: previewData.offerType || "withPF",

              joiningDate: previewData.joiningDate,
              issueDate: previewData.issueDate,
            };
          // 👉 add more cases later for other docs

          default:
            throw new Error("Invalid document type");
        }
      }

      const payload = buildPayload(
        previewDocType?.template,
        previewData,
        user,
        previewCompany
      );

      console.log("🔥 FINAL SAVE PAYLOAD:", payload);

      await apiService.apipost(API.generateDoc(key), payload);

      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 300));
      await generatePDF(
        documentRef.current,
        `${previewDocType.name}-${new Date().toISOString().slice(0, 10)}`
      );
      toast("PDF saved & downloaded ✓");
    } catch (err) {
      console.error(err);
      setError("Failed to save or generate PDF. Please try again.");
      toast("Export failed", "error");
    } finally { setLoading(false); }
  };

  /* ── Download PDF (content only) ── */
  const handleDownloadPDFWord = async () => {
    if (!documentRef.current) return;
    setLoading(true); setLoadingLabel("Generating content-only PDF…"); setError("");
    try {
      const content = documentRef.current.querySelector(".a4-content-only");
      if (!content) throw new Error("Missing .a4-content-only");
      const canvas = await html2canvas(content, {
        scale: 3, useCORS: true, backgroundColor: "#ffffff",
        ignoreElements: el => {
          const alt = el?.getAttribute?.("alt")?.toLowerCase() || "";
          return alt.includes("signature") || alt.includes("stamp");
        },
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const iw = 210, ph = 297;
      const ih = (canvas.height * iw) / canvas.width;
      let left = ih, pos = 0;
      pdf.addImage(imgData, "PNG", 0, pos, iw, ih); left -= ph;
      while (left > 0) {
        pos = -(ih - left); pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, pos, iw, ih); left -= ph;
      }
      pdf.save(`${previewDocType.name}-ContentOnly.pdf`);
      toast("Content-only PDF downloaded ✓");
    } catch (err) {
      console.error(err);
      setError("Failed to generate content-only PDF.");
      toast("Export failed", "error");
    } finally { setLoading(false); }
  };

  if (!previewCompany || !previewDocType || !previewData) return null;

  const docLabel = DOC_LABELS[previewDocType?.template] || previewDocType?.name || "Document";

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
            style={{ padding: "5px 11px", fontSize: "12px" }}
            onClick={() => navigate("/document/create")}
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
          <button className="dp-btn dp-btn-ghost" onClick={() => navigate("/document/create")}>
            <Edit sx={{ fontSize: 13 }} /> Edit
          </button>
          <button className="dp-btn dp-btn-sec" onClick={handleDownloadPDFWord} disabled={loading}>
            <ContentCopy sx={{ fontSize: 13 }} /> Content PDF
          </button>
          <button className="dp-btn dp-btn-pri" onClick={handleDownloadPDF} disabled={loading}>
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
                  day: "2-digit", month: "short", year: "numeric",
                })}
              </div>
            </div>
          )}

          <div className="dp-card">
            <div className="dp-card-label">Preview Zoom</div>
            <div className="dp-zoom-row">
              <button className="dp-zoom-btn" onClick={() => setZoom(z => Math.max(50, z - 10))}>−</button>
              <span className="dp-zoom-val">{zoom}%</span>
              <button className="dp-zoom-btn" onClick={() => setZoom(z => Math.min(150, z + 10))}>+</button>
            </div>
          </div>

          <div className="dp-card">
            <div className="dp-card-label">Quick Actions</div>
            <button className="dp-qa-btn" onClick={handleDownloadPDF} disabled={loading}>
              <div className="dp-qa-icon"><Download sx={{ fontSize: 13, color: "#fff" }} /></div>
              Download PDF
            </button>
            <button className="dp-qa-btn" onClick={handleDownloadPDFWord} disabled={loading}>
              <div className="dp-qa-icon"><ContentCopy sx={{ fontSize: 13, color: "#fff" }} /></div>
              Content Only
            </button>
            <button className="dp-qa-btn" onClick={() => navigate("/document/create")}>
              <div className="dp-qa-icon"><Edit sx={{ fontSize: 13, color: "#fff" }} /></div>
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

          <div className="dp-page-wrap" style={{ transform: `scale(${zoom / 100})` }}>
            <div className="dp-a4" ref={documentRef}>
              {renderTemplate()}
            </div>
          </div>

          <div className="dp-page-ind">
            <span className="dp-page-ind-text">Page 1</span>
            <span className="dp-pip active" />
            <span className="dp-pip" />
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