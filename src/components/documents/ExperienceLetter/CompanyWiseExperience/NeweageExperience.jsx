import React from "react";
import { Box, Typography } from "@mui/material";
import A4Layout from "../../../layout/A4Page";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : "";

/* ================= COMMON TEXT STYLE ================= */
const TEXT = {
  fontFamily: "Times New Roman, serif",
  fontSize: "14px",
  lineHeight: 1.8,
};

/* ================= MAIN COMPONENT ================= */
const NeweageExperience = ({ company, data }) => {
  if (!company || !data) return null;

  const {
    issueDate = "",
    mrms = "",
    employeeName = "",
    designation = "",
    joiningDate = "",
    relievingDate = "",
    hrName = company.hrName || "",
  } = data;

  const signatoryDesignation = "HR Relations Lead";

  // Pronouns logic
  const title = mrms.toLowerCase().trim();
  const pronouns =
    title === "miss." || title === "mrs."
      ? { subject: "She", object: "her", possessive: "her" }
      : title === "mx."
      ? { subject: "They", object: "them", possessive: "their" }
      : { subject: "He", object: "him", possessive: "his" };

  return (
    <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
      {/* ================= DATE ================= */}
      <Typography sx={{ ...TEXT, mb: 6, textAlign: "right" }}>
        {formatDate(issueDate)}
      </Typography>

      {/* ================= EMPLOYEE DETAILS ================= */}
      <Typography sx={{ ...TEXT }}>
        <b>{mrms ? `${mrms} ${employeeName}` : employeeName}</b>
      </Typography>

      <Typography sx={{ ...TEXT, mb: 4 }}>
        <b>{designation}</b>
      </Typography>

      {/* ================= BODY ================= */}
      <Typography sx={{ ...TEXT, mb: 2, textAlign: "justify" }}>
        This is to certify that <b>{mrms ? `${mrms} ${employeeName}` : employeeName}</b> has worked as a <b>{designation}</b> at our esteemed organization from{" "}
        <b>{formatDate(joiningDate)}</b> to <b>{formatDate(relievingDate)}</b>.
      </Typography>

      <Typography sx={{ ...TEXT, mb: 6, textAlign: "justify" }}>
        {pronouns.subject} has been responsible, enthusiastic, and hardworking during {pronouns.possessive} tenure. {pronouns.subject} can prove to be an asset to any organization. We wish {pronouns.object} success in {pronouns.possessive} future endeavors.
      </Typography>

      {/* ================= SIGN OFF ================= */}
      <Typography sx={{ ...TEXT, mb: 3 }}>Sincerely,</Typography>

      {/* ================= SIGNATURE & STAMP (ONE LINE) ================= */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 4, mb: 2 }}>
        {company.signature && (
          <img src={company.signature} alt="Signature" style={{ height: 60 }} />
        )}
        {company.stamp && <img src={company.stamp} alt="Stamp" style={{ height: 100 }} />}
      </Box>

      {/* ================= SIGNATORY DETAILS ================= */}
      <Typography sx={{ ...TEXT }}><b>{hrName}</b></Typography>
      <Typography sx={{ ...TEXT }}><b>{signatoryDesignation}</b></Typography>
      <Typography sx={{ ...TEXT }}><b>Department of HR Relations</b></Typography>
    </A4Layout>
  );
};

export default NeweageExperience;
