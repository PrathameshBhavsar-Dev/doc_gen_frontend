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

/* ================= A4 PAGE WRAPPER ================= */
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
    }}
  >
    {/* HEADER */}
    {company?.header && (
      <Box>
        <img
          src={company.header}
          alt="Header"
          style={{ width: "100%", display: "block" }}
        />
      </Box>
    )}

    {/* CONTENT */}
    <Box sx={{ px: "30mm", pt: "30mm" }}>{children}</Box>
  </Box>
);

/* ================= MAIN COMPONENT ================= */
const QuickUnPaidInternshipLetter = ({ company, data }) => {
  if (!company || !data) return null;

  const {
    mrms = "Ms.",
    employeeName = "",
    designation = "Trainee",
    startDate,
    endDate,
  } = data;

  // ✅ Dynamic pronouns
  const pronoun = getPronounsByTitle(mrms);

  return (
    <A4Page company={company}>
      {/* TITLE */}
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 15,
          letterSpacing: 1,
          mb: 4,
          mt: -8,
        }}
      >
        LETTER OF INTERNSHIP
      </Typography>

      {/* BODY */}
      <Typography sx={{ fontSize: 13.5, lineHeight: 2, mb: 2, mt: 10 }}>
        This is to certify that{" "}
        <strong>
          {mrms} {employeeName}
        </strong>{" "}
        has done {pronoun.possessive} internship at{" "}
        <strong>QUICK MANAGEMENT SERVICES</strong>.
      </Typography>

      <Typography sx={{ fontSize: 13.5, lineHeight: 2, mb: 2 }}>
        From <strong>{formatDate(startDate)}</strong> –{" "}
        <strong>{formatDate(endDate)}</strong>.{" "}
        {pronoun.subject} was designated as{" "}
        <strong>{designation}</strong>.
      </Typography>

      <Typography sx={{ fontSize: 13.5, lineHeight: 2, mb: 6 }}>
        During the internship {pronoun.subject} demonstrated
        strong skills with self-motivation to learn new skills.{" "}
        {pronoun.possessive} performance exceeded our
        expectations and {pronoun.subject} was able to complete
        the assigned tasks on time. We wish{" "}
        {pronoun.object} all the best for{" "}
        {pronoun.possessive} upcoming career.
      </Typography>

      {/* SIGNATURE BLOCK */}
      <Typography sx={{ fontSize: 13.5, mb: 4, mt: 17 }}>
        For <strong>QUICK MANAGEMENT SERVICES</strong>
      </Typography>

      <Box sx={{ position: "relative", height: 120, mt: 6 }}>
        {/* SIGNATURE */}
        {company?.signature && (
          <img src={company.signature} alt="Signature" style={{ height: 55 }} />
        )}

        {/* STAMP */}
        {company?.stamp && (
          <img
            src={company.stamp}
            alt="Stamp"
            style={{
              position: "absolute",
              left: 150,
              top: -10,
              width: 85,
              opacity: 0.9,
            }}
          />
        )}

        <Typography sx={{ fontSize: 13.5, fontWeight: "bold", mt: 1 }}>
          {company.hrName}
        </Typography>
        <Typography sx={{ fontSize: 13.5 }}>
          <strong>Group Leader – HR Shared Services</strong>
        </Typography>
      </Box>
    </A4Page>
  );
};

export default QuickUnPaidInternshipLetter;
