import React from "react";
import { Box, Typography } from "@mui/material";
import A4Layout from "../../../layout/A4Page";

/* ================= SAFE DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) return "";

  return parsedDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

/* ================= MAIN COMPONENT ================= */
const SmartSoftwareExperience = ({ company, data }) => {
  if (!company || !data) return null;

  const {
    employeeName = "",
    department = "",
    joiningDate = "",
    relievingDate = "",
    employeeId = "",
    mrms = "",
  } = data;

  /* ================= PRONOUN LOGIC ================= */
  const title = mrms.toLowerCase().trim();

  const pronouns =
    title === "miss." || title === "mrs."
      ? { subject: "She", object: "her", possessive: "her" }
      : title === "mx."
        ? { subject: "They", object: "them", possessive: "their" }
        : { subject: "He", object: "him", possessive: "his" };

  const issueDate = data.experience_letter?.issueDate ?? data.issueDate;
  const designation = data.currentDesignation ?? data.designation ?? "";

  return (
    <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
      {/* Date */}
      <Typography align="right" sx={{ mb: 4 }}>
        {formatDate(issueDate)}
      </Typography>

      {/* Reference */}
      <Typography sx={{ mb: 6 }}>
        <strong>Ref: SMART\PUN\RMG01\Exp-Letter\{employeeId}</strong>
      </Typography>

      {/* Title */}
      <Typography
        align="center"
        sx={{
          fontWeight: 700,
          fontSize: 20,
          mb: 6,
          textDecoration: "underline",
        }}
      >
        EXPERIENCE CERTIFICATE
      </Typography>

      {/* Body */}
      <Typography sx={{ textAlign: "justify", mb: 3, lineHeight: 1.8 }}>
        This is to certify that{" "}
        <strong>
          {mrms} {employeeName}
        </strong>{" "}
        was employed with{" "}
        <strong>Smart Software Services (I) Pvt. Ltd.</strong> as{" "}
        <strong>{designation}</strong> in the{" "}
        <strong>{department} Department</strong> from{" "}
        <strong>{formatDate(joiningDate)}</strong> to{" "}
        <strong>{formatDate(relievingDate)}</strong>.
      </Typography>

      <Typography sx={{ textAlign: "justify", mb: 3, lineHeight: 1.8 }}>
        During {pronouns.possessive} tenure, we observed {pronouns.object} to be
        obedient, honest, and dedicated in {pronouns.possessive} work.
      </Typography>

      <Typography sx={{ textAlign: "justify", mb: 8, lineHeight: 1.8 }}>
        We wish {pronouns.object} every success and a bright future in all{" "}
        {pronouns.possessive} future endeavors.
      </Typography>

      {/* Signature */}
      <Box
        sx={{
          mt: 10,
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            mb: 1,
          }}
        >
          For Smart Software Services (I) Pvt. Ltd.
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 3,
            height: "100px",
          }}
        >
          {company.signature && (
            <Box
              component="img"
              src={company.signature}
              alt="Signature"
              sx={{
                width: "140px",
                height: "70px",
                objectFit: "contain",
              }}
            />
          )}

          {company.stamp && (
            <Box
              component="img"
              src={company.stamp}
              alt="Stamp"
              sx={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
            />
          )}
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            Sandeep Patil
          </Typography>

          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            HR Manager – HR Shared Services
          </Typography>
        </Box>
      </Box>
    </A4Layout>
  );
};

export default SmartSoftwareExperience;
