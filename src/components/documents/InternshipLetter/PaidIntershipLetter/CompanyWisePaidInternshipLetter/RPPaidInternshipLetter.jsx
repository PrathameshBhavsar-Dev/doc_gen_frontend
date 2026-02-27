import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import A4Page from "../../../../layout/A4Page";
import { formatCurrency } from "../../../../../utils/salaryCalculations";

const RPInternshipOffer = ({ company, data }) => {
  /* ================= SALARY LOGIC (SAME AS RP INCREMENT) ================= */

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });

const round0 = (num) => Math.round(num);
  const monthlyCTC = round0(Number(data.stipend || 0));

  // ================= MONTHLY CTC =================

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

  return (
    <>
      {/* ======================================================
          PAGE 1 – INTERNSHIP OFFER LETTER
      ====================================================== */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box sx={{ color: "#000" }}>
          <Typography align="right" mb={3}>
            {formatDate(data.issueDate)}
          </Typography>

          <Typography mb={2}>
            Name : Mr. {data.employeeName}
          </Typography>
          <Typography mb={2}>
            Address : {data.address}
          </Typography>

          <Typography mb={3}>
            Subject : Letter of intent for the Internship of position of{" "}
           <b>{data.designation}</b> 
          </Typography>

          <Typography mb={3}>Dear {data.employeeName},</Typography>

          <Typography mb={3}>
            We are pleased to offer you the Internship of position of{" "}
            {data.designation}. As discussed by us you are requested to join on{" "}
            {formatDate(data.startDate)}.
          </Typography>

          <Typography mb={3}>
            If there is any change in the date of joining changes can be taken
            under consideration. Your total Gross salary will be Rs.{" "}
            {formatCurrency(totalAnnual)} per year.
          </Typography>

          <Typography mb={3}>
            Subject to various deductions as per companies and government policy.
          </Typography>

          <Typography mb={4}>
            We welcome you to R P Business Solutions LLP and hope it would be the
            beginning of a long and mutually beneficial association.
          </Typography>

          <Typography mb={5}>
            Kindly acknowledge the duplicate copy of this letter as acceptance
            of this offer.
          </Typography>

          <Typography>Yours Sincerely,</Typography>

            {/* ================= SIGNATURE BLOCK ================= */}
<Box
  mt={4}
  sx={{
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  }}
>
  {/* LEFT SIDE – COMPANY SIGNATURE */}
  <Box>
    <Typography mb={1}>For R P BUSINESS SOLUTIONS LLP.</Typography>

    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
      <img
        src={company.signature}
        alt="Signature"
        style={{ height: 50 }}
      />
      <img
        src={company.stamp}
        alt="Stamp"
        style={{ height: 70 }}
      />
    </Box>

    <Typography mt={1} fontWeight={600}>
      {company.hrName}
    </Typography>
    <Typography>HR Division Pune</Typography>
  </Box>

  {/* RIGHT SIDE – CANDIDATE SIGN */}
  <Box
    sx={{
      minWidth: "260px",
      textAlign: "left",
      alignSelf: "flex-end",
    }}
  >
    <Typography>
      Signature: ______________________
    </Typography>
    <Typography mt={2}>
      Candidate Name: {data.employeeName}
    </Typography>
  </Box>
</Box>

</Box>

{/* ================= ENCLOSURE ================= */}
<Typography
  mt={6}
  fontSize="15px"
  textAlign="center"
  fontWeight={600}
  sx={{ textDecoration: "underline" }}
>
  Enclosures: Annexure A – Salary Structure
</Typography>

      </A4Page>

      {/* ======================================================
          PAGE 2 – ANNEXURE A (SALARY STRUCTURE)
      ====================================================== */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box >
          <Typography align="center" fontWeight={700} mb={4}>
            Annexure A Salary Structure
          </Typography>

          <Table
            sx={{
              width: "100%",
              border: "1px solid black",
              borderCollapse: "collapse",
              "& td": {
                border: "1px solid black",
                padding: "6px",
                fontSize: "14px",
              },
            }}
          >
            <TableBody>
              <TableRow sx={{ backgroundColor: "#ff0000" }}>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                  Salary Components
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }} align="right">
                  Per month (Rs.)
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }} align="right">
                  Per annum (Rs.)
                </TableCell>
              </TableRow>

               {salaryRows.map(([name, monthly, annual], i) => (
                <TableRow key={i}>
                  <TableCell>{name}</TableCell>
                  <TableCell align="right">{formatCurrency(monthly)}</TableCell>
                  <TableCell align="right">{formatCurrency(annual)}</TableCell>
                </TableRow>
              ))}

              <TableRow sx={{ backgroundColor: "#ff0000" }}>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                  Total Monthly Gross Salary
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }} align="right">
                  {formatCurrency(totalMonthly)}
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }} align="right">
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Box
  sx={{
    position: "relative",
    width: "100%",
    mt: 6,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  }}
>
  {/* ================= LEFT SIDE ================= */}
  <Box>
    <Typography fontSize="16px" mb={1}>
      Aditi Dhambare
    </Typography>

    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
      {/* SIGNATURE */}
      <img
        src={company.signature}
        alt="Signature"
        style={{ height: 50 }}
      />

      {/* STAMP */}
      <img
        src={company.stamp}
        alt="Stamp"
        style={{ height: 80 }}
      />
    </Box>

    <Typography mt={1} fontSize="16px">
      HR Division Pune
    </Typography>
  </Box>

  {/* ================= RIGHT SIDE ================= */}
  <Box sx={{ textAlign: "left", mt: 4, minWidth: "280px" }}>
    <Typography fontSize="16px">
      Signature : ____________________
    </Typography>

    <Typography fontSize="16px" mt={2}>
      Candidate : {data.employeeName}
    </Typography>
  </Box>
</Box>

        </Box>


      </A4Page>
    </>
  );
};

export default RPInternshipOffer;
