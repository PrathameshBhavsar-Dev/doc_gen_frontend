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
import sign from "../../../../../assets/images/smartmatrix/Smartmatrix_signature.png";
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
    return "Value too large";
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
  const grossSalary = data.salary;
  const position = data.position;

  /* ======================================================
   ✅ IMAGE MATCHING LOGIC (INPUT IS MONTHLY)
   ====================================================== */

  const round0 = (num) => Math.round(Number(num) || 0);

  /* INPUT IS MONTHLY */
  const monthlyCTC = round0(data.salary || 0);
  const annualCTC = round0(monthlyCTC * 12);

  /* Exact Image Percentages */
  const basicMonthly = round0(monthlyCTC * 0.48);
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);

  /* Adjustment to avoid ₹1 mismatch */
  const used = basicMonthly + hraMonthly + daMonthly + specialMonthly;

  const foodMonthly = round0(monthlyCTC - used);

  /* PF DISPLAY ONLY (NOT INCLUDED IN TOTAL) */
  const pfMonthly = 3750;

  /* Salary Structure */
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

  /* TOTALS (WITHOUT PF) */
  const totalMonthly = monthlyCTC;
  const totalAnnual = annualCTC;
  const lpa = (totalAnnual / 100000).toFixed(1);
  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
        contentTop="45mm"
        contentBottom="28mm"
      >
        <Typography
          sx={{ mb: "6mm", textAlign: "right", fontFamily: "Verdana" }}
        >
          {offerDate}
        </Typography>

        <Typography sx={{ mb: "10mm", textAlign: "center", fontWeight: 700 }}>
          <Box component="span" sx={{ textDecoration: "underline" }}>
            Offer Letter
          </Box>
        </Typography>

        <Typography sx={{ mb: "4mm" }}>Dear {data.candidateName},</Typography>

        <Typography sx={{ mb: "4mm" }}>Welcome to {company.name}.</Typography>

        <Typography sx={{ mb: "4mm" }}>
          With reference to your application and subsequent interviews you had
          with us, we are pleased to confirm your offer of employment to join{" "}
          {company.name}. We value your abilities and believe that you will find
          our work environment to be challenging as well as fulfilling.
        </Typography>

        <Typography sx={{ mb: "4mm" }}>
          With reference to the interview you had with us, we would like to
          offer you the post of <strong>{position}</strong>.
        </Typography>

        <Typography sx={{ mb: "4mm" }}>
          Your commencement date with us will be on or before{" "}
          <strong>{joiningDate}</strong>.
        </Typography>

        <Typography sx={{ mb: "4mm" }}>
          Your annual salary, allowances, and contributions put together will be
          <strong> INR {lpa} LPA.</strong>
        </Typography>

        <Typography sx={{ mb: "13mm" }}>
          The roles and responsibilities and other terms and conditions of your
          employment will be specified in your letter of appointment.
        </Typography>

        <Typography>
          <strong>{company.name}</strong>
        </Typography>
        <Box
          sx={{
            mt: "10mm",
            display: "flex",
            alignItems: "flex-start",

            /* 🔥 CONTROL HORIZONTAL DISTANCE HERE */
            gap: "12mm", // signature close to stamp

            /* 🔥 MOVE ENTIRE BLOCK LEFT */
            ml: "-12mm", // shifts stamp left safely
          }}
        >
          {/* LEFT — STAMP + HR DETAILS */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "120px",
            }}
          >
            <Box
              component="img"
              src={sign}
              alt="Stamp"
              sx={{
                width: 110,
                position: "relative",
                left: "-8mm",
                marginTop: "20mm",
              }}
            />

            {/* HR DETAILS BELOW STAMP */}
            <Box sx={{ mt: "5mm", ml: "12mm" }}>
              <Typography>
                <strong>{company.hrName}</strong>
              </Typography>
              <Typography>
                <strong>HR Manager - HR Services</strong>
              </Typography>
            </Box>
          </Box>

          {/* RIGHT — SIGNATURE */}
          <Box
            sx={{
              mt: "18mm", // signature slightly lower than stamp
              ml: "-30mm",
            }}
          >
            <Box
              component="img"
              src={company.stamp}
              alt="Signature"
              sx={{
                width: 130,
                ml: "2mm",
                mt: "-25mm",
                transform: "translateX(-5mm)", // 👈 stronger left move
              }}
            />
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
        contentTop="45mm"
        contentBottom="28mm"
      >
        <Typography
          sx={{
            fontSize: "11pt",
            fontWeight: "bold",
            textAlign: "center",
            mb: "6mm",
          }}
        >
          Annexure A Salary Structure
        </Typography>

        <TableContainer
          sx={{
            mt: "10mm",
            mb: "20mm",
            fontFamily: "Times New Roman",
          }}
        >
          <Table
            sx={{
              border: "2px solid #000",
              borderCollapse: "collapse",
              tableLayout: "fixed",
              width: "100%",
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#f28c28",
                }}
              >
                <TableCell
                  sx={{
                    width: "50%",
                    border: "1px solid #000",
                    fontWeight: 700,
                    fontSize: "12px",
                    padding: "4px 6px",
                  }}
                >
                  Salary Components
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    width: "25%",
                    border: "1px solid #000",
                    fontWeight: 700,
                    fontSize: "12px",
                    padding: "4px 6px",
                  }}
                >
                  Per month (Rs.)
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    width: "25%",
                    border: "1px solid #000",
                    fontWeight: 700,
                    fontSize: "12px",
                    padding: "4px 6px",
                  }}
                >
                  Per Annum (Rs.)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryComponents.map((row, i) => (
                <TableRow key={i}>
                  <TableCell
                    sx={{
                      border: "1px solid #000",
                      fontSize: "12px",
                      padding: "3px 6px",
                    }}
                  >
                    {row.name}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #000",
                      fontSize: "12px",
                      padding: "3px 6px",
                    }}
                  >
                    {formatCurrency(row.monthly)}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #000",
                      fontSize: "12px",
                      padding: "3px 6px",
                    }}
                  >
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              {/* TOTAL ROW */}
              <TableRow
                sx={{
                  backgroundColor: "#f28c28",
                }}
              >
                <TableCell
                  sx={{
                    border: "1px solid #000",
                    fontWeight: 700,
                    fontSize: "12px",
                    padding: "4px 6px",
                  }}
                >
                  Total Monthly Gross Salary
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    border: "1px solid #000",
                    fontWeight: 700,
                    fontSize: "12px",
                    padding: "4px 6px",
                  }}
                >
                  {formatCurrency(totalMonthly)}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    border: "1px solid #000",
                    fontWeight: 700,
                    fontSize: "12px",
                    padding: "4px 6px",
                  }}
                >
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography>
          <strong>{company.name}</strong>
        </Typography>

        <Box
          sx={{
            mt: "10mm",
            display: "flex",
            alignItems: "flex-start",

            /* 🔥 CONTROL HORIZONTAL DISTANCE HERE */
            gap: "12mm", // signature close to stamp

            /* 🔥 MOVE ENTIRE BLOCK LEFT */
            ml: "-12mm", // shifts stamp left safely
          }}
        >
          {/* LEFT — STAMP + HR DETAILS */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "120px",
            }}
          >
            <Box
              component="img"
              src={sign}
              alt="Stamp"
              sx={{
                width: 110,
                position: "relative",
                left: "-8mm",
                marginTop: "20mm",
              }}
            />

            {/* HR DETAILS BELOW STAMP */}
            <Box sx={{ mt: "5mm", ml: "12mm" }}>
              <Typography>
                <strong>{company.hrName}</strong>
              </Typography>
              <Typography>
                <strong>HR Manager - HR Services</strong>
              </Typography>
            </Box>
          </Box>

          {/* RIGHT — SIGNATURE */}
          <Box
            sx={{
              mt: "18mm", // signature slightly lower than stamp
              ml: "-30mm",
            }}
          >
            <Box
              component="img"
              src={company.stamp}
              alt="Signature"
              sx={{
                width: 130,
                ml: "2mm",
                mt: "-25mm",
                transform: "translateX(-5mm)", // 👈 stronger left move
              }}
            />
          </Box>
        </Box>
      </A4Page>
    </>
  );
};

export default SmartMatrixOffer;
