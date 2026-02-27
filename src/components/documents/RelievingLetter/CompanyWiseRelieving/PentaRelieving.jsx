import React from "react";
import { Box, Typography } from "@mui/material";

/**
 * Props
 * company -> selected company object from companies[]
 * data    -> form data from relieving letter form
 */

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const PentaRelieving = ({ company, data }) => {
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
        sx={{
          px: "30mm",   // Word left/right margin
          pt: "20mm",   // Word top margin
          pb: "35mm",   // Space for footer
        }}
      >
        {/* Date (Right aligned like Word document) */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Typography sx={{ fontSize: "14px" }}>
            {formatDate(data.issueDate)}
          </Typography>
        </Box>

        {/* Reference */}
        <Typography sx={{ fontSize: "14px", mb: 6 , fontWeight: "bold"}}>
          <strong>Ref:</strong>{" "}
          PENTA\\PUNHD\\RMG01\\Relieving-Letter
          {data.employeeId ? `/${data.employeeId}` : ""}
        </Typography>

        {/* Employee Name */}
        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
          {data.employeeName}
        </Typography>

        {/* Designation */}
        <Typography sx={{ fontSize: "14px", mb: 6 }}>
          {data.designation}
        </Typography>

        {/* Salutation */}
        <Typography sx={{ fontSize: "14px", mb: 3 }}>
          Dear {data.mrms} {data.employeeName?.split(" ")[0]},
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
          With reference to your resignation letter{" "}
          <strong>{formatDate(data.resignationDate)}</strong>, we would like to
          inform you that your resignation has been accepted and you are relieved
          from the company at the closing of working hours on{" "}
          <strong>{formatDate(data.lastWorkingDay)}</strong>.
        </Typography>

        {/* Company Name */}
        <Typography sx={{ fontSize: "14px", mb: 3 }}>
          For <strong>{company.name}</strong>
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
          {company?.stamp && (
            <img
              src={company.stamp}
              alt="Company Stamp"
              style={{
                height: "70px",
                opacity: 0.9,
              }}
            />
          )}
        </Box>

        {/* HR Name */}
        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
          {company.hrName}
        </Typography>

        {/* HR Designation */}
        <Typography sx={{ fontSize: "14px" }}>
          Group Leader – Shared HR Services
        </Typography>
      </Box>

      {/* ================= FOOTER ================= */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <img
          src={company.footer}
          alt="Company Footer"
          style={{ width: "100%", display: "block" }}
        />
      </Box>
    </Box>
  );
};

export default PentaRelieving;
