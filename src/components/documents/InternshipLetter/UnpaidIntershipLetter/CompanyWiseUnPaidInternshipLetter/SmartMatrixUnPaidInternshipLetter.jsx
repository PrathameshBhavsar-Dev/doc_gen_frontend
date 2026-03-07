import React from "react";
import { Box, Typography } from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import sign from "../../../../../assets/images/smartmatrix/Smartmatrix_sign.png";
/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

const SmartMatrixUnPaidInternshipLetter = ({ company, data }) => {
  return (
    <A4Layout headerSrc={company.header} footerSrc={company.footer}>
      {/* ================= DATE ================= */}
      <Box
        sx={{
          width: "100%",
          textAlign: "right",
          fontSize: "14px",
          mt: "20mm",
          mb: "10mm",
          pr: "2mm",
          fontFamily: "Bahnschrift",
        }}
      >
        <strong> {formatDate(data.issueDate)}</strong>
      </Box>

      {/* ================= TITLE ================= */}
      {/* <Typography
        align="center"
        sx={{
          fontSize: "16px",
          fontWeight: "bold",
          textDecoration: "underline",
          mb: "6mm",
          fontFamily: "Cambria",
        }}
      >
        Internship Offer Letter
      </Typography> */}

      {/* ================= CANDIDATE DETAILS ================= */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontFamily: "Bahnschrift" }}>
          <strong>Name :</strong> {data.mrms} {data.employeeName}
        </Typography>

        <Typography sx={{ fontFamily: "Bahnschrift" }}>
          <strong>Subject :</strong>{" "}
          <u>
            Letter of intent for the Internship of position as{" "}
            <strong>{data.designation}</strong>.
          </u>
          <br />
          <br />
          Dear {data.employeeName},
        </Typography>
      </Box>

      {/* ================= BODY ================= */}
      <Typography paragraph sx={{ fontFamily: "Bahnschrift" }}>
        We are pleased to offer you the Internship of position as{" "}
        <strong>{data.designation}</strong> with <strong>{company.name}</strong>{" "}
        with effective date <strong>{formatDate(data.startDate)}</strong>{" "}
        considering your performance and support towards the organization.
      </Typography>

      <Typography paragraph sx={{ fontFamily: "Bahnschrift" }}>
        If there is any change in the date of joining, changes can be taken
        under consideration.
      </Typography>

      <Typography paragraph sx={{ fontFamily: "Bahnschrift" }}>
        We welcome you to <strong>{company.name}</strong> Family and hope it
        would be the beginning of a long and mutually beneficial association.
      </Typography>

      <Typography paragraph sx={{ fontFamily: "Bahnschrift" }}>
        Kindly acknowledge the duplicate copy of this letter as an acceptance of
        this offer.
      </Typography>

      {/* ================= CLOSING ================= */}
      <Typography sx={{ mt: 4, fontFamily: "Bahnschrift" }}>
        Yours Sincerely,
      </Typography>

      {/* ================= SIGNATURE SECTION ================= */}
      <Box sx={{ mt: 5, fontFamily: "Verdana", fontWeight: "400" }}>
        <Typography>
          <strong>{company.name}</strong>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mt: 2,
          }}
        >
          {/* HR SIGNATURE */}
          {company.signature && (
            <img
              src={sign}
              alt="HR Signature"
              style={{
                height: "50px",
              }}
            />
          )}
          {/* COMPANY STAMP */}
          {company.stamp && (
            <img
              src={company.stamp}
              alt="Company Stamp"
              style={{ width: "110px", marginRight: "87mm" }}
            />
          )}
        </Box>
        <Typography sx={{ mt: 2, fontWeight: "bold" }}></Typography>

        <Typography sx={{ fontWeight: "bold" }}>{company.hrName}</Typography>

        <Typography sx={{ mt: "", fontStyle: "Verdana" }}>
          {company.hrDesignation}
          <strong>HR Manager-HR Services</strong>
        </Typography>
      </Box>
    </A4Layout>
  );
};

export default SmartMatrixUnPaidInternshipLetter;
