import React from "react";
import { Box, Typography } from "@mui/material";

/**
 * Props
 * company -> Quick Management Services object
 * data    -> form data from Relieving Letter form
 */

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
     month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const QuickRelieving = ({ company, data = {} }) => {
  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#fff",
        fontFamily: "'Times New Roman', Times, serif",
        color: "#000",
        position: "relative",
        mx: "auto",
      }}
    >
      {/* ================= HEADER ================= */}
      <Box>
        <img
          src={company.header}
          alt="Company Header"
          style={{ width: "100%", display: "block" }}
        />
      </Box>

      {/* ================= BODY ================= */}
      <Box
        className="a4-content-only"
        sx={{
          px: "30mm",   // Left / Right margin (Word standard)
          pt: "20mm",   // Top margin
          pb: "40mm",   // Space for footer
        }}
      >
       

       

        {/* Title */}
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            textDecoration: "underline",
            mb: 8,
          }}
        >
          Relieving Letter
        </Typography>

        {/* Employee Name */}
        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
          {data.mrms} {data.employeeName}
        </Typography>

        {/* Designation */}
        <Typography sx={{ fontSize: "14px", mb: 6, fontWeight: "bold" }}>
          {data.designation}
        </Typography>

        {/* Salutation */}
        <Typography sx={{ fontSize: "14px", mb: 4 }}>
          Dear {data.employeeName?.split(" ")[0]},
        </Typography>

        {/* Main Content */}
        <Typography
          sx={{
            fontSize: "14px",
            lineHeight: 1.9,
            textAlign: "justify",
            mb: 10,
          }}
        >
          With reference to your resignation letter, we would like to
          inform you that your resignation has been accepted and you are relieved
          from the company at the closing of working hours on{" "}
          <strong>{formatDate(data.lastWorkingDay)}</strong>.
        </Typography>

        {/* Company Name */}
        <Typography sx={{ fontSize: "14px", mb: 4 }}>
          For <strong>{company.name?.toUpperCase()}</strong>
        </Typography>

        {/* ================= SIGNATURE & STAMP ================= */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            mb: 2,
          }}
        >
          {/* Signature */}
          <img
            src={company.signature}
            alt="HR Signature"
            style={{ height: "55px" }}
          />

          {/* Stamp */}
          {company.stamp && (
            <img
              src={company.stamp}
              alt="Company Stamp"
              style={{ height: "70px", opacity: 0.9 }}
            />
          )}
        </Box>

        {/* HR Name */}
        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
          {company.hrName}
        </Typography>

        {/* HR Designation */}
        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
          Group Leader – HR Shared Services
        </Typography>
      </Box>

      
    </Box>
  );
};

export default QuickRelieving;
