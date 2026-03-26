import React, { useMemo } from "react";
import {
  Typography,
  Box,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";

/* ================= SALARY UTILITIES ================= */
import {
  generateOfferLetterComponents,
  formatCurrency,
  numberToWords,
} from "../../../../../utils/salaryCalculations";

/* ================= COMMON TEXT ================= */
const TEXT = {
  fontFamily: "Verdana, Geneva, sans-serif",
  fontSize: "14px",
  lineHeight: 1.8,
};

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    })
    : "";


export default function JDITIncrement({ company, data }) {
  const {
    employeeName = "",
    employeeId = "",
    issueDate = "",
    effectiveDate = "",
    newCTC = 0,
  } = data || {};

  const firstName = employeeName.split(" ")[0] || "";

  /* ================= SALARY LOGIC ================= */
  const round0 = (num) => Math.round(num);

  // Source of truth (Annual CTC)
  const annualCTC = round0(Number(data.newCTC || 0));
  const monthlyCTC = round0(annualCTC / 12);

  // ================= PERCENTAGE BREAKUP =================
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);

  /* ================= STATIC PF ================= */
  const pfMonthly = 3750;

  // ================= BALANCING BASIC =================
  const basicMonthly = monthlyCTC - hraMonthly - daMonthly - specialMonthly - foodMonthly - pfMonthly;

  // ================= ANNUAL VALUES =================
  const basicAnnual = round0(basicMonthly * 12);
  const hraAnnual = round0(hraMonthly * 12);
  const daAnnual = round0(daMonthly * 12);
  const specialAnnual = round0(specialMonthly * 12);
  const foodAnnual = round0(foodMonthly * 12);
  const pfAnnual = round0(pfMonthly * 12);

  // ================= SALARY TABLE STRUCTURE =================
  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["House Rent Allowance", hraMonthly, hraAnnual],
    ["Dearness Allowance", daMonthly, daAnnual],
    ["Special Allowance", specialMonthly, specialAnnual],
    ["Food Allowance", foodMonthly, foodAnnual],
    ["Provident Fund (PF)", pfMonthly, pfAnnual],
  ];

  // ================= TOTALS =================
  const totalMonthly = monthlyCTC;
  const totalAnnual = monthlyCTC * 12;

  const salaryInWords = numberToWords(totalAnnual);

  return (
    <>
      {/* ================= PAGE 1 – INCREMENT LETTER ================= */}
      <A4Layout company={company}>
        <Box sx={TEXT}>
          <Typography align="right">
            {formatDate(issueDate)}
          </Typography>

          <Typography sx={{ mt: 5 }}>
            Dear {firstName},
          </Typography>

          <Typography sx={{ mt: 3 }}>
            We are delighted to inform you that in recognition of your exceptional
            performance and dedication as <b>{data.designation}</b> your salary has been increased.

            Your new annual salary will be{" "}
            <b>Rs. {formatCurrency(totalAnnual)}</b>, per annum
            effective from{" "}
            <b>{formatDate(effectiveDate)}</b>.
          </Typography>

          <Typography sx={{ mt: 3 }}>
            Thank you for your hard work and dedication. We sincerely appreciate
            your efforts and look forward to your continued contributions to our team.
          </Typography>

          <Typography sx={{ mt: 5 }}>Best Regards,</Typography>

          {/* SIGNATURE & STAMP */}
          <Box sx={{ display: "flex", gap: 3, mt: 5 }}>
            {company.incrementSignature && (
              <Box component="img" src={company.incrementSignature} sx={{ height: 50 }} />
            )}
            {company.stamp && (
              <Box component="img" src={company.stamp} sx={{ height: 100 }} />
            )}
          </Box>
        </Box>
        <Typography><b>{company.hrNameOne}</b></Typography>
        <Typography><b>CEO & Managing Director</b></Typography>
      </A4Layout>

      {/* ================= PAGE 2 – SALARY ANNEXURE ================= */}
      <A4Layout company={company}>
        <Typography
          align="center"
          sx={{ ...TEXT, fontWeight: "bold" }}
        >
          Salary Annexure
        </Typography>

        <Box
          sx={{
            width: "150px",
            height: "3px",          // ⬅ makes the line bold
            backgroundColor: "#000",
            color: "#fff !important",
            margin: "0 auto 30px",
          }}
        />


        {/* EMPLOYEE INFO */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={TEXT}>
            Employee Code : {employeeId}
          </Typography>
          <Typography sx={TEXT}>
            Employee Name : {data.mrms}{employeeName}
          </Typography>
          <Typography sx={TEXT}>
            Effective Date : {formatDate(effectiveDate)}
          </Typography>
        </Box>

        {/* SALARY TABLE Start*/}

        <TableContainer sx={{ mb: "4mm" }}>
          <Table
            size="small"
            sx={{
              border: "1px solid #333",       // 🔽 thinner outer border
              borderCollapse: "collapse",
              width: "100%",
              color: "#ffff",
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#000" }}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",          // 🔽 smaller font
                    color: "#fff !important",
                    py: "0.4mm",               // 🔽 compact header height
                  }}
                >
                  Salary Components
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    color: "#fff !important",
                    py: "0.4mm",
                  }}
                >
                  Per month (Rs.)
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    color: "#fff !important",
                    py: "0.4mm",
                  }}
                >
                  Per Annum (Rs.)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* 🔽 Removed tall blank row – keeps table compact */}

              {salaryRows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell
                    sx={{
                      border: "1px solid #333",
                      fontSize: "9.75pt",       // 🔽 smaller body text
                      py: "0.35mm",             // 🔽 tight rows
                    }}
                  >
                    {row[0]}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #333",
                      fontSize: "9.75pt",
                      py: "0.35mm",
                    }}
                  >
                    {formatCurrency(row[1])}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #333",
                      fontSize: "9.75pt",
                      py: "0.35mm",
                    }}
                  >
                    {formatCurrency(row[2])}
                  </TableCell>
                </TableRow>
              ))}


              {/* Totals Row */}
              <TableRow sx={{ backgroundColor: "#000" }}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    py: "0.4mm",
                    color: "#fff !important",
                  }}
                >
                  Total Monthly Gross Salary
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    py: "0.4mm",
                    color: "#fff !important",
                  }}
                >
                  {formatCurrency(totalMonthly)}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    py: "0.4mm",
                    color: "#fff !important",
                  }}
                >
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>


        {/* Salary table closed  */}

        <Typography sx={{ ...TEXT, mt: 4 }}>
          Please note that the details in this communication are confidential and
          you are requested not to share the same with others.
        </Typography>

        {/* SIGNATURE & STAMP */}


      </A4Layout>
    </>
  );
}