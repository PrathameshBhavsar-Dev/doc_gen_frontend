import React from "react";
import { Box, Typography } from "@mui/material";
import A4Page from "../../../layout/A4Page";

const DevconsProjectCompletion = ({ company, data }) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const title = (data?.mrms || "").toLowerCase().trim();

  const pronouns =
    title === "miss." || title === "mrs."
      ? { subject: "She", object: "her", possessive: "her" }
      : title === "mx."
        ? { subject: "They", object: "them", possessive: "their" }
        : { subject: "He", object: "him", possessive: "his" };

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#fff",
        fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
        "& *": {
          fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
        },
      }}
    >
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        {/* ================= CONTENT ================= */}
        <Box>
          {/* TITLE */}
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 700,
              textTransform: "uppercase",
              mb: 6,
              letterSpacing: "0.5px",
            }}
          >
            LETTER OF INTERNSHIP COMPLETION
          </Typography>

          {/* BODY */}
          <Typography sx={{ mb: 2, textAlign: "justify" }}>
            This is to certify that{" "}
            <strong>
              {data.employeeName}
            </strong>{" "}
            has done {pronouns.possessive} internship at{" "}
            <strong>DEVCONS SOFTWARE SOLUTIONS PVT. LTD.</strong> from{" "}
            <strong>{formatDate(data.startDate)}</strong> to{" "}
            <strong>{formatDate(data.completionDate)}</strong>.
          </Typography>

          <Typography sx={{ mb: 9, textAlign: "justify" }}>
            During the internship, {pronouns.subject.toLowerCase()} has demonstrated{" "}
            {pronouns.possessive} skills with self-motivation to learn new skills.{" "}
            {pronouns.possessive.charAt(0).toUpperCase() +
              pronouns.possessive.slice(1)}{" "}
            performance exceeded our expectations and {pronouns.subject.toLowerCase()} was
            able to complete the given tasks on time. {pronouns.subject} was designated as <strong>{data.role}</strong> with project
            named <strong>{data.projectName}</strong>. We wish {pronouns.object} all the
            best for {pronouns.possessive} upcoming career.
          </Typography>


          


          {/* SIGN OFF */}
          <Typography sx={{ mb: 1 }}>Yours faithfully,</Typography>

          <Typography sx={{ fontWeight: 700, mb: 3, fontSize: "13px" }}>
            For DEVCONS SOFTWARE SOLUTIONS PVT. LTD.
          </Typography>

          {/* SIGNATURE SECTION */}
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
            {company?.signature && (
              <img
                src={company.signature}
                alt="Signature"
                style={{ height: 55 }}
              />
            )}

            {company?.stamp && (
              <img
                src={company.stamp}
                alt="Stamp"
                style={{ height: 85 }}
              />
            )}
          </Box>

          <Typography sx={{ fontWeight: 600, mt: 2, fontSize: "13px" }}>
            {company.hrName}
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
            HR Relations Lead
          </Typography>
        </Box>
      </A4Page>
    </Box>
  );
};

export default DevconsProjectCompletion;
