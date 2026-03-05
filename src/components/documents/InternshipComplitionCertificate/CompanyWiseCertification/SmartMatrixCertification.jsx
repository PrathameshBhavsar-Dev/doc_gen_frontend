import React from "react";
import { Typography, Box } from "@mui/material";
import A4Page from "../../../layout/A4Page";

const SmartMatrixCertification = ({ company, data }) => {
  if (!company || !data) return null;

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "";

  const issueDate = formatDate(data.issueDate);
  const startDate = formatDate(data.startDate);
  const endDate = formatDate(data.endDate);

  return (
    <A4Page
      headerSrc={company.header}
      footerSrc={company.footer}
      watermarkSrc={company.watermark}
      contentTop="55mm"
      contentBottom="35mm"
    >
      {/* DATE (Right aligned like image) */}
      <Typography
        sx={{
          textAlign: "right",
          fontSize: "11pt",
          mb: "8mm",
        }}
      >
        Date: {issueDate}
      </Typography>

      {/* TITLE */}
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: 600,
          textDecoration: "underline",
          fontSize: "14pt",
          mb: "8mm",
        }}
      >
        Internship Certificate
      </Typography>

      {/* BODY CONTENT */}
      <Box sx={{ fontSize: "11pt", lineHeight: 1.6 }}>
        <Typography sx={{ mb: "6mm" }}>
          We are pleased to certify that <strong>{data.employeeName}</strong>,
          has joined our group to work on internship with organization{" "}
          <strong>{company.name}</strong> The internship program held on{" "}
          <strong>{startDate}</strong> to <strong>{endDate}</strong>.
        </Typography>

        <Typography sx={{ mb: "6mm" }}>
          During the internship period, <strong>{data.employeeName}</strong> was
          actively participated in project related tasks, shown their skills and
          abilities in <strong>{data.designation}</strong>.
        </Typography>

        <Typography sx={{ mb: "6mm" }}>
          Through this internship experience,{" "}
          <strong>{data.employeeName}</strong> adopted practical knowledge, best
          practices and exposure to real-world scenarios, which will undoubtedly
          enhance their academic and professional development.
        </Typography>

        <Typography sx={{ mb: "8mm" }}>
          Thank you for your successful completion & cooperation and support in
          facilitating this internship opportunity.
        </Typography>

        <Typography sx={{ mb: "12mm" }}>Yours Sincerely,</Typography>
      </Box>

      {/* COMPANY NAME */}
      <Typography sx={{ fontWeight: 600, mb: "20mm" }}>
        {company.name}
      </Typography>

      {/* SIGNATURE + STAMP BLOCK */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "30mm",
        }}
      >
        {/* SIGNATURE */}
        <Box>
          <Box
            component="img"
            src={company.signature}
            alt="Signature"
            sx={{ width: 120, marginTop: "10mm" }}
          />
          <Typography sx={{ mt: "5mm", fontWeight: 600 }}>
            {company.hrName}
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            HR Manager - HR Services
          </Typography>
        </Box>

        {/* STAMP */}
        <Box>
          <Box
            component="img"
            src={company.stamp}
            alt="Stamp"
            sx={{ width: 110, marginLeft: -20, marginTop: -10 }}
          />
        </Box>
      </Box>
    </A4Page>
  );
};

export default SmartMatrixCertification;
