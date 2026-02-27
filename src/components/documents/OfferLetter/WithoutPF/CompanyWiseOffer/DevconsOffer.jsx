import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import {
  formatCurrency,
} from "../../../../../utils/salaryCalculations";
import A4Page from "../../../../layout/A4Page";
const DevconsOffer = ({ company, data }) => {
  if (!company || !data) return null;

  

  // Helper – 2 decimal precision
const round0 = (num) => Math.round(num);

  // Source of truth
  const monthlyCTC = round0(Number(data.salary || data.ctc || 0));

  // ================= PERCENTAGE BREAKUP =================
const basicMonthly = round0(monthlyCTC * 0.40);
const hraMonthly = round0(monthlyCTC * 0.18);
const daMonthly = round0(monthlyCTC * 0.12);
const specialMonthly = round0(monthlyCTC * 0.16);
const foodMonthly = round0(monthlyCTC * 0.06);
const miscMonthly = round0(monthlyCTC * 0.08); // 8%

// ================= ANNUAL VALUES =================
const basicAnnual = round0(basicMonthly * 12);
const hraAnnual = round0(hraMonthly * 12);
const daAnnual = round0(daMonthly * 12);
const specialAnnual = round0(specialMonthly * 12);
const foodAnnual = round0(foodMonthly * 12);
const miscAnnual = round0(miscMonthly * 12);

// ================= SALARY TABLE STRUCTURE =================
const salaryRows = [
  ["Basic", basicMonthly, basicAnnual],
  ["House Rent Allowance", hraMonthly, hraAnnual],
  ["Dearness Allowance", daMonthly, daAnnual],
  ["Special Allowance", specialMonthly, specialAnnual],
  ["Food Allowance", foodMonthly, foodAnnual],
  ["Misc. Allowance", miscMonthly, miscAnnual],
];

// ================= TOTALS =================
const totalMonthly = round0(
  salaryRows.reduce((sum, row) => sum + row[1], 0)
);

const totalAnnual = round0(
  salaryRows.reduce((sum, row) => sum + row[2], 0)
);

  
  
  
  const firstName = data.candidateName?.trim().split(" ")[0];



  return (
    <>

      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
      // watermarkSrc={company.watermark}
      >


        {/* =====================================================
    PAGE 1 – OFFER LETTER (FIXED LIKE INCREMENT)
===================================================== */}
        {/* =====================================================
    PAGE 1 – OFFER LETTER (FIXED LIKE INCREMENT)
===================================================== */}
        <Box
        >

          {/* CONTENT */}
          <Box
          >
            {/* DATE – RIGHT ALIGNED */}
            {/* <Typography sx={{ textAlign: "right", mb: 0 }}>
      {new Date(data.issueDate || new Date()).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })}
    </Typography> */}

            {/* NAME */}
            <Typography sx={{ mb: 2, fontWeight: 700 }}>
              <b>Name</b> : {data.mrms} {data.candidateName}
            </Typography>

            {/* SUBJECT */}
            <Typography sx={{ mb: 4, fontWeight: 700 }}>
  Subject : Letter of intent for the position of {data.position}
</Typography>


            <Typography sx={{ mb: 3 }}>
              Dear {firstName},
            </Typography>

            <Typography sx={{ mb: 2, textAlign: "justify" }}>
              <b>{company.name}</b> is delighted to offer you the full-time position of{" "}
              <b>{data.position}</b> with an anticipated start date of{" "}
              <b> {new Date(data.joiningDate).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}</b>.
            </Typography>

            <Typography sx={{ mb: 2, textAlign: "justify" }}>
              As the <b>{data.position}</b>, you will be responsible for responsibilities
              and expectations.
            </Typography>

            <Typography sx={{ mb: 2, textAlign: "justify" }}>
              You will report directly to <b>{data.reportingManager}</b> (Manager) at Pune.
              Working hours are from {data.workHours} hrs. a day, 5 days of week.
            </Typography>

            <Typography sx={{ mb: 1, textAlign: "justify" }}>
              The starting salary for this position is{" "}
              <b>{formatCurrency(totalAnnual)}</b> per annum. Payment is on monthly basis
              by direct deposit.
            </Typography>

            <Typography sx={{ mb: 2 }}>
              <b>{company.name}</b> offers a comprehensive benefits program.
            </Typography>

            <Typography sx={{ mb: 2, textAlign: "justify" }}>
              Your employment with company will be on an at-will basis, which means you and the company are free to terminate employment at any time,
              with or without cause or advance notice. This letter is not a contract indicating employment terms or duration.
            </Typography>

            <Typography sx={{ mb: 3 }}>
              Please confirm your acceptance of this offer by signing and returning this
              letter.
            </Typography>

            {/* CLOSING */}
            <Typography sx={{ mb: 1 }}>Yours Sincerely,</Typography>
            <Typography sx={{ mb: 1 }}>
              <b>For {company.name}</b>
            </Typography>

            {/* SIGNATURE */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              {company?.signature && (
                <img src={company.signature} alt="Signature" style={{ height: 60 }} />
              )}
              {company?.stamp && (
                <img src={company.stamp} alt="Stamp" style={{ height: 90 }} />
              )}
            </Box>

            <Typography sx={{ fontWeight: 600 }}>{company.hrName}</Typography>
            <Typography>HR Manager</Typography>
          </Box>


        </Box>

      </A4Page>


      {/* ================================================================================================= */}
      {/* =====================================================
    PAGE 2 – ANNEXURE A (SAME TO SAME)
===================================================== */}

      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
        // watermarkSrc={company.watermark}
      >
        <Box>
          {/* ================= CONTENT ================= */}
          <Box>
            {/* TITLE */}
            <Typography
              align="center"
              fontWeight={600}
              mb={7}
              sx={{
                textDecoration: "underline",
                fontSize: "14px",
              }}
            >
              Annexure A Salary Structure
            </Typography>

            {/* ================= TABLE ================= */}
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0 }}>
              <Table
                sx={{
                  width: "100%",
                  border: "1px solid #000",
                  borderCollapse: "collapse",
                  "& th, & td": {
                    border: "1px solid #000",
                    padding: "6px",
                    fontSize: "15px",
                  },
                }}
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#ffc000" }}>
                    <TableCell sx={{ fontWeight: 700 }}>
                      Salary Components
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      Per month (Rs.)
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      Per Annum (Rs.)
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {salaryRows.map(([name, monthly, annual], i) => (
                                <TableRow key={i}>
                                  <TableCell>{name}</TableCell>
                                  <TableCell align="right">
                                    {formatCurrency(monthly)}
                                  </TableCell>
                                  <TableCell align="right">
                                    {formatCurrency(annual)}
                                  </TableCell>
                                </TableRow>
                              ))}

                  <TableRow sx={{ backgroundColor: "#ffc000" }}>
                    <TableCell sx={{ fontWeight: 700 }}>
                      Total Monthly Gross Salary
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      {formatCurrency(totalMonthly)}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      {formatCurrency(totalAnnual)}
                    </TableCell>
                  </TableRow>
                </TableBody>

              </Table>
            </TableContainer>

            {/* ================= SIGNATURE ================= */}
            <Box sx={{ mt: 9 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                {company.signature && (
                  <img
                    src={company.signature}
                    alt="Signature"
                    style={{ height: 50 }}
                  />
                )}
                {company.stamp && (
                  <img
                    src={company.stamp}
                    alt="Stamp"
                    style={{ height: 100 }}
                  />
                )}
              </Box>

              <Typography sx={{ mt: 1 }}>{company.hrName}</Typography>
              <Typography>HR Manager</Typography>
            </Box>
          </Box>
        </Box>
      </A4Page>
    </>
  );
};

export default DevconsOffer;