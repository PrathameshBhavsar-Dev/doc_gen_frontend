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

  // ================= ANNUAL CTC INPUT =================
  const annualCTC = round0(parseNumber(data?.newCTC));

  // ================= MONTHLY CTC =================
  const monthlyCTC = round0(annualCTC / 12);

  // ================= STATIC PF =================
  const pfMonthly = 3750;

  // ================= FIXED PERCENTAGES =================
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);

  // ================= ADJUSTED BASIC =================
  const basicMonthly = round0(
    monthlyCTC -
    (hraMonthly + daMonthly + specialMonthly + foodMonthly + pfMonthly)
  );

  // ================= ANNUAL =================
  const basicAnnual = round0(basicMonthly * 12);
  const hraAnnual = round0(hraMonthly * 12);
  const daAnnual = round0(daMonthly * 12);
  const specialAnnual = round0(specialMonthly * 12);
  const foodAnnual = round0(foodMonthly * 12);
  const pfAnnual = round0(pfMonthly * 12);

  const tableRows = [
    { name: "Basic", monthly: basicMonthly, annual: basicAnnual },
    { name: "House Rent Allowance", monthly: hraMonthly, annual: hraAnnual },
    { name: "Dearness Allowance", monthly: daMonthly, annual: daAnnual },
    { name: "Special Allowance", monthly: specialMonthly, annual: specialAnnual },
    { name: "Food Allowance", monthly: foodMonthly, annual: foodAnnual },
    { name: "Provident Fund (PF)", monthly: pfMonthly, annual: pfAnnual },
  ];

  // ================= TOTAL CTC (WITHOUT PF) =================
  const totalMonthlyCTC = round0(
    basicMonthly +
    hraMonthly +
    daMonthly +
    specialMonthly +
    foodMonthly +
    pfMonthly
  );

  const totalAnnualCTC = round0(totalMonthlyCTC * 12);
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
