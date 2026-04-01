// // NimbjaOffer.jsx
// import React from "react";
// import SmartMatrixOfferPage1 from "../../../ExperienceLetter/CompanyWiseExperience/SmartMatrixOfferTemplates/SmartMatrixOfferPage1";
// import SmartMatrixOfferPage2 from "../../../ExperienceLetter/CompanyWiseExperience/SmartMatrixOfferTemplates/SmartMatrixOfferPage2";

// const SmartMatrixOffer = ({ company, data }) => {
//   if (!company || !data) return null;

//   return (
//     <>
//       {/* ================= PAGE 1 : OFFER LETTER ================= */}
//       <SmartMatrixOfferPage1 company={company} data={data} />

//       {/* ================= PAGE 2 : ANNEXURE / SALARY ================= */}
//       <SmartMatrixOfferPage2 company={company} data={data} />
//     </>
//   );
// };

// export default SmartMatrixOffer;

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

/* ================= MAIN COMPONENT ================= */
const SmartMatrixOffer = ({ data, company }) => {
  if (!data || !company) return null;

  const round2 = (num) => Math.round((Number(num) || 0) * 100) / 100;

  /* ================= COMMON ================= */
  const annualCTC = round2(data.salary || 0);

  /* ================= PAGE 1 LOGIC ================= */
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
  const lpa = (annualCTC / 100000).toFixed(1);

  /* ================= PAGE 2 LOGIC ================= */
  const monthlyGross = round2(annualCTC / 12);

  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
  };

  const basicMonthly = round2(monthlyGross * PERCENT.basic);
  const hraMonthly = round2(monthlyGross * PERCENT.hra);
  const daMonthly = round2(monthlyGross * PERCENT.da);
  const specialMonthly = round2(monthlyGross * PERCENT.special);
  const foodMonthly = round2(monthlyGross * PERCENT.food);

  const used =
    basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly;

  const miscMonthly = round2(monthlyGross - used);

  const salaryComponents = [
    { name: "Basic", monthly: basicMonthly, annual: round2(basicMonthly * 12) },
    {
      name: "House Rent Allowance",
      monthly: hraMonthly,
      annual: round2(hraMonthly * 12),
    },
    {
      name: "Dearness Allowance",
      monthly: daMonthly,
      annual: round2(daMonthly * 12),
    },
    {
      name: "Special Allowance",
      monthly: specialMonthly,
      annual: round2(specialMonthly * 12),
    },
    {
      name: "Facility Allowance",
      monthly: miscMonthly,
      annual: round2(miscMonthly * 12),
    },
    {
      name: "Food Allowance",
      monthly: foodMonthly,
      annual: round2(foodMonthly * 12),
    },
  ];

  const totalMonthly = monthlyGross;
  const totalAnnual = annualCTC;
  /* ================= RETURN ================= */
  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
        contentTop="45mm"
        contentBottom="28mm"
      >
        {/* ================= DATE ================= */}
        <Typography
          sx={{
            textAlign: "right",
            fontFamily: "Calibri, sans-serif",
            fontSize: "12pt",
            mb: "10mm",
          }}
        >
          {offerDate}
        </Typography>

        {/* ================= TITLE ================= */}
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "Calibri, sans-serif",
            fontSize: "15pt",
            fontWeight: 600,
            textDecoration: "underline",
            mb: "8mm",
          }}
        >
          Offer Letter
        </Typography>

        {/* ================= BODY ================= */}
        <Box
          sx={{
            fontFamily: "Calibri, sans-serif",
            fontSize: "11pt",
            lineHeight: 1.5,
            textAlign: "justify",
          }}
        >
          <Typography sx={{ mb: "6mm" }}>Dear {data.employeeName},</Typography>

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

        <Typography
          sx={{
            fontFamily: "Calibri, sans-serif",
            fontSize: "15pt",
            fontWeight: 900,
            mt: "2mm",
          }}
        >
          {company.name}
        </Typography>

        {/* ================= SIGNATURES ================= */}
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
              alt="Signature"
              sx={{
                width: 120,
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
              alt="Stamp"
              sx={{
                width: 120,
                ml: "2mm",
                mt: "-25mm",
                transform: "translateX(-5mm)", //  stronger left move
              }}
            />
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page
        headerSrc={company?.header}
        footerSrc={company?.footer}
        contentTop="45mm"
        contentBottom="28mm"
      >
        {/* Title */}
        <Typography
          sx={{
            fontSize: "11pt",
            fontWeight: "bold",
            textAlign: "center",
            mb: "6mm",
            mt: "10mm",
          }}
        >
          Annexure A Salary Structure
        </Typography>

        {/* Salary Table */}
        <TableContainer
          sx={{
            mt: "10mm",
            mb: "8mm",
            fontFamily: "Times New Roman",
          }}
        >
          <Table
            size="small"
            sx={{
              border: "2px solid #000",
              borderCollapse: "collapse",
              width: "100%",
              "& th, & td": {
                border: "1px solid #000",
                padding: "8px 8px",
                fontSize: "14px",
                lineHeight: 1.3,
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f28c28" }}>
                <TableCell
                  sx={{
                    width: "50%",
                    border: "1px solid #000",
                    fontWeight: 700,
                    fontSize: "14px",
                    padding: "7px 6px",
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
                    fontSize: "14px",
                    padding: "7px 6px",
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
                    fontSize: "14px",
                    padding: "7px 6px",
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
                      fontSize: "14px",
                      padding: "10px 6px",
                    }}
                  >
                    {row.name}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #000",
                      fontSize: "14px",
                      padding: "3px 6px",
                    }}
                  >
                    {formatCurrency(row.monthly)}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #000",
                      fontSize: "14px",
                      padding: "3px 6px",
                    }}
                  >
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              {/* TOTAL ROW */}
              <TableRow sx={{ backgroundColor: "#f28c28" }}>
                <TableCell
                  sx={{
                    border: "1px solid #000",
                    fontWeight: 700,
                    fontSize: "14px",
                    padding: "7px 6px",
                  }}
                >
                  Total Monthly Gross Salary
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    border: "1px solid #000",
                    fontWeight: 700,
                    fontSize: "14px",
                    padding: "7px 6px",
                  }}
                >
                  {formatCurrency(totalMonthly)}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    border: "1px solid #000",
                    fontWeight: 700,
                    fontSize: "14px",
                    padding: "7px 6px",
                  }}
                >
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Signature Block */}
        <Typography
          sx={{
            fontFamily: "Calibri, sans-serif",
            fontSize: "15pt",
            fontWeight: 900,
            mt: "20mm",
          }}
        >
          {company.name}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ mb: "8mm" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Box
                  component="img"
                  src={sign}
                  alt="Sign"
                  sx={{ width: 120, mt: "26mm" }}
                />
              </Grid>
              <Grid item>
                <Box
                  component="img"
                  src={company.stamp}
                  alt="Signature"
                  sx={{ width: 120, mt: "4mm", ml: "-2mm" }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: "5mm" }}>
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
