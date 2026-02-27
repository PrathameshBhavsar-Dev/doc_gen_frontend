import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import A4Page from "../../../layout/A4Page";

const NeweageCertification = ({ company, data }) => {
  /* ================= PRONOUN LOGIC ================= */
  const title = (data?.mrms || "").toLowerCase().trim();

  const pronouns =
    title === "miss." || title === "mrs."
      ? { subject: "She", object: "her", possessive: "her" }
      : title === "mx."
      ? { subject: "They", object: "them", possessive: "their" }
      : { subject: "He", object: "him", possessive: "his" };

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <Box px={6} py={4}>
        {/* ================= TITLE ================= */}
        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: 700, letterSpacing: 1 }}
        >
          LETTER OF INTERNSHIP
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* ================= CONTENT ================= */}
        <Typography sx={{ fontSize: "14px", lineHeight: 2 }}>
          This is to certify that{" "}
          <strong>
            {data.mrms} {data.employeeName}
          </strong>{" "}
          has done {pronouns.possessive} internship at{" "}
          <strong>NEWEAGE CLOUD SOFTWARE SERVICES PVT. LTD.</strong>{" "}
          from <strong>{data.startDate}</strong> to{" "}
          <strong>{data.completionDate}</strong>.{" "}
          {pronouns.subject} was designated as{" "}
          <strong>{data.role}</strong>.
        </Typography>

        <Box mt={3}>
          <Typography sx={{ fontSize: "14px", lineHeight: 2 }}>
            During the internship, {pronouns.subject.toLowerCase()} demonstrated{" "}
            strong skills with self-motivation to learn new skills.{" "}
            {pronouns.subject} performance exceeded our expectations and{" "}
            {pronouns.subject.toLowerCase()} was able to complete the given
            tasks on time. We wish {pronouns.object} all the best for{" "}
            {pronouns.possessive} upcoming career.
          </Typography>
        </Box>

        {/* ================= COMPANY & SIGNATURE ================= */}
        <Box mt={6}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
            NEWEAGE CLOUD SOFTWARE SERVICES PVT. LTD.
          </Typography>

          <Box mt={3} display="flex" gap={4} alignItems="center">
            {company.signature && (
              <img
                src={company.signature}
                alt="Signature"
                width="140"
                height="60"
              />
            )}

            {company.stamp && (
              <img
                src={company.stamp}
                alt="Company Stamp"
                height="90"
              />
            )}
          </Box>

          <Typography sx={{ fontSize: "14px", fontWeight: 600, mt: 2 }}>
            {company.hrName || "HR Relations Lead"}
          </Typography>
        </Box>

        {/* ================= CANDIDATE SIGN ================= */}
        <Box mt={4} textAlign="right">
          <Typography sx={{ fontSize: "13px" }}>
            Signature: ______________________
          </Typography>
        </Box>

        {/* ================= CANDIDATE NAME ================= */}
        <Box mt={2} textAlign="right">
          <Typography sx={{ fontSize: "13px" }}>
            Candidate Name: <strong>{data.employeeName}</strong>
          </Typography>
        </Box>
      </Box>
    </A4Page>
  );
};

export default NeweageCertification;
