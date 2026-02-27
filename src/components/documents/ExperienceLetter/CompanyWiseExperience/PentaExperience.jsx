
// src/components/documents/PentaExperience.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

// ---------- Utils ----------
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

// ---------- Pronoun Resolver ----------
const getPronounsByTitle = (title = "") => {
  const t = title.toLowerCase().replace(".", "");

  switch (t) {
    case "mr":
      return {
        subject: "he",
        object: "him",
        possessive: "his",
      };

    case "ms":
    case "miss":
    case "mrs":
      return {
        subject: "she",
        object: "her",
        possessive: "her",
      };

    case "mx":
      return {
        subject: "they",
        object: "them",
        possessive: "their",
      };

    default:
      return {
        subject: "they",
        object: "them",
        possessive: "their",
      };
  }
};

// ---------- A4 Page Wrapper ----------
const Page = ({ children }) => (
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
    {children}
  </Box>
);

// ---------- Main Component ----------
const PentaExperience = ({ company, data }) => {
  if (!company || !data) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>Loading Experience Letter...</Typography>
      </Box>
    );
  }

  // Reference Number
  const referenceNo = `PENTA\\PUN\\RMG01\\Exp-Letter${
    data.employeeId ? `\\${data.employeeId}` : ""
  }`;

  // Pronouns
  const pronoun = getPronounsByTitle(data.mrms);

  return (
    <Page>
      {/* Header */}
      {company.header && (
        <img src={company.header} alt="Header" style={{ width: "100%" }} />
      )}

      {/* Main Content */}
      <Box sx={{ px: "30mm", pt: "25mm", pb: "40mm" }}>
        {/* Date */}
        <Typography sx={{ fontSize: 13, textAlign: "right", mb: 2 }}>
          {formatDate(data.issueDate)}
        </Typography>

        {/* Reference */}
        <Typography sx={{ fontSize: 13, mb: 6 }}>
          <strong>Ref:</strong> {referenceNo}
        </Typography>

        {/* Title */}
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            mb: 6,
          }}
        >
          TO WHOMSOEVER IT MAY CONCERN
        </Typography>

        {/* Body */}
        <Typography sx={{ fontSize: 14, lineHeight: 2, mb: 3 }}>
          This is to certify that{" "}
          <strong>
            {data.mrms} {data.employeeName}
          </strong>{" "}
          (Employee ID: <strong>{data.employeeId}</strong>) was in our
          employment from{" "}
          <strong>{formatDate(data.joiningDate)}</strong> to{" "}
          <strong>{formatDate(data.relievingDate)}</strong>. At the time of
          leaving the services of the company,{" "}
          {pronoun.subject} was designated as{" "}
          <strong>{data.designation}</strong>.
        </Typography>

        <Typography sx={{ fontSize: 14, lineHeight: 2, mb: 15 }}>
          We wish {pronoun.object} success in{" "}
          {pronoun.possessive} future career.
        </Typography>

        {/* Signature */}
        <Typography sx={{ fontSize: 14, mb: 4 }}>
          For <strong>{company.name}</strong>
        </Typography>

        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, mb: 2 }}>
          {company.signature && (
            <img src={company.signature} alt="Signature" height={39} />
          )}
          {company.stamp && (
            <img src={company.stamp} alt="Stamp" height={89} />
          )}
        </Box>

        <Typography sx={{ fontSize: 14, fontWeight: "bold", mt: 2 }}>
          {company.hrName}
        </Typography>
        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
          Group Leader - Shared HR Services
        </Typography>
      </Box>

      {/* Footer */}
      {company.footer && (
        <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <img src={company.footer} alt="Footer" style={{ width: "100%" }} />
        </Box>
      )}
    </Page>
  );
};

export default PentaExperience;
