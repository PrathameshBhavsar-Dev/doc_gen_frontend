import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

/* ================= DATE FORMATTER ================= */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/* ================= CURRENCY FORMAT ================= */
const formatCurrency = (value) => {
  if (value === undefined || value === null) return "0";
  return Number(value).toLocaleString("en-IN");
};

const CubeageIncrement = ({ company, data }) => {
  if (!company || !data) return null;

  /* =====================================================
     COMPENSATION STRUCTURE – INJECTED SALARY LOGIC
     (matches Word file structure)
     ===================================================== */
  /* ================= SAFE NUMBER PARSER ================= */
  const parseNumber = (value) => {
    if (!value) return 0;
    return Number(String(value).replace(/,/g, ""));
  };

  const round0 = (n) => Math.round(n || 0);

  /* ================= SOURCE ================= */
  const monthlyCTC = round0(parseNumber(data?.newCTC));
  const annualCTC = round0(monthlyCTC * 12);

  /* ================= EARNINGS ================= */
  const basic = round0(monthlyCTC * 0.48);
  const hra = round0(monthlyCTC * 0.18);
  const da = round0(monthlyCTC * 0.12);
  const allowance = round0(monthlyCTC * 0.16);

  /* Remaining goes to Special */
  const special = round0(
    monthlyCTC - (basic + hra + da + allowance)
  );

  const earnings = [
    { name: "Basic", monthly: basic, annual: basic * 12 },
    { name: "HRA", monthly: hra, annual: hra * 12 },
    { name: "DA", monthly: da, annual: da * 12 },
    { name: "ALLOWANCE (Shift+Skill)", monthly: allowance, annual: allowance * 12 },
    { name: "SPECIAL ALLOWANCE", monthly: special, annual: special * 12 },
  ];

  /* ================= PF (NOT PART OF CTC) ================= */
  const pfMonthly = 3750;
  const pfAnnual = pfMonthly * 12;

  const tableRows = [
    ...earnings,
    { name: "PF", monthly: pfMonthly, annual: pfAnnual },
  ];

  /* ================= TOTAL CTC (WITHOUT PF) ================= */
  const totalMonthlyCTC = earnings.reduce(
    (sum, r) => sum + (r.monthly || 0),
    0
  );

  const totalAnnualCTC = earnings.reduce(
    (sum, r) => sum + (r.annual || 0),
    0
  );
  // ================= FINAL TABLE ROWS =================
  const pageStyle = {
    width: "210mm",
    minHeight: "297mm",
    padding: "25mm 20mm",
    fontFamily: "Cambria",
    fontSize: "12pt",
    lineHeight: "1.7",
    color: "#000",
    backgroundColor: "#fff",
    position: "relative",
    boxSizing: "border-box",
  };

  const TC = (extra = {}) => ({
    border: "1px solid #000",
    padding: "8px",
    ...extra,
  });

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <div className="a4-content-only" style={pageStyle}>
        {/* ================= HEADER ================= */}
        {company.header && (
          <img
            src={company.header}
            alt="Company Header"
            style={{ width: "100%", marginBottom: "10mm" }}
          />
        )}

        {/* ================= DATE ================= */}
        <div
          style={{
            marginBottom: "12mm",
            textAlign: "right",
          }}
        >
          <b>Date: {formatDate(data.issueDate)}</b>
        </div>
        {/* ================= TITLE ================= */}
        <h3
          style={{
            textAlign: "center",
            marginBottom: "4mm",
            textDecoration: "underline",
            fontWeight: 800,
          }}
        >
          Appraisal Letter
        </h3>

        {/* ================= EMPLOYEE NAME ================= */}
        <p style={{ marginBottom: "6mm" }}>
          <b>
            {data.mrms} {data.employeeName}
          </b>
        </p>

        {/* ================= BODY ================= */}
        <p style={{ marginBottom: "6mm" }}>
          <b>Congratulation!</b>
        </p>

        <p style={{ textAlign: "justify", marginBottom: "6mm" }}>
          We are pleased to inform you that based on your performance and
          contribution to the company, our management has revised your
          compensation to <b>Rs. {formatCurrency(annualCTC)} /- LPA</b>{" "}
          with effect from <b>{formatDate(data.effectiveDate)}</b>.
        </p>

        <p style={{ textAlign: "justify", marginBottom: "6mm" }}>
          We appreciate your initiative and expect you to take many more such
          responsibilities in future assignments to ensure <b>{company.name}</b>’s growth.
        </p>

        <p style={{ marginBottom: "14mm" }}>Wishing you all Success.</p>

        {/* ================= SIGNATURE ================= */}
        <div style={{ marginBottom: "20mm" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "15mm",
              marginTop: "6mm",
            }}
          >
            {company.stamp && (
              <img
                src={company.stamp}
                alt="Company Stamp"
                style={{ width: "35mm", marginTop: "-5mm", marginLeft: "-5mm" }}
              />
            )}
            {company.signature && (
              <img
                src={company.signature}
                alt="HR Signature"
                style={{ width: "40mm", marginTop: "12mm", marginLeft: "-3mm" }}
              />
            )}
          </div>
          <br />
          <p>
            <strong>Authorized Signature,</strong>
          </p>
          <br />
          <p>
            <strong>For {company.name}</strong>
          </p>
        </div>
      </div>

      {/* ================= PAGE 2 ================= */}
      <div className="a4-content-only" style={{ ...pageStyle, pageBreakBefore: "always" }}>
        {/* ================= HEADER ================= */}
        {company.header && (
          <img
            src={company.header}
            alt="Company Header"
            style={{ width: "100%", marginBottom: "10mm" }}
          />
        )}

        {/* ================= COMPENSATION STRUCTURE ================= */}
        <h4 style={{ marginBottom: "6mm", textAlign: "center", textDecoration: "underline" }}>
          Annexure - A : Compensation Structure
        </h4>

        <div style={{ marginBottom: "6mm" }}>
          <strong>Name:</strong> <strong>{data.mrms} {data.employeeName}</strong>
          <br />
          <strong>Designation:</strong> <strong>{data.designation}</strong>
          <br />
          <strong>Location:</strong> <strong>{company.city}</strong>
        </div>

        {/* ================= SALARY TABLE ================= */}
        <TableContainer>
          <Table size="small" sx={{ borderCollapse: "collapse", border: "2px solid #000" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e8e8e8" }}>
                <TableCell sx={TC({ fontWeight: "bold" })}><strong>Components</strong></TableCell>
                <TableCell sx={TC({ textAlign: "center", fontWeight: "bold" })}><strong>Amount / Month</strong></TableCell>
                <TableCell sx={TC({ textAlign: "center", fontWeight: "bold" })}><strong>Amount / Annum</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tableRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={TC()}>{row.name}</TableCell>
                  <TableCell sx={TC({ textAlign: "center" })}>
                    {formatCurrency(row.monthly)}
                  </TableCell>
                  <TableCell sx={TC({ textAlign: "center" })}>
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              {/* CTC Row */}
              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell sx={TC({ fontWeight: "bold" })}><strong>CTC</strong></TableCell>
                <TableCell sx={TC({ textAlign: "center", fontWeight: "bold" })}>
                  <strong>{formatCurrency(totalMonthlyCTC)}</strong>
                </TableCell>
                <TableCell sx={TC({ textAlign: "center", fontWeight: "bold" })}>
                  <strong>{formatCurrency(totalAnnualCTC)}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        {/* ================= FOOT NOTE ================= */}
        <p style={{ fontSize: "10.5pt", fontFamily: "Verdana" }}>
          * PVLP will be payable to you on yearly basis subject to performance
          review.
        </p>
      </div>
    </>
  );
};

export default CubeageIncrement;
