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
import CubeageUnPaidInternship from "../../InternshipUnPaidLetter/CompanyWiseUnPaidInternship/CubeageUnPaidInternship";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    });
};

const CubeageInternship = ({ company, data }) => {
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
      name: "HRA",
      monthly: hraMonthly,
      annual: round0(hraMonthly * 12), // ✅ FIXED
    },
    {
      name: "DA",
      monthly: daMonthly,
      annual: round0(daMonthly * 12), // ✅ FIXED
    },
    {
      name: "LTA",
      monthly: specialMonthly,
      annual: round0(specialMonthly * 12), // ✅ FIXED
    },
    {
      name: "ALLOWANCE(Shift+SKill)",
      monthly: foodMonthly,
      annual: round0(foodMonthly * 12), // ✅ FIXED
    },
    {
      name: "SPECIAL ALLOWANCE",
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
    backgroundColor: "#22222258",
  };

  const salaryRows = generateAnnexureSalaryStructure(data.salary);

  return (
    <>
      {/* ======================================================
          ================= PAGE 1 : INCREMENT LETTER ==========
          ====================================================== */}
      <A4Layout headerSrc={company.header}>
        <Box>
          {/* DATE */}
          <Typography
            align="right"
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
              mb: "2mm",
              mt: "20mm",
            }}
          >
            {formatDate(data.issueDate)}
          </Typography>

          <Box>
            {/* GREETING */}
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 500,
                mb: "2mm",
                mt: "10mm",
                fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
              }}
            >
              Name: {data.internName}
            </Typography>

            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 500,
                mb: "2mm",
                fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
              }}
            >
              Subject: Letter of intent for the Internship of position as a{" "}
              {data.field} Trainee.
            </Typography>

            {/* <Typography
                sx={{
                  fontSize: "12pt",
                  fontWeight: 500,
                  mb: "2mm",
                  fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
                }}
              >
                Address: {data.address}
              </Typography> */}
          </Box>

          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              mb: "2mm",
              mt: "3mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            Dear {data.internName},
          </Typography>

          {/* PARAGRAPH 1 */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              textAlign: "justify",
              mb: "6mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            We are pleased to offer you the Internship of position as a{" "}
            {data.field}
            Trainee with {company.name} with effective date{" "}
            {formatDate(data.issueDate)} considering your performance and
            support towards the organization.
          </Typography>

          {/* PARAGRAPH 2 */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              textAlign: "justify",
              mb: "6mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            If there is any change in the date of joining, changes can be taken
            under consideration. Your total Gross salary will be Rs.{" "}
            {data.salary} per year.
          </Typography>

          {/* PARAGRAPH 3 */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              textAlign: "justify",
              mb: "6mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            Subject to various deductions as per companies and government
            policy.
          </Typography>

          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              textAlign: "justify",
              mb: "6mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            The roles and responsibilities and other terms and conditions of
            your employment will be specified in your letter of appointment.
          </Typography>

          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              textAlign: "justify",
              mb: "6mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 500,
                textAlign: "justify",
                mb: "6mm",
                fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
              }}
            >
              We welcome you to {company.name} Family and hope it would be the
              beginning of a long and mutually beneficial association.
            </Typography>
          </Typography>
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              textAlign: "justify",
              mb: "6mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            Kindly acknowledge the duplicate copy of this letter as an
            acceptance of this offer.
          </Typography>
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              textAlign: "justify",
              mb: "8mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            Yours Sincerely,
          </Typography>

          {/* COMPANY NAME (BOLD IN WORD) */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 600,
              mb: "1mm",
              mt: "-3mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            <strong>{company.name}</strong>
          </Typography>

          {/* STAMP + SIGNATURE */}
          <Box sx={{ mt: "3mm" }}>
            {/* STAMP + SIGNATURE SIDE BY SIDE */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: "10mm", // distance between stamp & signature
                mb: "4mm",
              }}
            >
              {/* SIGNATURE */}
              {company.signature && (
                <img
                  src={company.signature}
                  alt="HR Signature"
                  style={{
                    width: "48mm",
                    marginTop: "2mm",
                    marginBottom: "9mm",
                  }}
                />
              )}
              {/* STAMP */}
              {company.stamp && (
                <img
                  src={company.stamp}
                  alt="Company Stamp"
                  style={{ width: "35mm", marginLeft: "-7mm" }}
                />
              )}
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
                    mb: "3mm",
                    ml: "-68mm",
                  }}
                >
                  <strong>Signature :</strong> _____________
                </Typography>

                <Typography
                  sx={{
                    fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
                    ml: "10mm",
                  }}
                >
                  <strong> Candidate Name:</strong>{" "}
                  <strong>{data.internName}</strong>
                </Typography>
              </Box>
            </Box>

            {/* HR NAME */}
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 600,
                fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
                marginTop: "-10mm",
              }}
            >
              <strong>{company.hrName}</strong>
            </Typography>

            {/* HR TITLE */}
            <Typography
              sx={{
                fontSize: "11pt",
                fontWeight: 400,
                fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
                marginTop: "-1mm",
              }}
            >
              <strong>HR Relations Lead </strong>
            </Typography>
          </Box>
        </Box>
      </A4Layout>

      {/* ======================================================
          ================= PAGE 2 : SALARY ANNEXURE ===========
          ====================================================== */}
      <A4Layout headerSrc={company.header}>
        <Typography
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 3,
            fontSize: "16px",
            mt: "30mm",
            textDecoration: "underline",
          }}
        >
          Salary Annexure
        </Typography>

        {/* <h4 style={{ marginBottom: "6mm", textAlign: "center" }}>
          Compensation Structure
        </h4> */}

        <div style={{ marginBottom: "6mm" }}>
          <strong>Name:</strong> {data.internName}
          <br />
          <strong>Designation:</strong> {data.field}
          <br />
          <strong>Location:</strong> {company.city}
        </div>

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
              gap: "2mm", // distance between stamp & signature
              mb: "4mm",
            }}
          >
            {/* SIGNATURE */}
            {company.signature && (
              <img
                src={company.signature}
                alt="HR Signature"
                style={{
                  width: "48mm",
                  marginTop: "2mm",
                  marginBottom: "9mm",
                }}
              />
            )}
            {/* STAMP */}
            {company.stamp && (
              <img
                src={company.stamp}
                alt="Company Stamp"
                style={{ width: "38mm" }}
              />
            )}
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
                mb: "3mm",
                ml: "-65mm",
              }}
            >
              <strong>Signature :</strong> _____________
            </Typography>

            <Typography
              sx={{
                fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
                ml: "10mm",
              }}
            >
              <strong> Candidate Name:</strong>{" "}
              <strong>{data.internName}</strong>
            </Typography>
          </Box>

          {/* HR NAME */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 600,
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
              mt: "-15mm",
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
            <strong>HR Relations Lead</strong>
          </Typography>
        </Box>
      </A4Layout>
    </>
  );
};

export default CubeageInternship;
