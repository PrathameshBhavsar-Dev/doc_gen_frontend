import React from "react";
import { Box, Typography } from "@mui/material";
import A4Layout from "../../../layout/A4Page";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : "";

const JDITRelieving = ({ company, data }) => {
  if (!company || !data) return null;

  const {
    issueDate = "",
    employeeId = "",
    employeeName = "",
    designation = "",
    joiningDate = "",
    relievingDate = "",
    lastWorkingDay = "",
    signatoryName = "",
    signatoryDesignation = "",
    mrms = "",
  } = data;

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
      <Typography align="right" sx={{ mb: 3, textDecorationLine: "underline",textAlign: "center", fontWeight: "bold" }}>
        Relieving Letter
      </Typography>

      {/* ================= DATE ================= */}
      <Typography align="right" sx={{ mb: 3 }}>
        {formatDate(issueDate)}
      </Typography>

      {/* ================= REFERENCE ================= */}
      <Typography sx={{ mb: 4 }}>
        <b>Ref:JDIT/PUN/RMG01/Relieving-Letter/JDIT{employeeId}</b>
      </Typography>

      {/* ================= BODY ================= */}
      <Typography sx={{ mb: 3, textAlign: "justify" }}>
        This letter is to formally acknowledge that{" "}
        <b>{mrms ? `${mrms} ${employeeName}` : employeeName}</b> has been
        relieved from duties with <b>JDIT SOFTWARE SOLUTIONS PVT. LTD.</b> {pronouns.subject} joined our
        organization on <b>{formatDate(joiningDate)}</b> and served as{" "}
        <b>{designation}</b> until <b>{formatDate(lastWorkingDay)}</b>.
      </Typography>


      <Typography sx={{ mb: 3, textAlign: "justify" }}>
        Throughout {pronouns.possessive} employment, {pronouns.subject.toLowerCase()} played
        a significant role. We appreciate {pronouns.object} dedication and
        contributions. During {pronouns.possessive} tenure, {pronouns.subject.toLowerCase()} successfully
        completed all assigned tasks.
      </Typography>

      <Typography sx={{ mb: 6, textAlign: "justify" }}>
        We wish {pronouns.object} success in all future endeavors.
      </Typography>

      {/* ================= SIGNATURE ================= */}
      <Typography sx={{ mb: 2 }}>
        For <b>JDIT SOFTWARE SOLUTIONS PVT. LTD.</b>
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        {/* LEFT SIDE : Signature + Stamp */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {company.signature && (
            <img src={company.signature} alt="Signature" style={{ height: 60 }} />
          )}

          {company.stamp && (
            <img src={company.stamp} alt="Stamp" style={{ height: 100 }} />
          )}
        </Box>
      </Box>

      {/* ================= SIGNATORY DETAILS ================= */}
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: 700 }}>
          {signatoryName || company.hrName}
        </Typography>
        <Typography>{signatoryDesignation || "HR Department Lead"}</Typography>
      </Box>
    </A4Layout>
  );
};

export default JDITRelieving;
