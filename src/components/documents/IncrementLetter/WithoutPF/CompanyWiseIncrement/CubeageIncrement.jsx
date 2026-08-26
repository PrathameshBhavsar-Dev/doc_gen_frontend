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

  const parseNumber = (value) => {
    if (!value) return 0;
    return Number(String(value).replace(/,/g, ""));
  };

  const round0 = (n) => Math.round(n || 0);

  // Source of truth (Annual CTC)
  const annualCTC = round0(parseNumber(data?.newCTC));
  const monthlyCTC = round0(annualCTC / 12);

  const hraM = round0(monthlyCTC * 0.18);
  const daM = round0(monthlyCTC * 0.16);
  const ltaM = round0(monthlyCTC * 0.12);
  const specialM = round0(monthlyCTC * 0.06);
  const allowM = round0(monthlyCTC * 0.08);

  const basicM = monthlyCTC - (hraM + daM + ltaM + specialM + allowM);

  const basicA = basicM * 12;
  const hraA = hraM * 12;
  const daA = daM * 12;
  const ltaA = ltaM * 12;
  const specialA = specialM * 12;
  const allowA = allowM * 12;

  // Component breakup (increment logic)
  const salaryComponents = [
    {
      name: "Basic",
      monthly: basicM,
      annual: basicA,
    },
    {
      name: "HRA",
      monthly: hraM,
      annual: hraA,
    },
    {
      name: "DA",
      monthly: daM,
      annual: daA,
    },
    {
      name: "LTA",
      monthly: ltaM,
      annual: ltaA,
    },
    {
      name: "ALLOWANCE (Shift+Skill)",
      monthly: allowM,
      annual: allowA,
    },
    {
      name: "SPECIAL ALLOWANCE",
      monthly: specialM,
      annual: specialA,
    },
  ];

  const totalMonthly = monthlyCTC;
  const totalAnnual = annualCTC;

  const issueDate = data.increment_letter?.issueDate ?? data.issueDate;

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <div
        className="a4-content-only"
        style={{
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
        }}
      >
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
            marginBottom: "12mm", // space before main content
            textAlign: "right",
          }}
        >
          <b>Date: {formatDate(issueDate)}</b>
        </div>

        {/* ================= TITLE ================= */}
        <h3
          style={{
            textAlign: "center",
            marginBottom: "4mm", // tight gap between title & date
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
      <div
        className="a4-content-only"
        style={{
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
          pageBreakBefore: "always",
        }}
      >
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
          <strong>Designation:</strong> <strong>{data.currentDesignation}</strong>
          <br />
          <strong>Location:</strong> <strong>{company.city}</strong>
        </div>

        {/* ================= SALARY TABLE ================= */}
        <TableContainer>
          <Table
            size="small"
            sx={{
              border: "1px solid #000",
              borderCollapse: "collapse",
              "& th, & td": {
                border: "1px solid #000",
                fontSize: "11.5pt",
                padding: "0px 12px 12px 12px",
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e8e8e8" }}>
                <TableCell sx={{ fontWeight: 600 }}>Components</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Amount/Month</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Amount/Annum</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryComponents.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="center">
                    {formatCurrency(row.monthly)}
                  </TableCell>
                  <TableCell align="center">
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell sx={{ fontWeight: 600 }}>CTC</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {formatCurrency(totalMonthly)}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {formatCurrency(totalAnnual)}
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
