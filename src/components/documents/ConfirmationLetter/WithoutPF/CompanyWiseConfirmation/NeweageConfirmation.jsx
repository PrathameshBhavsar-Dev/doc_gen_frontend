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

/* ================= HELPERS ================= */

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

const round2 = (v) => Math.round((Number(v) || 0) * 100) / 100;

const numberToWords = (num = 0) => {
  if (!num) return "Zero Rupees Only";

  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " " + inWords(n % 100) : "")
      );
    if (n < 100000)
      return (
        inWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 ? " " + inWords(n % 1000) : "")
      );
    if (n < 10000000)
      return (
        inWords(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 ? " " + inWords(n % 100000) : "")
      );
    return (
      inWords(Math.floor(n / 10000000)) +
      " Crore" +
      (n % 10000000 ? " " + inWords(n % 10000000) : "")
    );
  };

  return `${inWords(Math.round(num))} Rupees Only`;
};

const NeweageConfirmation = ({ company = {}, data = {} }) => {
  if (!company || !data) return null;

  const firstName = data.employeeName?.split(" ")[0] || "";

  /* ================= SMARTMATRIX LOGIC (MONTHLY INPUT) ================= */

  const monthlyCTC = round2(Number(data.totalSalary || 0));
  const annualCTC = round2(monthlyCTC * 12);

  /* Percentage Structure */
  const basic = round2(monthlyCTC * 0.4);
  const hra = round2(monthlyCTC * 0.18);
  const da = round2(monthlyCTC * 0.12);
  const special = round2(monthlyCTC * 0.16);
  const food = round2(monthlyCTC * 0.06);

  /* Adjustment to prevent mismatch */
  const misc = round2(monthlyCTC - (basic + hra + da + special + food));

  const salaryRows = [
    ["Basic", basic],
    ["House Rent Allowance", hra],
    ["Dearness Allowance", da],
    ["Special Allowance", special],
    ["Food Allowance", food],
    ["Misc. Allowance", misc],
  ];

  const totalMonthly = monthlyCTC;
  const totalAnnual = annualCTC;

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box sx={{ fontSize: "14px", lineHeight: 1.7 }}>
          <Typography align="right" mb={3}>
            {formatDate(data.issueDate)}
          </Typography>

          <Typography
            align="center"
            mb={3}
            sx={{ textDecoration: "underline" }}
          >
            Confirmation Letter
          </Typography>

          <Typography mb={1}>
            <strong>Name :</strong> {data.employeeName}
          </Typography>

          <Typography mb={2}>
            <strong>Address :</strong> {data.address}
          </Typography>

          <Typography mb={3}>
            <strong>Subject :</strong> Letter of confirmation for continued
            services as <strong>{data.position}</strong>.
          </Typography>

          <Typography mb={2}>Dear {firstName},</Typography>

          <Typography mb={2} textAlign="justify">
            We are pleased to confirm your continued services as{" "}
            <strong>{data.position}</strong> with{" "}
            <strong>{company.name}</strong> effective{" "}
            <strong>{formatDate(data.effectiveDate)}</strong>.
          </Typography>

          <Typography mb={2} textAlign="justify">
            Your total Gross salary will be Rs.{" "}
            <strong>{formatCurrency(totalAnnual)}</strong> (
            {numberToWords(totalAnnual)}) per annum, subject to deductions as
            per company and government policies.
          </Typography>

          <Typography mb={2}>
            We look forward to your continued growth and contribution.
          </Typography>

          <Typography mt={6}>
            <strong>For {company.name}</strong>
          </Typography>

          <Typography mt={3}>
            <strong>{company.hrName}</strong>
          </Typography>
          <Typography>HR Relations Lead</Typography>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Typography align="center" fontWeight={600} mb={4}>
          Annexure A – Salary Structure
        </Typography>

        <Table
          sx={{
            width: "100%",
            border: "1px solid #000",
            "& td": {
              border: "1px solid #000",
              padding: "6px",
              fontSize: "14px",
            },
          }}
        >
          <TableBody>
            <TableRow sx={{ backgroundColor: "#26acba" }}>
              <TableCell>
                <b>Salary Components</b>
              </TableCell>
              <TableCell align="center">
                <b>Per month (Rs.)</b>
              </TableCell>
              <TableCell align="center">
                <b>Per Annum (Rs.)</b>
              </TableCell>
            </TableRow>

            {salaryRows.map(([name, monthly], i) => (
              <TableRow key={i}>
                <TableCell>{name}</TableCell>
                <TableCell align="center">{formatCurrency(monthly)}</TableCell>
                <TableCell align="center">
                  {formatCurrency(monthly * 12)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "#26acba" }}>
              <TableCell>
                <b>Total Monthly Gross Salary</b>
              </TableCell>
              <TableCell align="center">
                <b>{formatCurrency(totalMonthly)}</b>
              </TableCell>
              <TableCell align="center">
                <b>{formatCurrency(totalAnnual)}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Typography sx={{ marginTop: "60px" }}>
          <strong>For {company.name}</strong>
        </Typography>

        <Typography mt={3}>
          <strong>{company.hrName}</strong>
        </Typography>
        <Typography>HR Relations Lead</Typography>
      </A4Page>
    </>
  );
};

export default NeweageConfirmation;
