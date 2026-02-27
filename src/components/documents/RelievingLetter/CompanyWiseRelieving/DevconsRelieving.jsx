import React from "react";
import { Box, Typography } from "@mui/material";

const DevconsRelieving = ({ company, data }) => {
  const firstName = data.employeeName?.split(" ")[0];

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        fontFamily: `"Bahnschrift", "Yu Gothic", "Segoe UI", Arial, sans-serif`,
        "& *": {
          fontFamily: `"Bahnschrift", "Yu Gothic", "Segoe UI", Arial, sans-serif`,
        },
      }}
    >
      {/* HEADER */}
      {company?.headerImage && (
        <img
          src={company.headerImage}
          alt="Company Header"
          style={{ width: "100%", display: "block" }}
        />
      )}

      {/* CONTENT */}
      <Box
        className="a4-content-only"
        sx={{
          px: "25mm",
          py: "22mm",
          flexGrow: 1,
          fontSize: "17px",
          lineHeight: 1.65,
        }}
      >
        {/* TITLE */}
        <Typography sx={{ textAlign: "center", fontWeight: 600, mb: 3 }}>
          Relieving Letter
        </Typography>

        {/* DATE */}
        <Typography sx={{ textAlign: "right", mb: 3 }}>
          {new Date(data.issueDate).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </Typography>

        {/* EMPLOYEE DETAILS */}
      
        <Typography sx={{ fontWeight: 600 }}>
         {data.mrms} {data.employeeName}
        </Typography>
        <Typography sx={{ fontWeight: 600, mb: 3 }}>
          {data.designation}
        </Typography>

        {/* GREETING */}
        <Typography sx={{ mb: 2 }}>
          Dear {firstName},
        </Typography>

        {/* BODY */}
        <Typography sx={{ mb: 2, textAlign: "justify" }}>
          This is to certify that{" "}
          <Box component="span" sx={{ fontWeight: 600 }}>
            {data.employeeName}
          </Box>
          , who was employed with{" "}
          <Box component="span" sx={{ fontWeight: 600 }}>
            Devcons Software Solution Pvt. Ltd.
          </Box>{" "}
          as{" "}
          <Box component="span" sx={{ fontWeight: 600 }}>
            {data.designation}
          </Box>{" "}
          from{" "}
          <Box component="span" sx={{ fontWeight: 600,  }}>
            {new Date(data.joiningDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Box>{" "}
          to{" "}
          <Box component="span" sx={{ fontWeight: 600 }}>
            {new Date(data.lastWorkingDay).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Box>
          , has been relieved from their duties.
        </Typography>

        <Typography sx={{ mb: 4, textAlign: "justify" }}>
          During their tenure,{" "}
          <Box component="span" sx={{ fontWeight: 600 }}>
            {firstName}
          </Box>{" "}
          performed their responsibilities satisfactorily. We wish them all the
          best in their future endeavors.
        </Typography>

        {/* SIGN OFF */}
        <Typography sx={{ mb: 2, fontWeight: 600 }}>
          Sincerely,
        </Typography>

        {/* SIGNATURE + STAMP */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}>
          {company?.signature && (
            <img
              src={company.signature}
              alt="HR Signature"
              style={{ height: "60px" }}
            />
          )}
          {company?.stamp && (
            <img
              src={company.stamp}
              alt="Company Stamp"
              style={{ height: "90px" }}
            />
          )}
        </Box>

        {/* HR DETAILS */}
        <Typography sx={{ fontWeight: 600 }}>
          {company.hrName}
        </Typography>
        <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
          HR Relations Lead
        </Typography>
        <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
          Department of HR Relations
        </Typography>
      </Box>

      {/* FOOTER */}
      {company?.footerImage && (
        <img
          src={company.footerImage}
          alt="Company Footer"
          style={{ width: "100%", display: "block" }}
        />
      )}
    </Box>
  );
};

export default DevconsRelieving;
