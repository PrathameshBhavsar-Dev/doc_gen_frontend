import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import A4Page from "../../../../layout/A4Page";

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
const SmartMatrixOfferPage1 = ({ company, data }) => {
  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
          day: "2-digit", // ✅ FIX
          month: "long", // ✅ long month allowed
          year: "numeric",
        })
      : "";


  const offerDate = fmtDate(data.issueDate);
  const joiningDate = fmtDate(data.joiningDate);
  const grossSalary = data.salary;
  const grossSalaryinWords = numberToWords(Math.round(grossSalary));
  const position = data.position;

  return (
    <A4Page
      headerSrc={company.header}
      footerSrc={company.footer}
      contentTop="45mm"
      contentBottom="28mm"
      company={company}
    >
      {/* ================= DATE ================= */}
      <Typography
        sx={{
          mb: "6mm",
          textAlign: "right",
          fontFamily: "Verdana, Geneva, sans-serif",
        }}
      >
        {offerDate}
      </Typography>

      {/* ================= SUBJECT ================= */}
      <Typography
        sx={{
          mb: "10mm",
          textAlign: "center",
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "11pt",
          fontWeight: 700,
        }}
      >
        <Box component="span" sx={{ textDecoration: "underline" }}>
          Offer Letter
        </Box>
      </Typography>

      {/* ================= BODY ================= */}
      <Typography
        sx={{
          textAlign: "justify",
          lineHeight: 1.6,
          mb: "6mm",
          fontFamily: "Verdana, Geneva, sans-serif",
        }}
      >
        Dear {data.candidateName},
      </Typography>

      <Typography
        sx={{
          textAlign: "justify",
          lineHeight: 1.6,
          mb: "6mm",
          fontFamily: "Verdana, Geneva, sans-serif",
        }}
      >
        Welcome to {company.name}.
      </Typography>

      <Typography
        sx={{
          textAlign: "justify",
          lineHeight: 1.6,
          mb: "6mm",
          fontFamily: "Verdana, Geneva, sans-serif",
        }}
      >
        With reference to your application and subsequent interviews you had
        with us, we are pleased to confirm your offer of employment to join{" "}
        {company.name}. We value your abilities and believe that you will find
        our work environment to be challenging as well as fulfilling.
      </Typography>

      <Typography
        sx={{
          textAlign: "justify",
          lineHeight: 1.6,
          mb: "6mm",
          fontFamily: "Verdana, Geneva, sans-serif",
        }}
      >
        With reference to the interview you had with us, we would like to offer
        you the post of <strong>{position}</strong>.
      </Typography>

      <Typography
        sx={{
          textAlign: "justify",
          lineHeight: 1.6,
          mb: "6mm",
          fontFamily: "Verdana, Geneva, sans-serif",
        }}
      >
        Your commencement date with us will be on or before{" "}
        <strong>{joiningDate}</strong>.
      </Typography>

      <Typography
        sx={{
          textAlign: "justify",
          lineHeight: 1.6,
          mb: "6mm",
          fontFamily: "Verdana, Geneva, sans-serif",
        }}
      >
        Your annual salary, allowances, and contributions put together will be
        <strong> INR {(grossSalary / 100000).toFixed(1)} LPA.</strong>
      </Typography>

      <Typography
        sx={{
          textAlign: "justify",
          lineHeight: 1.6,
          mb: "10mm",
          fontFamily: "Verdana, Geneva, sans-serif",
        }}
      >
        The roles and responsibilities and other terms and conditions of your
        employment will be specified in your letter of appointment.
      </Typography>

      {/* ================= CLOSING ================= */}
      <Typography
        sx={{ mb: "6mm", fontFamily: "Verdana, Geneva, sans-serif" }}
      ></Typography>

      <Typography sx={{ mb: "2mm", fontFamily: "Verdana, Geneva, sans-serif" }}>
        <strong>{company.name}</strong>
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
            src={company.signature}
            alt="Stamp"
            sx={{ width: 110, position: "relative", left: "-8mm", marginTop:"10mm" }}
          />

          {/* HR DETAILS BELOW STAMP */}
          <Box sx={{ mt: "12mm", ml: "12mm" }}>
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
  );
};

export default SmartMatrixOfferPage1;
