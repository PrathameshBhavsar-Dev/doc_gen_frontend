import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { formatCurrency } from "../../../../../utils/salaryCalculations";
import A4Page from "../../../../layout/A4Page";


const DevconsInternshipWithAnnexure = ({ company, data }) => {
  const firstName = data.employeeName?.split(" ")[0] || "";

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });

  /* ================= SALARY LOGIC (SAME AS DevconsIncrement) ================= */

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

  const numberToWords = (num) => {
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
      "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
      "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];

    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const convert = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
      if (n < 100000)
        return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
      if (n < 10000000)
        return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
      return "";
    };

    return convert(num) + " Only";
  };


  return (
    <>
      {/* ================= PAGE 1 – INTERNSHIP LETTER ================= */}
      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
      // watermarkSrc={company.watermark}
      >



        <Box>
          <Typography align="right" mb={3}>
            {formatDate(data.issueDate)}
          </Typography>

          <Typography mb={1}>
            <strong>Name :</strong> {data.mrms} {data.employeeName}
          </Typography>

          <Typography mb={3}>
            <strong>Subject :</strong> Letter of intent for the Internship of position
            as <strong>{data.designation}</strong>
          </Typography>

          <Typography mb={2}>Dear {firstName},</Typography>

          <Typography mb={2} textAlign="justify">
            We are pleased to offer you the Internship on position as an{" "}
            <strong>{data.designation}</strong> with{" "}
            <strong>Devcons Software Solutions Pvt. Ltd.</strong> with effective date{" "}
            <strong>{formatDate(data.startDate)}</strong> considering your
            performance and support towards the organization.
          </Typography>

          <Typography mb={2} textAlign="justify">
            If there is any change in the date of joining, changes can be taken
            under consideration. Your total Gross salary will be Rs.{" "}
            <strong>
              {formatCurrency(totalAnnual)} (
              {numberToWords(totalAnnual)})
            </strong>{" "}
            per year.
          </Typography>


          <Typography mb={2} textAlign="justify">
            Subject to various deductions as per companies and government policy.
          </Typography>

          <Typography mb={2} textAlign="justify">
            We welcome you to <strong>Devcons Software Solutions Pvt. Ltd.</strong>
            family and hope it would be the beginning of a long and mutually
            beneficial association.
          </Typography>

          <Typography mb={4}>
            Kindly acknowledge the duplicate copy of this letter as an acceptance
            of this offer.
          </Typography>

          <Typography mb={3}>Yours Sincerely,</Typography>
          <Typography fontWeight={700} mb={2}>
            For DEVCONS SOFTWARE SOLUTIONS PVT. LTD.
          </Typography>

          {/* SIGNATURE BLOCK */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Box>
              <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
                {company?.signature && (
                  <img src={company.signature} alt="Signature" style={{ height: 60 }} />
                )}
                {company?.stamp && (
                  <img src={company.stamp} alt="Stamp" style={{ height: 90 }} />
                )}
              </Box>
              {/* <Typography fontWeight={600}>{company.hrName}</Typography> */}
              <Typography fontSize="16px"><b>HR Relations Lead</b></Typography>
            </Box>

            <Box minWidth="260px" mb={3}>
              <Box sx={{ display: "flex", mb: 2 }}>
                <Typography fontSize="16px" mr={1}>
                  Signature :
                </Typography>
                <Box sx={{ flexGrow: 1, borderBottom: "1px solid #000" }} />
              </Box>

              <Typography fontSize="16px">
                Candidate Name : {data.employeeName}
              </Typography>
            </Box>

          </Box>

          <Typography
            mt={4}
            fontSize="16px"
            textAlign="center"
            sx={{ textDecoration: "underline" }}
          >
            <b>Enclosures: Annexure A – Salary Structure</b>
          </Typography>

        </Box>



      </A4Page>

      {/* ================= PAGE 2 – ANNEXURE A (SALARY STRUCTURE) ================= */}
      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
      // watermarkSrc={company.watermark}
      >

        <Box>
          <Typography align="center" fontWeight={600} mb={5} sx={{ textDecoration: "underline" }}>
            Annexure A – Salary Structure
          </Typography>

          <Table
            sx={{
              width: "100%",
              border: "1px solid #000",
              "& th, & td": {
                border: "1px solid #000",
                padding: "4px 6px",
                fontSize: "16px",
              },
            }}
          >
            <TableBody>
              <TableRow sx={{ backgroundColor: "#f2b705" }}>
                <TableCell><strong>Salary Components</strong></TableCell>
                <TableCell align="right"><strong>Per month (Rs.)</strong></TableCell>
                <TableCell align="right"><strong>Per Annum (Rs.)</strong></TableCell>
              </TableRow>

             {salaryRows.map(([name, monthly, annual], i) => (
  <TableRow key={i}>
    <TableCell>{name}</TableCell>
    <TableCell align="right">{formatCurrency(monthly)}</TableCell>
    <TableCell align="right">{formatCurrency(annual)}</TableCell>
  </TableRow>
))}


              <TableRow sx={{ backgroundColor: "#f2b705" }}>
                <TableCell><strong>Total Monthly Gross Salary</strong></TableCell>
                <TableCell align="right"><strong>{formatCurrency(totalMonthly)}</strong></TableCell>
                <TableCell align="right"><strong>{formatCurrency(totalAnnual)}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 10 }}>
            <Box>
              <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
                {company?.signature && (
                  <img src={company.signature} alt="Signature" style={{ height: 65 }} />
                )}
                {company?.stamp && (
                  <img src={company.stamp} alt="Stamp" style={{ height: 95 }} />
                )}
              </Box>
              {/* <Typography fontWeight={600}>{company.hrName}</Typography> */}
              <Typography fontSize="16px"><b>HR Relations Lead</b></Typography>
            </Box>

            <Box minWidth="260px" mb={3}>
              <Box sx={{ display: "flex", mb: 2 }}>
                <Typography fontSize="16px" mr={1}>
                  Signature :
                </Typography>
                <Box sx={{ flexGrow: 1, borderBottom: "1px solid #000" }} />
              </Box>

              <Typography fontSize="16px">
                Candidate Name : {data.employeeName}
              </Typography>
            </Box>

          </Box>
        </Box>



      </A4Page>
    </>
  );
};

export default DevconsInternshipWithAnnexure;
