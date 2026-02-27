
import React from "react";
import { Box, Typography } from "@mui/material";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

/* ================= PRONOUN RESOLVER ================= */
const getPronounsByTitle = (title = "") => {
  const t = title.toLowerCase().replace(".", "");

  switch (t) {
    case "mr":
      return { subject: "he", object: "him", possessive: "his" };

    case "ms":
    case "miss":
    case "mrs":
      return { subject: "she", object: "her", possessive: "her" };

    case "mx":
      return { subject: "they", object: "them", possessive: "their" };

    default:
      return { subject: "they", object: "them", possessive: "their" };
  }
};

/* ================= PAGE WRAPPER (A4) ================= */
const A4Page = ({ company, children }) => (
  <Box
    sx={{
      width: "210mm",
      minHeight: "297mm",
      backgroundColor: "#fff",
      fontFamily: "'Times New Roman', Times, serif",
      color: "#000",
      mx: "auto",
      position: "relative",
      pageBreakAfter: "always",
      overflow: "hidden",
    }}
  >
    {/* HEADER */}
    {company?.header && (
      <img
        src={company.header}
        alt="Header"
        style={{ width: "100%", display: "block" }}
      />
    )}

    {/* WATERMARK */}
    {company?.watermark && (
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: company.brandColors?.watermarkOpacity || 0.05,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <img src={company.watermark} alt="Watermark" style={{ width: "60%" }} />
      </Box>
    )}

    {/* CONTENT */}
    <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>

    {/* FOOTER */}
    {company?.footer && (
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <img src={company.footer} alt="Footer" style={{ width: "100%" }} />
      </Box>
    )}
  </Box>
);

/* ================= MAIN LETTER ================= */
const PentaUnpaidInternshipLetter = ({ company, data }) => {
  if (!company || !data) return null;

  const {
    mrms = "Ms.",
    employeeName = "",
    designation = "Trainee",
    startDate,
    endDate,
    issueDate,
  } = data;

  // ✅ Dynamic pronouns
  const pronoun = getPronounsByTitle(mrms);

  return (
    <A4Page company={company}>
      {/* CONTENT BLOCK */}
      <Box sx={{ px: "32mm", pt: "35mm", pb: "45mm" }}>
        {/* TITLE */}
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
            letterSpacing: 1,
            mb: 10,
          }}
        >
          LETTER OF INTERNSHIP
        </Typography>

        {/* BODY */}
        <Typography sx={{ fontSize: 14, lineHeight: 2, mb: 2, mt: 10 }}>
          This is to certify that{" "}
          <strong>
            {mrms} {employeeName}
          </strong>{" "}
          has done {pronoun.possessive} internship in{" "}
          <strong>{company.name}</strong>.
        </Typography>

        <Typography sx={{ fontSize: 14, lineHeight: 2, mb: 2 }}>
          From <strong>{formatDate(startDate)}</strong> –{" "}
          <strong>{formatDate(endDate)}</strong>,{" "}
          {pronoun.subject} was designated as{" "}
          <strong>{designation}</strong>.
        </Typography>

        <Typography sx={{ fontSize: 14, lineHeight: 2, mb: 4 }}>
          During the internship {pronoun.subject} demonstrated
          strong skills with self-motivation to learn new skills.{" "}
          {pronoun.possessive} performance exceeded our
          expectations and {pronoun.subject} was able to
          complete the assigned tasks on time. We wish{" "}
          {pronoun.object} all the best for{" "}
          {pronoun.possessive} career.
        </Typography>

        {/* SIGNATURE SECTION */}
        <Box sx={{ mt: 10 }}>
          <Typography sx={{ fontSize: 14, mt: 10 }}>
            For <strong>{company.name}</strong>
          </Typography>

          <Box sx={{ position: "relative", mt: 10 }}>
            {/* STAMP */}
            {company?.stamp && (
              <img
                src={company.stamp}
                alt="Stamp"
                style={{
                  position: "absolute",
                  left: 175,
                  top: -19,
                  width: 90,
                  opacity: 0.9,
                }}
              />
            )}

            {/* SIGNATURE */}
            {company?.signature && (
              <img
                src={company.signature}
                alt="Signature"
                style={{ height: 45, display: "block" }}
              />
            )}

            <Typography sx={{ fontSize: 14, fontWeight: "bold", mt: 1 }}>
              {company.hrName}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>
              <strong>Group Leader – Shared HR Services</strong>
            </Typography>
          </Box>
        </Box>
      </Box>
    </A4Page>
  );
};

export default PentaUnpaidInternshipLetter;
