// SmartMatrixOfferWithPF.jsx

import React from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  TableContainer,
  Grid,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { formatCurrency } from "../../../../../utils/salaryCalculations";
import sign from "../../../../../assets/images/smartmatrix/Smartmatrix_sign.png";
import stamp from "../../../../../assets/images/smartmatrix/Smartmatrix_stamp.png";
/* ================= NUMBER TO WORDS ================= */
const numberToWords = (num) => {
  if (num === 0) return "Zero Rupees Only";
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
        (n % 100 ? " and " + inWords(n % 100) : "")
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
    if (n < 1000000000)
      return (
        inWords(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 ? " " + inWords(n % 10000000) : "")
      );
    return "";
  };

  return inWords(num) + " Rupees Only";
};

const SmartMatrixOffer = ({ company, data }) => {
  if (!company || !data) return null;

  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "";

  const offerDate = fmtDate(data.issueDate);
  const joiningDate = fmtDate(data.joiningDate);
  const position = data.position;

  /* ================= CORRECTED LOGIC ================= */

  const round0 = (num) => Math.round(Number(num) || 0);

  /* ✅ INPUT IS ANNUAL */
  const annualCTC = round0(data.salary || 0);
  const monthlyCTC = round0(annualCTC / 12);

  /* Salary Percentages */
  const basicMonthly = round0(monthlyCTC * 0.48);
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);

  const used = basicMonthly + hraMonthly + daMonthly + specialMonthly;

  const foodMonthly = round0(monthlyCTC - used);

  /* PF (Display Only) */
  const pfMonthly = 3750;

  const salaryComponents = [
    { name: "Basic", monthly: basicMonthly, annual: basicMonthly * 12 },
    {
      name: "House Rent Allowance",
      monthly: hraMonthly,
      annual: hraMonthly * 12,
    },
    { name: "Dearness Allowance", monthly: daMonthly, annual: daMonthly * 12 },
    {
      name: "Special Allowance",
      monthly: specialMonthly,
      annual: specialMonthly * 12,
    },
    { name: "Food Allowance", monthly: foodMonthly, annual: foodMonthly * 12 },
    { name: "Provident Fund (PF)", monthly: pfMonthly, annual: pfMonthly * 12 },
  ];

  const totalMonthly = monthlyCTC;
  const totalAnnual = annualCTC;
  const lpa = (annualCTC / 100000).toFixed(1);

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Typography sx={{ textAlign: "right", mb: "6mm" }}>
          {offerDate}
        </Typography>

        <Typography align="center" sx={{ fontWeight: 700, mb: "8mm" }}>
          <Box component="span" sx={{ textDecoration: "underline" }}>
            Offer Letter
          </Box>
        </Typography>
        <Box
          sx={{
            fontFamily: "Calibri, sans-serif",
            fontSize: "11pt",
            lineHeight: 1.5,
            textAlign: "justify",
          }}
        >
          <Typography sx={{ mb: "6mm" }}>Dear {data.candidateName},</Typography>

          <Typography sx={{ mb: "6mm" }}>Welcome to {company.name}.</Typography>

          <Typography sx={{ mb: "6mm" }}>
            With reference to your application and subsequent interviews you had
            with us, we are pleased to confirm your offer of employment to join{" "}
            {company.name}. We value your abilities and believe that you will
            find our work environment to be challenging as well as fulfilling.
          </Typography>

          <Typography sx={{ mb: "6mm" }}>
            With reference to the interview you had with us, we would like to
            offer you the post of <strong>{position}</strong>.
          </Typography>

          <Typography sx={{ mb: "6mm" }}>
            Your commencement date with us will be on or before{" "}
            <strong>{joiningDate}</strong>.
          </Typography>

          <Typography sx={{ mb: "6mm" }}>
            Your annual salary, allowances, and contributions put together will
            be
            <strong> INR {lpa} LPA.</strong>
          </Typography>

          <Typography sx={{ mb: "12mm" }}>
            The roles and responsibilities and other terms and conditions of
            your employment will be specified in your letter of appointment.
          </Typography>
        </Box>

        <Typography>
          <strong>{company.name}</strong>
        </Typography>

        <Box sx={{ mt: "12mm" }}>
          <Box component="img" src={sign} sx={{ width: 120 }} />
          <Box component="img" src={stamp} sx={{ width: 120 }} />

          <Typography>
            <strong>{company.hrName}</strong>
          </Typography>
          <Typography>
            <strong>HR Manager - HR Services</strong>
          </Typography>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Typography
          align="center"
          sx={{ fontWeight: 700, mb: "8mm", mt: "30px" }}
        >
          Annexure A Salary Structure
        </Typography>

        <TableContainer>
          <Table
            size="small"
            sx={{
              border: "2px solid #000",
              borderCollapse: "collapse",
              width: "100%",
              "& th, & td": {
                border: "1px solid #000",
                padding: "8px 8px", // 🔥 reduces height
                fontSize: "14px", // 🔥 smaller text
                lineHeight: 1.3, // 🔥 tighter spacing
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f28c28" }}>
                <TableCell sx={{ border: "1px solid #000", fontWeight: 700 }}>
                  Salary Components
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ border: "1px solid #000", fontWeight: 700 }}
                >
                  Per month (Rs.)
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ border: "1px solid #000", fontWeight: 700 }}
                >
                  Per Annum (Rs.)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryComponents.map((row, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ border: "1px solid #000" }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #000" }}>
                    {formatCurrency(row.monthly)}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #000" }}>
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow sx={{ backgroundColor: "#f28c28" }}>
                <TableCell sx={{ border: "1px solid #000", fontWeight: 700 }}>
                  Total Monthly Gross Salary
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ border: "1px solid #000", fontWeight: 700 }}
                >
                  {formatCurrency(totalMonthly)}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ border: "1px solid #000", fontWeight: 700 }}
                >
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* Signature Block */}
        <Typography
          sx={{ mt: "20mm", fontFamily: "Verdana, Geneva, sans-serif" }}
        >
          <strong>{company.name}</strong>
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ mb: "8mm" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Box
                  component="img"
                  src={sign}
                  alt="Sign"
                  sx={{ width: 120, mt: "35mm" }}
                />
              </Grid>
              <Grid item>
                <Box
                  component="img"
                  src={company.stamp}
                  alt="Signature"
                  sx={{ width: 120, mt: "10mm", ml: "-2mm" }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: "2mm" }}>
              <Typography>
                <strong>{company.hrName}</strong>
              </Typography>
              <Typography>
                <strong>HR Manager - HR Services</strong>
              </Typography>
            </Box>
          </Box>
        </Box>
      </A4Page>
    </>
  );
};

export default SmartMatrixOffer;
