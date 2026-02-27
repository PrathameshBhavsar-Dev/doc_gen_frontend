import React from "react";
import { formatCurrency } from "../../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

/* ================= HELPERS ================= */
const round2 = (num) => Math.round((Number(num) || 0) * 100) / 100;

const NimbjaIncrement = ({ company, data }) => {
  if (!company || !data) return null;

  /* =====================================================
     SALARY CALCULATION (SMARTMATRIX LOGIC APPLIED)
     ===================================================== */

  const annualCTC = round2(data.newCTC);

  /* ===== Percentage Structure ===== */
  const basicAnnual = round2(annualCTC * 0.4);
  const hraAnnual = round2(annualCTC * 0.18);
  const daAnnual = round2(annualCTC * 0.12);
  const specialAnnual = round2(annualCTC * 0.16);
  const foodAnnual = round2(annualCTC * 0.06);

  /* Remaining Adjustment */
  const usedAnnual =
    basicAnnual + hraAnnual + daAnnual + specialAnnual + foodAnnual;

  const miscAnnual = round2(annualCTC - usedAnnual);

  /* ===== Monthly Breakdown ===== */
  const basicMonthly = round2(basicAnnual / 12);
  const hraMonthly = round2(hraAnnual / 12);
  const daMonthly = round2(daAnnual / 12);
  const specialMonthly = round2(specialAnnual / 12);
  const foodMonthly = round2(foodAnnual / 12);
  const miscMonthly = round2(miscAnnual / 12);

  const totalMonthly = round2(
    basicMonthly +
      hraMonthly +
      daMonthly +
      specialMonthly +
      foodMonthly +
      miscMonthly,
  );

  const totalAnnual = round2(
    basicAnnual +
      hraAnnual +
      daAnnual +
      specialAnnual +
      foodAnnual +
      miscAnnual,
  );

  /* ===== PF (Same as SmartMatrix) ===== */
  const pfMonthly = 3750;
  const pfAnnual = pfMonthly * 12;

  /* ===== Salary Components ===== */
  const salaryComponents = [
    {
      name: "Basic",
      monthly: basicMonthly,
      annual: basicAnnual,
    },
    {
      name: "Bouquet Of Benefits",
      monthly: hraMonthly,
      annual: hraAnnual,
    },
    {
      name: "City Allowance",
      monthly: daMonthly,
      annual: daAnnual,
    },
    {
      name: "Retirals",
      monthly: specialMonthly,
      annual: specialAnnual,
    },
    {
      name: "Superannuation Fund",
      monthly: foodMonthly,
      annual: foodAnnual,
    },
    {
      name: "Performance Bonus",
      monthly: miscMonthly,
      annual: miscAnnual,
    },
    {
      name: "Provident Fund (PF)",
      monthly: pfMonthly,
      annual: pfAnnual,
    },
  ];

  return (
    <>
      {/* =========================== PAGE 1 =========================== */}
      <div className="a4-content-only" style={page}>
        {company.headerImage && (
          <img src={company.headerImage} alt="Header" style={fullWidth} />
        )}

        <div style={content}>
          <p style={rightDate}>{formatDate(data.issueDate)}</p>

          <p style={greeting}>
            Dear {data.candidateName || data.employeeName},
          </p>

          <p style={para}>
            In recognition of your previous years of service with{" "}
            <strong>{company.name}</strong>, we are pleased to inform you of a
            salary increment. Effective{" "}
            <strong>{formatDate(data.effectiveDate)}</strong>, your revised
            annual CTC will be <strong>{formatCurrency(annualCTC)}</strong>.
          </p>

          <p style={para}>
            Your dedication and commitment to the organization are truly
            appreciated, and we look forward to your continued contribution and
            success.
          </p>

          <p style={{ ...para, marginBottom: "36px" }}>
            We wish you continued growth and success with the organization.
          </p>

          <p style={signOff}>Yours sincerely,</p>

          <div style={signatureRow}>
            {company.signature && (
              <img
                src={company.CEO}
                alt="Signature"
                style={{ height: "42px" }}
              />
            )}
            {company.stamp && (
              <img
                src={company.stamp}
                alt="Stamp"
                style={{
                  height: "100px",
                  marginLeft: "-26mm",
                  marginTop: "-8mm",
                }}
              />
            )}
          </div>

          <p style={signName}>{company.ceoName}</p>
          <strong>
            <p>CEO & Managing Director</p>
          </strong>
        </div>

        {company.footerImage && (
          <img src={company.footerImage} alt="Footer" style={fullWidth} />
        )}
      </div>

      {/* =========================== PAGE 2 =========================== */}
      <div
        className="a4-content-only"
        style={{ ...page, pageBreakBefore: "always" }}
      >
        {company.headerImage && (
          <img src={company.headerImage} alt="Header" style={fullWidth} />
        )}

        <div style={content}>
          <p style={annexureTitle}>Annexure – A : Salary Structure</p>

          <div style={{ marginBottom: "16px" }}>
            <p>
              <strong>Employee Code :</strong> {data.employeeId}
            </p>
            <p>
              <strong>Employee Name :</strong>{" "}
              {data.candidateName || data.employeeName}
            </p>
            <p>
              <strong>Effective Date :</strong> {formatDate(data.effectiveDate)}
            </p>
          </div>

          <table style={table}>
            <thead>
              <tr style={{ backgroundColor: "#abe568ff" }}>
                <th style={thLeft}>Salary Components</th>
                <th style={thCenter}>Per Month (Rs.)</th>
                <th style={thCenter}>Per Annum (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {salaryComponents.map((item, idx) => (
                <tr key={idx}>
                  <td style={tdLeft}>{item.name}</td>
                  <td style={tdCenter}>{formatCurrency(item.monthly)}</td>
                  <td style={tdCenter}>{formatCurrency(item.annual)}</td>
                </tr>
              ))}

              <tr style={{ backgroundColor: "#abe568ff", fontWeight: 600 }}>
                <td style={tdLeft}>Total Gross Salary</td>
                <td style={tdCenter}>{formatCurrency(totalMonthly)}</td>
                <td style={tdCenter}>{formatCurrency(totalAnnual)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {company.footerImage && (
          <img src={company.footerImage} alt="Footer" style={fullWidth} />
        )}
      </div>
    </>
  );
};

/* ================= STYLES ================= */

const page = {
  width: "210mm",
  minHeight: "297mm",
  backgroundColor: "#fff",
  fontFamily: "Bahnschrift, 'Segoe UI', Arial, sans-serif",
  fontSize: "11pt",
  lineHeight: "1.5",
  display: "flex",
  flexDirection: "column",
};

const content = { padding: "22mm 25mm", flexGrow: 1 };
const fullWidth = { width: "100%", display: "block" };

const rightDate = { textAlign: "right", marginBottom: "32px" };
const greeting = { marginBottom: "18px" };
const para = { textAlign: "justify", marginBottom: "14px" };
const signOff = { marginBottom: "24mm" };

const signatureRow = {
  display: "flex",
  alignItems: "flex-start",
  gap: "28mm",
  marginBottom: "10px",
};

const signName = { fontWeight: 600 };
const annexureTitle = {
  textAlign: "center",
  fontWeight: 600,
  marginBottom: "20px",
};

const table = { width: "100%", borderCollapse: "collapse" };
const thLeft = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "left",
  fontWeight: 600,
};
const thCenter = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "center",
  fontWeight: 600,
};
const tdLeft = { border: "1px solid #000", padding: "8px", textAlign: "left" };
const tdCenter = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "center",
};

export default NimbjaIncrement;
