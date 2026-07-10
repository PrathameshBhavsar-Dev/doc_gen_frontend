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
  fontFamily: "Bahnschrift",
  fontSize: "11pt",
  letterSpacing: "0.15px",
  lineHeight: 1.5,
  color: "#000",
};

const formatIndianCurrency = (value) => {
  if (!value) return "";
  return Number(value).toLocaleString("en-IN");
};

  /* ================= SALARY LOGIC (MONTHLY INPUT) ================= */


const NimbjaOfferPage1 = ({ company, data, totalAnnual }) => {
  const issueDate = data?.offer_letter?.issueDate ?? data?.issueDate;
  const offerDate = formatDate(issueDate);  

const firstName = data.employeeName?.trim()?.split(" ")[0] || "Candidate";
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
            mt: "-2mm",
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

            fontSize: "15px",
          }}
        >
          Offer Letter
        </Typography>
        {/* NAME */}
        <Typography sx={{ mb: 2, fontFamily: "Bahnschrift" }}>
          Name : {data.mrms} {data.employeeName}
        </Typography>

        <Typography sx={{ mb: 2, fontFamily: "Bahnschrift", mt: "-2mm" }}>
          Address : {data.address}
        </Typography>

        {/* SUBJECT */}
        <Typography sx={{ mb: 2, fontFamily: "Bahnschrift", mt: "-2mm" }}>
          Subject : Letter of intent for the position of {data.joiningDesignation  ?? data.position}
        </Typography>

        <Typography sx={{ mb: 3, fontFamily: "Bahnschrift" }}>
          Dear {firstName},
        </Typography>

        {/* ================= PARAGRAPHS ================= */}
        <Typography
          sx={{ mb: 2, textAlign: "justify", fontFamily: "Bahnschrift" }}
        >
          Welcome to {company.name} Quality is not just a destination but a
          journey in which every employee contributes. We invite you to be part
          of this journey! This has reference to your application and subsequent
          interviews you had with us. We are pleased to offer you the role of{" "}
          <b>{data.joiningDesignation ?? data.position} </b>
          {/* {new Date(data.joiningDate).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })} */}
          .
        </Typography>

        <Typography
          sx={{ mb: 2, textAlign: "justify", fontFamily: "Bahnschrift" }}
        >
          On Joining, your all-inclusive Cost to the Company (CTC) will be{" "}
          <Typography
            component="span"
            sx={{ fontWeight: 600, fontFamily: "Bahnschrift" }}
          >
            Rs. {formatIndianCurrency(data.salary || data.ctc)}/-
          </Typography>{" "}
          as per Annexure A. This offer is made on the basis of your having
          furnished to the Company information and documents in support of your
          age, academic qualifications, previous work experience, relieving
          letter from your last employer and other particulars on or before your
          day of joining. The Company shall conduct a background and reference
          check as per Company policy and this appointment is conditional upon
          receiving positive feedback. If at any time it is found that you have
          furnished false information or withheld or suppressed any material
          fact or information, the Company shall be entitled to forthwith
          terminate your employment without notice. You are required to join the
          services of the Company at the earliest, but in any case, not later
          than{" "}
          <Typography
            component="span"
            sx={{ fontWeight: 600, fontFamily: "Bahnschrift" }}
          >
            {formatDate(data.offerValidTill)}.
          </Typography>
        </Typography>
        <Typography sx={{ mb: 2, fontFamily: "Bahnschrift" }}>
          Thanking you and looking forward to having you with us.
        </Typography>

        <Typography sx={{ mb: 2, fontFamily: "Bahnschrift", fontSize: "20px" }}>
          For <b>{company.name} </b>
        </Typography>

        {/* ================= SIGNATURE BLOCK ================= */}
        {/* ================= SIGNATURE BLOCK (ABOVE FOOTER) ================= */}
        {/* <Box
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
          > */}
        {/* LEFT — HR */}
        {/* <Grid item>
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
                    Gap: "3",
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
            </Grid> */}

        {/* RIGHT — STAMP + CANDIDATE */}
        {/* <Grid item>
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
                <strong>{data.employeeName}</strong> {/* 🔑 NAME BOLD */}
        {/* </Typography>
            </Grid> */}
        {/* </Grid>
        </Box> */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              {company?.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: 45, marginTop: "7mm" }}
                />
              )}
              {company?.stamp && (
                <img src={company.stamp} alt="Stamp" style={{ height: 100 }} />
              )}
            </Box>
            <strong>
              <Typography mt={1} sx={{ fontFamily: "Bahnschrift" }}>
                <strong>{company.hrName}</strong>
              </Typography>
              <Typography sx={{ fontFamily: "Bahnschrift", mt: -1 }}>
                <strong>HR Relations Lead</strong>
              </Typography>
            </strong>
          </Box>

          <Box minWidth="250px" sx={{ mt: 13, fontFamily: "Bahnschrift" }}>
            <Typography sx={{ fontFamily: "Bahnschrift" }}>
              <strong>Signature:</strong> __________________
            </Typography>
            <Typography mt={2} sx={{ mt: "-1mm", fontFamily: "Bahnschrift" }}>
              <strong>Candidate Name:</strong>{" "}
              <strong>{data.employeeName}</strong>
            </Typography>
          </Box>
        </Box>
      </Box>
    </A4Page>
  );
};

export default NimbjaOfferPage1;
