import React from "react";
import { Box, Typography } from "@mui/material";

const RPRelieving = ({ company, data }) => {




  const firstName =
  typeof data?.employeeName === "string"
    ? data.employeeName.trim().split(/\s+/)[0]
    : "";

const title = data?.mrms || "";

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
        "& *": {
          fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
        },
      }}
    >
      {/* ================= HEADER ================= */}
      <img
        src={company.header}
        alt="RP Header"
        style={{ width: "100%", display: "block" }}
      />

      {/* ================= CONTENT ================= */}
      <Box
        className="a4-content-only"
        sx={{
          px: "25mm",
          pt: "18mm",
          pb: "20mm",
          flexGrow: 1,
          fontSize: "14px",
          lineHeight: 1.7,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ===== WATERMARK ===== */}
        {company?.watermark && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <Box
              component="img"
              src={company.watermark}
              alt="Watermark"
              sx={{
                width: "65%",
                opacity: 0.08,
              }}
            />
          </Box>
        )}

        {/* ===== CONTENT LAYER ===== */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {/* DATE */}
          <Typography sx={{ textAlign: "right", mb: 7 }}>
            {new Date(data.issueDate).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </Typography>

          {/* REF NO */}
          <Typography sx={{ mb: 6 }}>
            <strong>Ref:</strong> RPBS/PUN/RMG01/Relieving-Letter/
            {String(data.employeeId).padStart(4, "0")}
          </Typography>

          {/* EMPLOYEE DETAILS */}
          <Typography sx={{ fontWeight: 600 }}>
            {data.mrms} {data.employeeName}
          </Typography>
          <Typography sx={{ mb: 3 }}>
            <strong>{data.designation}</strong>
          </Typography>

          {/* GREETING */}
          <Typography sx={{ mb: 4 }}>
           Dear  {firstName},

            </Typography>

          {/* BODY */}
          <Typography sx={{ textAlign: "justify", mb: 6 }}>
            With reference to your resignation letter, we would like to inform
            you that your resignation has been accepted and you are relieved
            from the company at the closing of working hours on{" "}
            <strong>
              {new Date(data.lastWorkingDay).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </strong>
            .
          </Typography>

          {/* SIGN OFF */}
          <Typography sx={{ mb: 4, mt: 20 }}>
            For <strong>{company.name}</strong>.
          </Typography>

          {/* SIGNATURE & STAMP */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <img
              src={company.signature}
              alt="HR Signature"
              style={{ height: 60, marginRight: 30 }}
            />
            <img
              src={company.stamp}
              alt="Company Stamp"
              style={{ height: 99 }}
            />
          </Box>

          {/* HR DETAILS */}
          <Typography sx={{ fontWeight: 600 }}>
            {company.hrName}
          </Typography>
          <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
            Group Leader – HR Division Pune
          </Typography>
        </Box>
      </Box>

      {/* ================= FOOTER ================= */}
      <img
        src={company.footer}
        alt="RP Footer"
        style={{ width: "100%", display: "block" }}
      />
    </Box>
  );
};

export default RPRelieving;
