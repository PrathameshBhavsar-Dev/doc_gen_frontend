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
import A4Layout from "../../../layout/A4Page";
import {
    generateAnnexureSalaryStructure,
    formatCurrency,
} from "../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    });
};

const SmartMatrixInternship = ({ company, data }) => {
    if (!company || !data) return null;

     /* ===== helper for consistent rounding ===== */
  const round2 = (num) => Number(num.toFixed(2));
  const round0 = (num) => Math.round(num); // 👈 yearly, no decimals

  /* ===== SOURCE OF TRUTH (ANNUAL CTC) ===== */
  const annualCTC = round0(Number(data.salary || data.newCTC || 0));

  /* ===== PERCENT CONFIG (TOTAL = 100%) ===== */
  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
    misc: 0.08, // adjustment bucket
  };

  /* =====================================================
   STEP 1: CALCULATE MONTHLY VALUES (ROUND HERE ONLY)
   ===================================================== */
  const basicMonthly = round2((annualCTC * PERCENT.basic) / 12);
  const hraMonthly = round2((annualCTC * PERCENT.hra) / 12);
  const daMonthly = round2((annualCTC * PERCENT.da) / 12);
  const specialMonthly = round2((annualCTC * PERCENT.special) / 12);
  const foodMonthly = round2((annualCTC * PERCENT.food) / 12);

  /* ===== monthly used so far ===== */
  const grossMonthly = round2(annualCTC / 12);

  const usedMonthly =
    basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly;

  const miscMonthly = round2(grossMonthly - usedMonthly);

  /* =====================================================
   STEP 3: FINAL ROWS (ANNUAL DERIVED FROM MONTHLY)
   ===================================================== */
 const rows = [
   {
     name: "Basic",
     monthly: basicMonthly,
     annual: round0(basicMonthly * 12), // ✅ FIXED
   },
   {
     name: "Bouquet Of Benefits",
     monthly: hraMonthly,
     annual: round0(hraMonthly * 12), // ✅ FIXED
   },
   {
     name: "HRA",
     monthly: daMonthly,
     annual: round0(daMonthly * 12), // ✅ FIXED
   },
   {
     name: "City Allowance",
     monthly: specialMonthly,
     annual: round0(specialMonthly * 12), // ✅ FIXED
   },
   {
     name: "Superannuation Fund",
     monthly: foodMonthly,
     annual: round0(foodMonthly * 12), // ✅ FIXED
   },
   {
     name: "Performance Bonus",
     monthly: miscMonthly,
     annual: round0(miscMonthly * 12), // ✅ FIXED
   },
 ];

  /* =====================================================
   STEP 4: TOTALS (GUARANTEED TO MATCH CTC)
   ===================================================== */
  const totalMonthly = round2(rows.reduce((sum, r) => sum + r.monthly, 0));

  const totalAnnual = round0(rows.reduce((sum, r) => sum + r.annual, 0));

  /* ================= TABLE STYLES (UNCHANGED) ================= */
  const CELL = {
    border: "1px solid #000",
    fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
    fontSize: "11pt",
    padding: "6px 8px",
    lineHeight: 1.4,
  };

  const GREEN_ROW = {
    backgroundColor: "rgba(215, 121, 34, 0.9)"
  };

    const salaryRows = generateAnnexureSalaryStructure(data.salary);

    return (
      <>
        {/* ======================================================
          ================= PAGE 1 : INCREMENT LETTER ==========
          ====================================================== */}
        <A4Layout headerSrc={company.header} footerSrc={company.footer}>
          <Box>
            {/* DATE */}
            <Typography
              align="right"
              sx={{
                fontSize: "12pt",
                fontWeight: 500,
                fontFamily: "Verdana",
                mb: "6mm",
              }}
            >
              {formatDate(data.issueDate)}
            </Typography>

            <Box>
              {/* NAME */}
              <Typography
                sx={{
                  fontSize: "12pt",
                  fontWeight: 500,
                  mb: "-1mm",
                  fontFamily: "Verdana",
                }}
              >
                Name : {data.internName}
              </Typography>

              {/* SUBJECT */}
              <Typography
                sx={{
                  fontSize: "12pt",
                  fontWeight: 500,
                  mb: "6mm",
                  mt: "2mm",
                  fontFamily: "Verdana",
                }}
              >
                Subject:{" "}
                <span style={{ textDecoration: "underline" }}>
                  Letter of intent for the Internship of position as a{" "}
                  {data.field} Trainee
                </span>
                .
              </Typography>
            </Box>

            {/* GREETING */}
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 500,
                mb: "-1mm",
                fontFamily: "Verdana",
              }}
            >
              Dear {data.internName},
            </Typography>
            <br />

            {/* PARAGRAPH 1 */}
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 500,
                textAlign: "justify",
                mb: "6mm",
                fontFamily: "Verdana",
              }}
            >
              We are pleased to offer you the Internship of position as a{" "}
              {data.field} Trainee with {company.name} with effective date{" "}
              {formatDate(data.startDate)} considering your performance and
              support towards the organization. Your annual salary, allowances,
              and contributions put together will be INR {data.salary} LPA.
            </Typography>

            {/* PARAGRAPH 2 */}
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 500,
                textAlign: "justify",
                mb: "6mm",
                fontFamily: "Verdana",
              }}
            >
              If there is any change in the date of joining, changes can be
              taken under consideration.
            </Typography>

            {/* PARAGRAPH 3 */}
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 500,
                textAlign: "justify",
                mb: "6mm",
                fontFamily: "Verdana",
              }}
            >
              We welcome you to {company.name} Family and hope it would be the
              beginning of a long and mutually beneficial association.
            </Typography>

            {/* PARAGRAPH 4 */}
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 500,
                textAlign: "justify",
                mb: "6mm",
                fontFamily: "Verdana",
              }}
            >
              Kindly acknowledge the duplicate copy of this letter as an
              acceptance of this offer.
            </Typography>

            {/* CLOSING */}
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 500,
                textAlign: "justify",
                mb: "12mm",
                fontFamily: "Verdana",
              }}
            >
              Yours Sincerely,
            </Typography>

            {/* COMPANY NAME */}
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 600,
                mb: "12mm",
                fontFamily: "Verdana",
              }}
            >
              <strong>{company.name}</strong>
            </Typography>

            {/* STAMP + SIGNATURE */}
            <Box sx={{ mt: "4mm" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "mm",
                  mb: "4mm",
                }}
              >
                {/* STAMP */}
                {company.stamp && (
                  <img
                    src={company.stamp}
                    alt="Company Stamp"
                    style={{ width: "38mm" }}
                  />
                )}

                {/* SIGNATURE */}
                {company.signature && (
                  <img
                    src={company.signature}
                    alt="HR Signature"
                    style={{ width: "45mm" }}
                  />
                )}
              </Box>

              {/* HR NAME */}
              <Typography
                sx={{
                  fontSize: "12pt",
                  fontWeight: 600,
                  fontFamily: "Verdana",
                }}
              >
                <strong>{company.hrName}</strong>
              </Typography>

              {/* HR DESIGNATION */}
              <Typography
                sx={{
                  fontSize: "11pt",
                  fontWeight: 400,
                  fontFamily: "Verdana",
                }}
              >
                <strong>{company.hrDesignation}</strong>
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
            Annexure Salary Structure
           </Typography>
          {/* ================= TABLE ================= */}
          <TableContainer>
            <Table sx={{ borderCollapse: "collapse" }}>
              <TableHead>
                <TableRow sx={GREEN_ROW}>
                  <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
                    Salary Components
                  </TableCell>
                  <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
                    Per Month (Rs.)
                  </TableCell>
                  <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
                    Per Annum (Rs.)
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell sx={CELL}>{row.name}</TableCell>
                    <TableCell sx={CELL} align="right">
                      {formatCurrency(row.monthly)}
                    </TableCell>
                    <TableCell sx={CELL} align="right">
                      {formatCurrency(row.annual)}
                    </TableCell>
                  </TableRow>
                ))}

                {/* ================= TOTAL ================= */}
                <TableRow sx={{ ...GREEN_ROW, fontWeight: "bold" }}>
                  <TableCell sx={CELL}>Total Salary</TableCell>
                  <TableCell sx={CELL} align="right">
                    {formatCurrency(totalMonthly)}
                  </TableCell>
                  <TableCell sx={CELL} align="right">
                    {formatCurrency(totalAnnual)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* COMPANY NAME (BOLD IN WORD) */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 600,
              mt: "14mm",
              mb: "12mm",
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
                  src={company.stamp}
                  alt="Company Stamp"
                  style={{ width: "38mm" }}
                />
              )}

              {/* SIGNATURE */}
              {company.signature && (
                <img
                  src={company.signature}
                  alt="HR Signature"
                  style={{ width: "45mm", marginLeft: "-10mm" }}
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
              <strong>{company.hrName}</strong>
            </Typography>

            {/* HR TITLE */}
            <Typography
              sx={{
                fontSize: "11pt",
                fontWeight: 400,
                fontFamily: '"Verdana","Segoe UI",Arial,sans-serif',
              }}
            >
              <strong>HR Manager-HR Services</strong>
            </Typography>
          </Box>
        </A4Layout>
      </>
    );
};

export default SmartMatrixInternship;
