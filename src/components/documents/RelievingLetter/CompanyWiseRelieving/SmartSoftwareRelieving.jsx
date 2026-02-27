import React from "react";
import { Box, Typography } from "@mui/material";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : "";

const SmartSoftwareRelieving = ({ company, data }) => {
  if (!company || !data) return null;

  const {
    employeeName = "",
    designation = "",
    issueDate = "",
    lastWorkingDay = "",
    employeeId = "",
    mrms = "",
  } = data;

  const firstName = employeeName.split(" ")[0] || "";

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        position: "relative",
        bgcolor: "#fff",
        margin: "0 auto",
        overflow: "hidden",
        fontFamily: "Verdana, Geneva, sans-serif",
        fontSize: "14px",
        lineHeight: 1.8,
        color: "#000",
      }}
    >
      {/* ================= HEADER (DYNAMIC) ================= */}
      {company.headerImage && (
        <Box
          component="img"
          src={company.headerImage}
          alt="Header"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1,
          }}
        />
      )}

      {/* ================= WATERMARK (DYNAMIC) ================= */}
      {company.watermarkImage && (
        <Box
          component="img"
          src={company.watermarkImage}
          alt="Watermark"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "110mm",
            opacity: 0.08,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ================= CONTENT (UNCHANGED) ================= */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          px: "20mm",
          pt: "44mm",
          pb: "32mm",
        }}
      >
        <Typography align="right" sx={{ mb: 2 }}>
          {formatDate(issueDate)}
        </Typography>

        <Typography sx={{ mb: 4 }}>
          <b>Ref:SMART\PUNHD\RMG01\Relieving-Letter\{employeeId}</b>
        </Typography>

        <Typography align="center" sx={{ fontWeight: "bold", mb: 4 }}>
          Relieving Letter
        </Typography>

        <Typography sx={{ fontWeight: "bold" }}>
          {mrms} {employeeName}
        </Typography>

        <Typography sx={{ mb: 4 }}>
          <b>{designation}</b>
        </Typography>

        <Typography sx={{ mb: 3 }}>
          Dear {firstName},
        </Typography>

        <Typography paragraph sx={{ ml: "10px" }}>
          This is in reference to resignation letter, Where in you had requested to
          be relieved from your services on{" "}
          <b>{formatDate(lastWorkingDay)}</b>. We wish to inform you that your
          resignation has been accepted and you shall be relieved from your
          duties as <b>{designation}</b>.
        </Typography>

        <Typography paragraph sx={{ mb: 6, ml: "10px" }}>
          We appreciate your contributions made to the organization and wish you
          all the best for your future endeavors.
        </Typography>

        <Typography sx={{ mb: 4 }}>
          For <b>{company.name}</b>
        </Typography>

        {/* ================= STAMP (DYNAMIC) ================= */}
        {company.signature && (
          <Box
            component="img"
            src={company.signature}
            alt="HR Signature"
            sx={{ height: "80px", mb: 1 }}
          />
        )}
        {company.stamp && (
          <Box
            component="img"
            src={company.stamp}
            alt="Company Stamp"
            sx={{ height: "90px", mb: 1 }}
          />
        )}

        {/* ================= SIGNATURE (DYNAMIC) ================= */}
        

        <Typography sx={{ fontWeight: "bold" }}>
          <b>{company.hrName}</b>
        </Typography>

        <Typography>
          <b>HR Manager-HR Shared Services</b>
        </Typography>
      </Box>

      {/* ================= FOOTER (DYNAMIC) ================= */}
      {company.footerImage && (
        <Box
          component="img"
          src={company.footerImage}
          alt="Footer"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default SmartSoftwareRelieving;
