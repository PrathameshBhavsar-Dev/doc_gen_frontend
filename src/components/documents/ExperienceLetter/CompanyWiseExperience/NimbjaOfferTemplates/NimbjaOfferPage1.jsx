import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import A4Page from "../../../../layout/A4Page";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

/* ================= BASE TEXT STYLE ================= */
const baseText = {
  fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
  fontSize: "11pt",
  letterSpacing: "0.15px",
  lineHeight: 1.5,
  color: "#000",
};

const formatIndianCurrency = (value) => {
  if (!value) return "";
  return Number(value).toLocaleString("en-IN");
};

const NimbjaOfferPage1 = ({ company, data }) => {
  const offerDate = formatDate(data.issueDate);
  const joiningDate = formatDate(data.joiningDate);
  const firstName = data.candidateName?.split(" ")[0] || "";
  /* ================= SALARY LOGIC (MONTHLY INPUT) ================= */

  const round2 = (num) => Math.round((Number(num) || 0) * 100) / 100;

  // 🔥 INPUT IS MONTHLY
  const monthlyGross = round2(data.salary || data.newCTC || 0);

  // Annual derived
  const totalAnnual = round2(monthlyGross * 12);
  return (
    <A4Page
      headerSrc={company.header}
      footerSrc={company.footer}
      // watermarkSrc={company.watermarkImage || company.watermark || null}
      // contentTop="48mm"
      // contentBottom="28mm"
      // company={company}
    >
      <Box
        component="img"
        src={company.watermark}
        alt="watermark"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          opacity: 0.4,
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      {/* CONTENT */}
      <Box
        className="a4-content-only"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ================= DATE ================= */}
        <Typography
          sx={{
            ...baseText,
            fontWeight: 600,
            textAlign: "right",
            mb: "9mm",
            mt: "-12mm",
          }}
        >
          {offerDate}
        </Typography>

        <Typography
          sx={{
            textAlign: "Center",
            marginTop: "-8mm",
            mb: "5mm",
            fontFamily: "Verdana",
            textDecoration: "underline",
            fontSize: "15px",
          }}
        >
          Offer Letter
        </Typography>

        {/* ================= DETAILS ================= */}
        <Typography
          sx={{
            ...baseText,
            mb: "2.5mm",
            fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
          }}
        >
          Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
          <Typography
            component="span"
            sx={{
              fontWeight: "",
              fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
            }}
          >
            {data.candidateName}
          </Typography>
        </Typography>

        <Typography sx={{ ...baseText, mb: "2.5mm" }}>
          Address&nbsp;&nbsp;&nbsp;:{" "}
          <Typography
            component="span"
            sx={{
              fontWeight: "",
              fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
            }}
          >
            {data.address}
          </Typography>
        </Typography>

        <Typography sx={{ ...baseText, mb: "5mm", fontFamily: "Bahnschrift" }}>
          Subject&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
          <Typography
            component="span"
            sx={{
              borderBottom: "1px solid #000",
              display: "inline",
              paddingBottom: "1px",
              fontFamily: "Bahnschrift",
            }}
          >
            Letter of intent for the position of {data.position}.
          </Typography>
        </Typography>

        {/* ================= GREETING ================= */}
        <Typography sx={{ ...baseText, mb: "5mm" }}>
          Dear{" "}
          <Typography
            component="span"
            sx={{ fontWeight: 400, fontFamily: "Bahnschrift" }}
          >
            {firstName}
          </Typography>
          ,
        </Typography>

        {/* ================= PARAGRAPHS ================= */}
        <Typography
          sx={{
            ...baseText,
            textAlign: "justify",
            mb: "5mm",
            marginTop: "-2mm",
          }}
        >
          Welcome to{" "}
          <Typography
            component="span"
            sx={{
              fontWeight: 500,
              fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
            }}
          >
            {company.name}
          </Typography>
          Quality is not just a destination but a journey in which every
          employee contributes. We invite you to be part of this journey!
          <br />
          This has reference to your application and subsequent interviews you
          had with us.
          <br />
          We are pleased to offer you the role of{" "}
          <strong>{data.position}.</strong>
        </Typography>
        <Typography
          sx={{ ...baseText, textAlign: "justify", mb: "2mm", mt: "2mm" }}
        >
          {/* with us. We are pleased to offer you the role of{" "} */}
          <Typography component="span" sx={{ fontWeight: 600 }}></Typography>
        </Typography>

        <Typography sx={{ ...baseText, textAlign: "justify", mb: "5mm" }}>
          On Joining, your all-inclusive Cost to the Company (CTC) will be{" "}
          <Typography component="span" sx={{ fontWeight: 600 }}>
            Rs. {formatIndianCurrency(totalAnnual)}/-
          </Typography>{" "}
          as per Annexure A. This offer is made on the basis of your having
          furnished to the Company information and documents in support of your
          age, academic qualifications, previous work experience, relieving
          letter from your last employer and other particulars on or before your
          day of joining. The Company shall conduct a background and reference
          check as per Company policy and this appointment is conditional upon
          receiving positive feedback.
          <br />
          You are required to join the services of the Company at the earliest,
          but in any case, not later than{" "}
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {joiningDate}.
          </Typography>
        </Typography>
        <Typography sx={{ ...baseText, textAlign: "justify", mb: "5mm" }}>
          Thanking you and looking forward to having you with us. .
        </Typography>

        <Typography
          sx={{
            ...baseText,
            mb: "5mm",
            fontFamily: "Bahnschrift",
            fontSize: "18pt",
          }}
        >
          For <strong>{company.name}</strong>
        </Typography>

        {/* ================= SIGNATURE BLOCK ================= */}
        {/* ================= SIGNATURE BLOCK (ABOVE FOOTER) ================= */}
        <Box
          sx={{
            mt: "5mm",
            mb: "20mm", // 🔑 IMPORTANT: pushes content ABOVE footer
            fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
          }}
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="flex-start"
          >
            {/* LEFT — HR */}
            <Grid item>
              {company.signature && (
                <Box
                  component="img"
                  src={company.signature}
                  alt="Signature"
                  sx={{
                    width: "45mm",
                    display: "block",
                    mb: "19mm",
                    mt: "9mm",
                  }}
                />
              )}

              <strong>
                <Typography sx={{ fontWeight: 600 }}>
                  {company.hrName}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: '"Bahnschrift", "Segoe UI", sans-serif', // 🔑 ADDED
                    fontSize: "12pt", // 🔑 ADDED
                    mt: "mm", // 🔑 ADDED
                  }}
                >
                  <strong>HR Relations Lead</strong>
                </Typography>
              </strong>
            </Grid>

            {/* RIGHT — STAMP + CANDIDATE */}
            <Grid item>
              {company.stamp && (
                <Box
                  component="img"
                  src={company.stamp}
                  alt="Company Stamp"
                  sx={{
                    display: "block",
                    mb: "4mm",
                    ml: "-52mm",
                    height: 100,
                  }}
                />
              )}

              <Typography
                sx={{
                  fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
                  mt: "10mm", // 🔑 ADDED
                }}
              >
                <strong>Signature :</strong> _________________________
              </Typography>

              <Typography
                sx={{
                  fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
                  mt: "3mm", // 🔑 ADDED
                }}
              >
                <strong>Candidate Name:</strong>{" "}
                <strong>{data.candidateName}</strong> {/* 🔑 NAME BOLD */}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </A4Page>
  );
};

export default NimbjaOfferPage1;
