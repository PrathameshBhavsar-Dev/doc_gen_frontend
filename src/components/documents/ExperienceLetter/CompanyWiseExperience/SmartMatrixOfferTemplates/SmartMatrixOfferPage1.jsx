import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import sign from "../../../../../assets/images/smartmatrix/Smartmatrix_signature.png";

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
  const monthlySalary = Number(data.salary || 0);
  const annualSalary = monthlySalary * 12;
  const lpa = (annualSalary / 100000).toFixed(1);
  const position = data.position;

  return (
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
        <Typography sx={{ mb: "6mm" }}>Dear {data.candidateName},</Typography>

        <Typography sx={{ mb: "6mm" }}>Welcome to {company.name}.</Typography>

        <Typography sx={{ mb: "6mm" }}>
          With reference to your application and subsequent interviews you had
          with us, we are pleased to confirm your offer of employment to join{" "}
          {company.name}. We value your abilities and believe that you will find
          our work environment to be challenging as well as fulfilling.
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
          Your annual salary, allowances, and contributions put together will be
          <strong> INR {lpa} LPA.</strong>
        </Typography>

        <Typography sx={{ mb: "12mm" }}>
          The roles and responsibilities and other terms and conditions of your
          employment will be specified in your letter of appointment.
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
  );
};

export default SmartMatrixOfferPage1;
