import React from "react";
import { Box, Typography } from "@mui/material";
import A4Layout from "../../../layout/A4Page";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : "";

/* ================= TEXT STYLE ================= */
const TEXT = {
  fontFamily: "Times New Roman, serif",
  fontSize: "14px",
  lineHeight: 1.8,
};

/* ================= MAIN COMPONENT ================= */
const NeweageRelieving = ({ company, data }) => {
  if (!company || !data) return null;

  const {
    issueDate = "",
    employeeName = "",
    designation = "",
    joiningDate = "",
    relievingDate = "",
    lastWorkingDay = "",
    employeeId = "",
    mrms = "",
  } = data;

  /* ===== SAFE FIRST NAME HANDLING ===== */
  const safeEmployeeName = (employeeName || "").trim();
  const firstName = safeEmployeeName
    ? safeEmployeeName.split(/\s+/)[0]
    : "";

  const COMPANY_NAME = (company.name || "").toUpperCase();

  return (
    <A4Layout
      headerSrc={company.headerImage}
      footerSrc={company.footerImage}
    >
      {/* ================= DATE ================= */}
      <Typography align="right" sx={{ ...TEXT, mb: 4 }}>
        {formatDate(issueDate)}
      </Typography>

      {/* ================= EMPLOYEE NAME ================= */}
      <Typography sx={{ ...TEXT, mb: 1 }}>
        <b>{mrms} {safeEmployeeName}</b>
      </Typography>

      <Typography sx={{ ...TEXT, mb: 4 }}>
        <b>{designation}</b>
      </Typography>

      {/* ================= GREETING ================= */}
      <Typography sx={{ ...TEXT, mb: 3 }}>
        Dear {firstName || safeEmployeeName},
      </Typography>

      {/* ================= BODY CONTENT ================= */}
      <Typography sx={{ ...TEXT, mb: 2 }}>
        This letter is in reference to the resignation letter you submitted. The
        management has accepted your resignation.
      </Typography>

      <Typography sx={{ ...TEXT, mb: 2 }}>
        You were an important part of the company since{" "}
        <b>{formatDate(joiningDate)}</b> and you have played an integral role in
        accomplishing your targets for the organization.
      </Typography>

      <Typography sx={{ ...TEXT, mb: 2 }}>
        Please make arrangements to receive a Clearance Certificate from the Head
        of your department that will then be forwarded to the Accounts department
        to commence final dues settlement.
      </Typography>

      <Typography sx={{ ...TEXT, mb: 2 }}>
        Your tenure with <b>{COMPANY_NAME}</b> ends on{" "}
        <b>{formatDate(relievingDate)}</b>. Your last working day will be{" "}
        <b>{formatDate(lastWorkingDay)}</b>.
      </Typography>

      <Typography sx={{ ...TEXT, mb: 6 }}>
        Best of luck!
      </Typography>

      {/* ================= SIGNATURE ================= */}
      <Typography sx={{ ...TEXT, mb: 3 }}>
        Sincerely,
      </Typography>

      {/* ================= SIGNATURE & STAMP ================= */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Box>
          {company.signature && (
            <img
              src={company.signature}
              alt="Signature"
              style={{ height: "60px", marginBottom: "6px" }}
            />
          )}

          {company.stamp && (
            <img
              src={company.stamp}
              alt="Stamp"
              style={{ height: "100px" }}
            />
          )}

          <Typography sx={TEXT}>{company.hrName}</Typography>
          <Typography sx={TEXT}>HR Relations Lead</Typography>
          <Typography sx={TEXT}>Department of HR Relations</Typography>
        </Box>
      </Box>
    </A4Layout>
  );
};

export default NeweageRelieving;
