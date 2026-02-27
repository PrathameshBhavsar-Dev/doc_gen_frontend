import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import A4Page from "../../../layout/A4Page";

const JditCertification = ({ company, data }) => {
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
          has successfully completed {pronouns.possessive} internship at{" "}
          <strong>JDIT SOFTWARE SOLUTIONS PVT. LTD.</strong> from{" "}
          <strong>{data.startDate}</strong> to{" "}
          <strong>{data.completionDate}</strong>.{" "}
          {pronouns.subject} was designated as{" "}
          <strong>{data.role}</strong>.
        </Typography>

        <Box mt={3}>
          <Typography sx={{ fontSize: "14px", lineHeight: 2 }}>
            During the internship, {pronouns.subject.toLowerCase()} demonstrated{" "}
            strong technical skills along with self-motivation to learn new
            skills. {pronouns.possessive.charAt(0).toUpperCase() +
              pronouns.possessive.slice(1)}{" "}
            performance exceeded our expectations and{" "}
            {pronouns.subject.toLowerCase()} was able to complete the assigned
            tasks on time. We wish {pronouns.object} all the best for{" "}
            {pronouns.possessive} upcoming career.
          </Typography>
        </Box>

        {/* ================= SIGNATURE ================= */}
        <Box mt={8}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
            For JDIT SOFTWARE SOLUTIONS PVT. LTD.
          </Typography>

          <Box mt={4}>
            <img
              src={company.signature}
              alt="Signature"
              width="140"
              height="60"
            />
            {company.stamp && (
              <img
                src={company.stamp}
                alt="Company Stamp"
                style={{ height: 100, marginLeft: 20 }}
              />
            )}
          </Box>

          <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
            {company.hrName}
          </Typography>

          <Typography sx={{ fontSize: "13px" }}>
            HR Department, Pune
          </Typography>
        </Box>

        {/* ================= CANDIDATE NAME ================= */}
       
      </Box>
    </A4Page>
  );
};

export default JditCertification;
