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

  const annualCTC = round2(data.newCTC || 0); // INPUT = ANNUAL
  const monthlyGross = round2(annualCTC / 12); // convert to monthly

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

  /* ================= TABLE STYLES ================= */

  const TABLE_CONTAINER_STYLE = {
    marginBottom: "20px",
    border: "0.5px solid #000",
    borderRadius: 0,
    boxShadow: "none",
    "& *": {
      fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
    },
  };

  const TABLE_STYLE = {
    tableLayout: "fixed",
    width: "100%",
    borderCollapse: "collapse",
  };

  const CELL_BASE = {
    border: "1px solid #000",
    fontSize: "10pt",
    padding: "0px 12px 12px 12px",
    verticalAlign: "top",
    lineHeight: 0.8,
  };

  const CELL_HEAD = {
    ...CELL_BASE,
    backgroundColor: "#f68b1f",
    fontWeight: 600,
  };

  const COMPONENT_CELL = {
    ...CELL_BASE,
    width: "40%",
  };

  const AMOUNT_CELL = {
    ...CELL_BASE,
    textAlign: "center",
  };

  const TOTAL_ROW = {
    backgroundColor: "#f68b1f",
  };

  const TOTAL_CELL = {
    ...CELL_BASE,
    fontWeight: 600,
  };

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
              mt: "8mm",
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
          <Typography sx={{ fontSize: "14pt", marginTop: "80px" }}>
            <strong>SmartMatrix Digital Services Pvt Ltd.</strong>
          </Typography>

          {/* STAMP + SIGNATURE */}
          <Box sx={{ mt: "6mm" }}>
            {/* STAMP + SIGNATURE SIDE BY SIDE */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: "10mm",
                mb: "4mm",
              }}
            >
              {/* SIGNATURE */}
              {company.signature && (
                <img
                  src={company.CEO}
                  alt="Company Stamp"
                  style={{ width: "35mm" }}
                />
              )}

              {/* STAMP */}
              {company.stamp && (
                <img
                  src={company.stamp}
                  alt="HR Signature"
                  style={{ width: "30mm" }}
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
            mt: 8,
            fontSize: "16px",
            textDecoration: "underline",
          }}
        >
          Salary Annexure
        </Typography>
        <Box
          sx={{
            marginBottom: "35px",
            fontSize: "13pt",
            "& *": {
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            },

            "& p": {
              mt: 1,
            },
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
        </Box>

        <TableContainer
          component={Paper}
          sx={TABLE_CONTAINER_STYLE}
        >
          <Table
            size="small"
            sx={TABLE_STYLE}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    ...CELL_HEAD,
                    width: "40%",
                  }}
                >
                  Salary Components
                </TableCell>

                <TableCell
                  align="center"
                  sx={CELL_HEAD}
                >
                  Per month (Rs.)
                </TableCell>

                <TableCell
                  align="center"
                  sx={CELL_HEAD}
                >
                  Per Annum (Rs.)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryRows.map((row, index) => {
                const isTotal = row.type === "total";

                return (
                  <TableRow
                    key={index}
                    sx={isTotal ? TOTAL_ROW : {}}
                  >
                    <TableCell
                      sx={isTotal ? TOTAL_CELL : COMPONENT_CELL}
                    >
                      {row.label}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={isTotal ? TOTAL_CELL : AMOUNT_CELL}
                    >
                      {formatCurrency(row.monthly)}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={isTotal ? TOTAL_CELL : AMOUNT_CELL}
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
