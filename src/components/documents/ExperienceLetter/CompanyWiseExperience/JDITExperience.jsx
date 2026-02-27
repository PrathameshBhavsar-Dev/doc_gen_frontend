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

/* ================= MAIN COMPONENT ================= */
const JDITExperience = ({ company, data }) => {
  if (!company || !data) return null;

  const {
    issueDate = "",
    employeeId = "",
    employeeName = "",
    designation = "",
    department = "IT",
    startDate = "",
    endDate = "",
    mrms = "",
  } = data;

  const { signature = "", stamp = "", hrName = "HR Department Pune" } = company;

  const title = mrms.toLowerCase().trim();

  const pronouns =
    title === "miss." || title === "mrs."
      ? { subject: "She", object: "her", possessive: "her" }
      : title === "mx."
      ? { subject: "They", object: "them", possessive: "their" }
      : { subject: "He", object: "him", possessive: "his" };

  return (
    <A4Layout
      headerSrc={company.headerImage}
      footerSrc={company.footerImage}
      watermarkSrc={company.watermarkImage}
    >
      {/* ================= DATE ================= */}
      <Typography align="right" sx={{ mb: 4 }}>
        {formatDate(issueDate)}
      </Typography>

      {/* ================= REFERENCE ================= */}
      <Typography sx={{ mb: 4 }}>
        <b>Ref:JDIT/PUN/RMG01/Exp-Letter/JDIT {employeeId}</b>
      </Typography>

      {/* ================= TITLE ================= */}
      <Typography
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 4,
          textTransform: "uppercase",
        }}
      >
        TO WHOMSOEVER IT MAY CONCERN
      </Typography>

      {/* ================= PARAGRAPH 1 ================= */}
      <Typography sx={{ mb: 3, textAlign: "justify" }}>
        It is to certify that <b>{mrms ? `${mrms} ${employeeName}` : employeeName}</b> was employed as a{" "}
        <b>{designation}</b> in the {department} department of{" "}
        <b>JDIT SOFTWARE SOLUTIONS PVT. LTD.</b> from{" "}
        <b>{formatDate(data.joiningDate)}</b> to <b>{formatDate(data.relievingDate)}</b>.
      </Typography>

      {/* ================= PARAGRAPH 2 ================= */}
      <Typography sx={{ mb: 3, textAlign: "justify" }}>
        {pronouns.subject} has exemplary skills in {pronouns.possessive} field. {pronouns.subject} is very attentive to details and has shown due diligence and commitment towards {pronouns.possessive} work throughout {pronouns.possessive} tenure. {pronouns.subject} has made far-sighted decisions that helped in the company’s growth. {pronouns.subject} is a soft-spoken and composed individual, works well under pressure, and treats colleagues respectfully.
      </Typography>

      {/* ================= PARAGRAPH 3 ================= */}
      <Typography sx={{ mb: 3, textAlign: "justify" }}>
        We are sure {pronouns.possessive} passion and dedication will help {pronouns.object} excel in whatever {pronouns.subject.toLowerCase()} chooses to do next. {pronouns.subject} has shown a high level of commitment throughout {pronouns.possessive} time with our company.
      </Typography>

      {/* ================= CLOSING ================= */}
      <Typography sx={{ mb: 6, textAlign: "justify" }}>
        We wish {pronouns.object} all the best for {pronouns.possessive} future.
      </Typography>

      {/* ================= SIGNATORY ================= */}
      <Typography sx={{ fontWeight: "bold", mb: 2 }}>
        For JDIT SOFTWARE SOLUTIONS PVT. LTD.
      </Typography>

      {/* ================= SIGNATURE & STAMP ================= */}
      {(signature || stamp) && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
          {signature && <img src={signature} alt="Signature" style={{ width: 120, height: "auto" }} />}
          {stamp && <img src={stamp} alt="Company Stamp" style={{ width: 100, height: "auto" }} />}
        </Box>
      )}

      {/* ================= SIGNATORY DETAILS ================= */}
      <Typography sx={{ fontWeight: "bold" }}>{hrName}</Typography>
      <Typography sx={{ fontWeight: "bold" }}>HR Department Pune</Typography>
    </A4Layout>
  );
};

export default JDITExperience;
