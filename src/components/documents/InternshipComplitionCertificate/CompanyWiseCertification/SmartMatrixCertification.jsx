import React from "react";
import { Typography, Box } from "@mui/material";
import A4Page from "../../../layout/A4Page";
import sign from "../../../../assets/images/smartmatrix/Smartmatrix_sign.png";
import stamp from "../../../../assets/images/smartmatrix/Smartmatrix_stamp.png";
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
  const endDate = formatDate(data.completionDate);

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
          fontSize: "12pt",
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
          // textDecoration: "underline",
          fontSize: "14pt",
          mb: "8mm",
        }}
      >
        Internship Certificate
      </Typography>

      {/* BODY CONTENT */}
      <Box sx={{ fontSize: "11pt", lineHeight: 1.6 }}>
        <Typography sx={{ mb: "6mm" }}>
          We are pleased to certify that{data.employeeName}, has joined our
          group to work on internship with organization{" "}
          <strong>{company.name}</strong>. The internship program held on{" "}
          {startDate} to {endDate}.
        </Typography>

        <Typography sx={{ mb: "6mm" }}>
          During the internship period, {data.employeeName} was actively
          participated in project related tasks, shown their skills and
          abilities as {data.role}.
        </Typography>

        <Typography sx={{ mb: "6mm" }}>
          Through this internship experience, {data.employeeName} adopted
          practical knowledge, best practices and exposure to real-world
          scenarios, which will undoubtedly enhance their academic and
          professional development.
        </Typography>

        <Typography sx={{ mb: "8mm" }}>
          Thank you for your successful completion & cooperation and support in
          facilitating this internship opportunity.
        </Typography>

        <Typography sx={{ mb: "12mm" }}>Yours Sincerely,</Typography>
      </Box>

      {/* COMPANY NAME */}
      {/* <Typography sx={{ fontWeight: 600, mb: "20mm" }}>
        {company.name}
      </Typography> */}

      {/* SIGNATURE + STAMP BLOCK */}
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "30mm",
        }}
      >
        <Box>
          <Box
            component="img"
            src={sign}
            alt="Signature"
            sx={{ width: 110, marginTop: "10mm" }}
          />
          <Typography sx={{ mt: "5mm", fontWeight: 600 }}>
            {company.hrName}
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            HR Manager - HR Services
          </Typography>
        </Box>

        <Box>
          <Box
            component="img"
            src={stamp}
            alt="Stamp"
            sx={{ width: 110, marginLeft: "-10mm" }}
          />
        </Box>
      </Box> */}

      <div style={{ marginTop: "20mm", fontSize: "18px" }}>
        <p>
          <strong>{company.name}</strong>
        </p>
        <br />

        <div style={{ display: "flex", gap: "32px", marginTop: "10px" }}>
          <div>
            {company.signature && (
              <img
                // src={company.signature}
                src={sign}
                alt="HR Signature"
                style={{
                  width: "130px",
                  marginTop: "50px",
                  marginBottom: "110px",
                  marginLeft: "10px",
                }}
              />
            )}
            <p
              style={{
                margin: 0,
                fontWeight: 600,
                marginTop: "-20mm",
                marginBottom: "0.5mm",
              }}
            >
              <strong>{company.hrName}</strong>
            </p>

            <p
              style={{
                margin: 0,
                fontWeight: 600,
              }}
            >
              <strong>HR Manager - HR Services</strong>
            </p>
          </div>

          {company.stamp && (
            <img
              src={company.stamp}
              alt="Company Stamp"
              style={{
                width: "110px",
                marginTop: "-6mm",
                marginBottom: "28mm",
                marginLeft: "-24mm",
              }}
            />
          )}
        </div>
      </div>
    </A4Page>
  );
};

export default SmartMatrixCertification;
