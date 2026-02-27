// import React from "react";
// import { Box, Typography } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) => {
//   if (!date) return "";

//   const d = new Date(date);
//   const day = String(d.getDate()).padStart(2, "0");
//   const month = String(d.getMonth() + 1).padStart(2, "0");
//   const year = d.getFullYear();

//   return `${day}/${month}/${year}`;
// };

// const SmartMatrixCertification = ({ company, data }) => {
//   return (
//     <A4Layout headerSrc={company.header} footerSrc={company.footer}></A4Layout>
//   );
// };

// export default SmartMatrixCertification;

import React from "react";
import { Box, Typography } from "@mui/material";
import A4Layout from "../../../layout/A4Page";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  const day = d.getDate();
  const year = d.getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[d.getMonth()];

  return `${day} ${month} ${year}`;
};


const SmartMatrixCertification = ({ company, data }) => {
  return (
    <A4Layout headerSrc={company.header} footerSrc={company.footer}>
      {/* ================= ISSUE DATE ================= */}
      <Box
        sx={{
          textAlign: "right",
          fontSize: "13px",
          mt: "10mm",
          mr: "10mm",
          fontFamily: "Bahnschrift",
          fontWeight: "bold",
        }}
      >
        Date: {formatDate(data.issueDate)}
      </Box>

      {/* ================= TITLE ================= */}
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px",
          mt: "15mm",
          textDecoration: "underline",
          fontFamily: "Bahnschrift",
        }}
      >
        Internship Certificate
      </Typography>

      {/* ================= CONTENT ================= */}
      <Box sx={{ mt: "12mm", px: "5mm", textAlign: "justify" }}>
        <Typography
          sx={{ fontSize: "14px", mb: "6mm", fontFamily: "Bahnschrift" }}
        >
          We are pleased to certify that <strong>{data.employeeName}</strong>,
          has joined our group to work on internship with organization name{" "}
          <strong>SmartMatrix Digital Services Pvt Ltd</strong>.<br />
          The internship program held on{" "}
          <strong>{formatDate(data.startDate)}</strong> to{" "}
          <strong>{formatDate(data.completionDate)}</strong>.
        </Typography>

        <Typography
          sx={{ fontSize: "14px", mb: "6mm", fontFamily: "Bahnschrift" }}
        >
          During the internship period, <strong>{data.employeeName}</strong> was
          actively participated in project <br />
          related tasks, shown their skills and abilities in{" "}
          <strong>{data.role}</strong>.
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            mb: "6mm",
            px: "0mm",
            fontFamily: "Bahnschrift",
          }}
        >
          Through this internship experience,{" "}
          <strong>{data.employeeName}</strong> adopted practical knowledge,{" "}
          <br />
          best practices and exposure to real-world scenarios,which will
          undoubtedly
          <br />
          enhance their academic and professional development.
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            mb: "10mm",
            px: "0mm",
            fontFamily: "Bahnschrift",
          }}
        >
          Thank you for your successful completion & cooperation and support in
          <br />
          facilitating this internship opportunity.
        </Typography>

        {/* ================= SIGNATURE ================= */}
        <Typography
          sx={{ fontSize: "14px", mt: "-5mm", fontFamily: "Bahnschrift" }}
        >
          Yours Sincerely,
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            mt: "10mm",
            fontWeight: "bold",
            fontFamily: "Verdana",
          }}
        >
          SmartMatrix Digital Services Pvt Ltd.
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
              src={company.signature}
              alt="HR Signature"
              style={{
                height: "40px",
                marginBottom: "7mm",
              }}
            />
          )}
          {/* COMPANY STAMP */}
          {company.stamp && (
            <img
              src={company.stamp}
              alt="Company Stamp"
              style={{ width: "110px", marginRight: "88mm" }}
            />
          )}
        </Box>

        <Typography sx={{ fontSize: "14px", mt: "6mm", fontFamily: "Verdana" }}>
          <strong>Shiv Lahane</strong>
        </Typography>

        <Typography sx={{ fontSize: "13px", mb: "2mm", fontFamily: "Verdana" }}>
          <strong>HR Manager–HR Services</strong>
        </Typography>
      </Box>
    </A4Layout>
  );
};

export default SmartMatrixCertification;

