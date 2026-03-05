import React from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import {
  generateAnnexureSalaryStructure,
  formatCurrency,
} from "../../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const SmartMatrixIncrement = ({ company, data }) => {
  if (!company || !data) return null;

  /* ================= ANNEXURE SALARY LOGIC ================= */

  const round2 = (v) => Math.round(Number(v) * 100) / 100;

  /* ================= CORRECT LOGIC (INPUT IS MONTHLY) ================= */

  const monthlyGross = round2(data.newCTC || 0); // INPUT IS MONTHLY
  const annualCTC = round2(monthlyGross * 12); // Annual derived from monthly

  // Percentage Structure (As per Image)
  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
    misc: 0.08,
  };

  // Monthly Calculation
  const basic = round2(monthlyGross * PERCENT.basic);
  const hra = round2(monthlyGross * PERCENT.hra);
  const da = round2(monthlyGross * PERCENT.da);
  const special = round2(monthlyGross * PERCENT.special);
  const food = round2(monthlyGross * PERCENT.food);

  // Adjustment row to avoid rounding mismatch
  const misc = round2(monthlyGross - (basic + hra + da + special + food));

  // Final Table Rows
  const salaryRows = [
    {
      label: "Basic",
      monthly: basic,
      annual: round2(basic * 12),
    },
    {
      label: "House Rent Allowance",
      monthly: hra,
      annual: round2(hra * 12),
    },
    {
      label: "Dearness Allowance",
      monthly: da,
      annual: round2(da * 12),
    },
    {
      label: "Special Allowance",
      monthly: special,
      annual: round2(special * 12),
    },
    {
      label: "Facility Allowance",
      monthly: misc,
      annual: round2(misc * 12),
    },
    {
      label: "Food Allowance",
      monthly: food,
      annual: round2(food * 12),
    },

    {
      label: "Total Monthly Gross Salary",
      monthly: monthlyGross,
      annual: annualCTC,
      type: "total",
    },
  ];
  return (
    <>
      {/* ======================================================
          ================= PAGE 1 : INCREMENT LETTER ==========
          ====================================================== */}
      <A4Layout headerSrc={company.header} footerSrc={company.footer}>
        <Box
          sx={{
            fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            fontSize: "12pt",
            lineHeight: "1.42",
            fontWeight: 800,
            color: "#000",
          }}
        >
          {/* DATE */}
          <Typography
            align="right"
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
              mb: "12mm",
            }}
          >
            {formatDate(data.issueDate)}
          </Typography>

          {/* GREETING */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              mb: "8mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            Dear {data.employeeName},
          </Typography>

          {/* PARAGRAPH 1 */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 200,
              textAlign: "justify",
              mb: "6mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            As part of our periodic salary review process, we have adjusted
            compensation across the company to reflect market trends. Effective{" "}
            <strong> {formatDate(data.effectiveDate)}</strong>, your salary will
            be increased to <strong>{formatCurrency(annualCTC)}</strong> per
            annum.
          </Typography>

          {/* PARAGRAPH 2 */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 200,
              textAlign: "justify",
              mb: "6mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            This adjustment ensures that your compensation remains competitive
            within the industry and we hope this reflects our commitment to
            rewarding your ongoing efforts and contributions to the company.
          </Typography>

          {/* PARAGRAPH 3 */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 200,
              textAlign: "justify",
              mb: "20mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            We appreciate your hard work and dedication and look forward to your
            continued success at<strong> {company.name}</strong>
          </Typography>

          {/* COMPANY NAME (BOLD IN WORD) */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 600,
              mb: "18mm",
              fontFamily: "Verdana",
            }}
          >
            <strong>{company.name}</strong>
          </Typography>

          {/* STAMP + SIGNATURE */}
          <Box sx={{ mt: "4mm" }}>
            {/* STAMP + SIGNATURE SIDE BY SIDE */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: "10mm", // distance between stamp & signature
                mb: "4mm",
              }}
            >
              {/* STAMP */}
              {company.stamp && (
                <img
                  src={company.CEO}
                  alt="Company Stamp"
                  style={{ width: "45mm" }}
                />
              )}

              {/* SIGNATURE */}
              {company.signature && (
                <img
                  src={company.stamp}
                  alt="HR Signature"
                  style={{ width: "38mm" }}
                />
              )}
            </Box>

            {/* HR NAME */}
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 600,
                fontFamily: '"Verdana","Segoe UI",Arial,sans-serif',
              }}
            >
              <strong>{company.ceoName}</strong>
            </Typography>

            {/* HR TITLE */}
            <Typography
              sx={{
                fontSize: "11pt",
                fontWeight: 400,
                fontFamily: '"Verdana","Segoe UI",Arial,sans-serif',
              }}
            >
              <strong>Group Leader-HR Services</strong>
            </Typography>
          </Box>
        </Box>
      </A4Layout>

      {/* ======================================================
          ================= PAGE 2 : SALARY ANNEXURE ===========
          ====================================================== */}
      <A4Layout headerSrc={company.header} footerSrc={company.footer}>
        <Typography
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 3,
            fontSize: "16px",
            textDecoration: "underline",
          }}
        >
          Salary Annexure
        </Typography>
        <div
          style={{
            marginBottom: "16px",
            fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            fontSize: "12pt",
          }}
        >
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
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            border: "0.5px solid #000",
            borderRadius: 0,
            boxShadow: "none",
          }}
        >
          <Table size="small" sx={{ tableLayout: "fixed" }}>
            {/* TABLE HEADER */}
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    border: "2px solid #000",
                    backgroundColor: "#f68b1f",
                    fontWeight: "bold",
                    fontSize: "15px",
                    width: "55%",
                    fontFamily: "Times New Roman",
                  }}
                >
                  Salary Components
                </TableCell>
                <TableCell
                  sx={{
                    border: "2px solid #000",
                    backgroundColor: "#f68b1f",
                    fontWeight: "bold",
                    fontSize: "15px",
                    textAlign: "center",
                    width: "22.5%",
                  }}
                >
                  Per month (Rs.)
                </TableCell>
                <TableCell
                  sx={{
                    border: "2px solid #000",
                    backgroundColor: "#f68b1f",
                    fontWeight: "bold",
                    fontSize: "15px",
                    textAlign: "center",
                    width: "22.5%",
                  }}
                >
                  Per Annum (Rs.)
                </TableCell>
              </TableRow>
            </TableHead>

            {/* TABLE BODY */}
            <TableBody>
              {salaryRows.map((row, index) => {
                const isTotal = row.type === "total";
                return (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: isTotal ? "#f68b1f" : "#fff",
                    }}
                  >
                    <TableCell
                      sx={{
                        border: "1.5px solid #000",
                        fontWeight: isTotal ? "bold" : "normal",
                        fontSize: "14px",
                      }}
                    >
                      {row.label}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1.5px solid #000",
                        textAlign: "center",
                        fontWeight: isTotal ? "bold" : "normal",
                        fontSize: "14px",
                      }}
                    >
                      {formatCurrency(row.monthly)}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1.5px solid #000",
                        textAlign: "center",
                        fontWeight: isTotal ? "bold" : "normal",
                        fontSize: "14px",
                      }}
                    >
                      {formatCurrency(row.annual)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
        {/* SIGNATURE BLOCK */}
        <Typography
          sx={{
            fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            fontSize: "13pt",
          }}
        >
          Please note that the details in this communication are confidential
          and you are requested not to share the same with others
        </Typography>
      </A4Layout>
    </>
  );
};

export default SmartMatrixIncrement;
