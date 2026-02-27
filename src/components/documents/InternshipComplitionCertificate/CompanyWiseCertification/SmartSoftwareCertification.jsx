import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import A4Page from "../../../layout/A4Page";

const SmartSoftwareCertification = ({ company, data }) => {
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
        {/* ================= CERTIFICATE TITLE ================= */}
        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: 700, letterSpacing: 1 }}
        >
          LETTER OF INTERNSHIP
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* ================= CERTIFICATE CONTENT ================= */}
        <Typography sx={{ fontSize: "14px", lineHeight: 1.9 }}>
          This is to certify that{" "}
          <strong>
            {data.mrms} {data.employeeName}
          </strong>{" "}
          has successfully completed {pronouns.possessive} internship at{" "}
          <strong>Smart Software Services (I) Pvt. Ltd.</strong> from{" "}
          <strong>{data.startDate}</strong> to{" "}
          <strong>{data.completionDate}</strong>.{" "}
          {pronouns.subject} was designated as{" "}
          <strong>{data.role}</strong>.
        </Typography>

        <Box mt={3}>
          <Typography sx={{ fontSize: "14px", lineHeight: 1.9 }}>
            During the internship, {pronouns.subject.toLowerCase()} demonstrated{" "}
            strong technical skills along with self-motivation to learn new
            technologies. {pronouns.subject} consistently exceeded our
            expectations and successfully completed the assigned tasks on time.
            We wish {pronouns.object} all the best for {pronouns.possessive}{" "}
            future career.
          </Typography>
        </Box>

        {/* ================= SIGNATURE SECTION ================= */}
        <Box mt={6}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
            SMART SOFTWARE SERVICES (I) PVT. LTD.
          </Typography>

          <Box mt={4}>
            <img
              src={company.signature}
              alt="signature"
              width="140"
              height="60"
            />
            {company.stamp && (
            <img src={company.stamp} alt="Stamp" style={{ height: 100 }} />
          )}
          </Box>

          <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
            {company.hrName}
          </Typography>

          <Typography sx={{ fontSize: "13px" }}>
            HR Department, Pune
          </Typography>
          
          <Box mt={2} textAlign="right">
          <Typography sx={{ fontSize: "13px" }}>
            Signature: ______________________
          </Typography>
        </Box>
        </Box>

        {/* ================= CANDIDATE NAME ================= */}



        
        <Box mt={2} mr={2} textAlign="right">
          <Typography sx={{ fontSize: "13px" }}>
            Candidate Name: <strong>{data.employeeName}</strong>
          </Typography>
        </Box>
      </Box>
    </A4Page>
  );
};

export default SmartSoftwareCertification;
